'use server';

import {
  HydrotestModel,
  HydrotestOutputDTO,
  HydrotestUpdateDTO,
} from '@/models/HydrotestModel';
import { ObjectId, WithId } from 'mongodb';
import { hydrotestRepo } from '@/lib/db/hydrotests-repo';
import { client } from '@/lib/db/mongo-db';
import { revalidatePath } from 'next/cache';
import { getTankByInternalNumber, updateTank } from './tank-actions';
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
  if (tank.status === 'In testing') {
    throw new Error(
      `Tank with internal number ${tankNumber} already has status "In testing"`
    );
  }

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const newHydrotest: HydrotestModel = {
        startDate: new Date(getValue('startDate')),
        tankId: ObjectId.createFromHexString(tank.id),
        tankNumber,
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

      await updateTank({
        id: tank.id,
        status: 'In testing',
      });
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

export async function updateHydrotest(state: any, formData: FormData) {
  const getValue = (key: keyof HydrotestModel) =>
    formData.get(key)?.toString().trim() || '';

  const tankNumber = Number(getValue('tankNumber'));
  const pendingHydrotest = await hydrotestRepo.getPendingHydrotestByTank(
    tankNumber
  );
  if (!pendingHydrotest) {
    throw new Error(`Pending hydrotest for tank ${tankNumber} not found`);
  }

  const tank = await getTankByInternalNumber(tankNumber);
  if (!tank) {
    throw new Error(`Tank with internal number ${tankNumber} not found`);
  }
  if (tank.status !== 'In testing') {
    throw new Error(
      `Tank with internal number ${tankNumber} must have status "In testing"`
    );
  }

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const HydrotestToUpdate: HydrotestUpdateDTO = {
        _id: pendingHydrotest._id,
        endDate: new Date(getValue('endDate')),
        tankVerdict: getValue('tankVerdict'),
        executor: getValue('executor'),
        description: getValue('description'),
      };

      if (
        pendingHydrotest.startDate.getTime() >
        HydrotestToUpdate.endDate.getTime()
      ) {
        throw new Error('The end date must be after the start date');
      }

      const updatedHydrotest = await hydrotestRepo.updateHydrotest(
        HydrotestToUpdate
      );
      if (!updatedHydrotest) {
        throw new Error(
          'Failed to update hydrotest record. Please try again later.'
        );
      }

      // Update the tank's data if its last hydrotest date is missing or older
      const fieldsToUpdate: TankUpdateDTO = {
        id: tank.id,
        status:
          HydrotestToUpdate.tankVerdict === 'Acceptable'
            ? 'In use'
            : 'Rejected',
      };
      if (
        HydrotestToUpdate.endDate &&
        (!tank.lastHydrotestDate ||
          HydrotestToUpdate.endDate.getTime() >
            tank.lastHydrotestDate.getTime())
      ) {
        fieldsToUpdate.lastHydrotestDate = HydrotestToUpdate.endDate;
      }

      await updateTank(fieldsToUpdate);
    });
    revalidatePath('/tanks');
    revalidatePath('/hydrotests');
    return 'Hydrotest has been successfully updated.';
  } catch (error) {
    throw new Error(`Transaction failed: ${(error as Error).message}`);
  } finally {
    await session.endSession();
  }
}
