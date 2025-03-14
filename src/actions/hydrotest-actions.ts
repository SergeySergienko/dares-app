'use server';

import { HydrotestModel, HydrotestOutputDTO } from '@/models/HydrotestModel';
import { ObjectId, WithId } from 'mongodb';
import { hydrotestRepo } from '@/lib/db/hydrotests-repo';
import { client } from '@/lib/db/mongo-db';
import { revalidatePath } from 'next/cache';
import { getTankByInternalNumber, updateTank } from './tank-actions';
import { Verdict } from '@/models/InspectionModel';
import { TankUpdateDTO } from '@/models/TankModel';

const hydrotestMapper = (
  hydrotest: WithId<HydrotestModel>
): HydrotestOutputDTO => {
  const { _id, tankId, ...rest } = hydrotest;
  return { id: _id.toString(), tankId: tankId.toString(), ...rest };
};

export async function getHydrotests(
  query: Partial<HydrotestModel> = {}
): Promise<HydrotestOutputDTO[]> {
  const hydrotests = await hydrotestRepo.getHydrotests(query);
  return hydrotests.map(hydrotestMapper);
}

export async function createHydrotest(state: any, formData: FormData) {
  const getValue = (key: keyof HydrotestModel) =>
    formData.get(key)?.toString().trim() || '';

  const tankNumber = Number(getValue('tankNumber'));
  const tank = await getTankByInternalNumber(tankNumber);
  if (!tank) {
    throw new Error(`Tank with internal number ${tankNumber} not found`);
  }
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const newHydrotest: HydrotestModel = {
        date: new Date(getValue('date')),
        tankId: ObjectId.createFromHexString(tank.id),
        tankNumber,
        tankVerdict: getValue('tankVerdict') as Verdict,
        executor: getValue('executor'),
        description: getValue('description'),
        createdAt: new Date(),
      };

      const { insertedId } = await hydrotestRepo.createHydrotest(newHydrotest);
      if (!insertedId) {
        throw new Error(
          'Failed to create hydrotest record. Please try again later.'
        );
      }

      // Update the tank's data if its last hydrotest date is missing or older
      if (
        !tank.lastHydrotestDate ||
        newHydrotest.date.getTime() > tank.lastHydrotestDate.getTime()
      ) {
        const fieldsToUpdate: TankUpdateDTO = {
          id: tank.id,
          lastHydrotestDate: newHydrotest.date,
        };
        if (newHydrotest.tankVerdict === 'Condemn') {
          fieldsToUpdate.status = 'Rejected';
        }

        await updateTank(fieldsToUpdate);
      }
    });
    revalidatePath('/tanks');
    revalidatePath('/hydrotests');
    return 'Hydrotest has been successfully created.';
  } catch (error) {
    throw new Error(`Transaction failed: ${(error as Error).message}`);
  } finally {
    await session.endSession();
  }
}
