'use server';

import { ObjectId, WithId } from 'mongodb';
import { inspectionsRepo } from '@/lib/db/inspections-repo';
import { deepSet, normalizeInspectionData } from '@/lib/utils';
import { getTankByInternalNumber, updateTank } from './tank-actions';
import {
  InspectionModel,
  InspectionOutputDTO,
  Inspector,
  Verdict,
} from '@/models/InspectionModel';
import { Grade, TankUpdateDTO } from '@/models/TankModel';
import { client } from '@/lib/db/mongo-db';
import { revalidatePath } from 'next/cache';
import { OwnerModel } from '@/models/OwnerModel';

const inspectionMapper = (
  inspection: WithId<InspectionModel>
): InspectionOutputDTO => {
  const { _id, tankId, ...rest } = inspection;
  return { id: _id.toString(), tankId: tankId.toString(), ...rest };
};

export async function getInspections(query: Partial<InspectionModel> = {}) {
  const inspections = await inspectionsRepo.getInspections(query);
  return inspections.map(inspectionMapper);
}

export async function getInspection(id: string) {
  const inspection = await inspectionsRepo.getInspection(id);
  if (!inspection) return null;
  return inspectionMapper(inspection);
}

export async function getLastInspectionByTankNumber(tankNumber: number) {
  const tank = await getTankByInternalNumber(tankNumber);
  const [lastInspection] = await getInspections({ tankNumber });
  const owner: OwnerModel = {
    name: 'Aqua sport',
    phone: '+97208-633-4404',
    address: {
      postalCode: '88107',
      city: 'Eilat',
      street: 'Derech Mitsraim 117',
    },
  };
  const report = {
    lastInspection,
    tank,
    owner,
  };
  return report;
}

export async function createInspection(state: any, formData: FormData) {
  const data: { [x: string]: FormDataEntryValue } = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('$')) {
      continue;
    }

    if (key.includes('.')) {
      deepSet(data, key, value);
    } else {
      data[key] = value;
    }
  }

  const { date, tankId, tankVerdict, tankNumber, grade, inspector, ...rest } =
    data;

  const normalizedData = normalizeInspectionData(rest);

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const newInspection: InspectionModel = {
        ...normalizedData,
        date: new Date(date as string),
        tankId: ObjectId.createFromHexString(tankId as string),
        tankNumber: Number(tankNumber),
        tankVerdict: tankVerdict as Verdict,
        inspector: inspector as unknown as Inspector,
        grade: grade as unknown as Grade,
        createdAt: new Date(),
      };

      const { insertedId } = await inspectionsRepo.createInspection(
        newInspection
      );
      if (!insertedId) {
        return {
          error: 'Failed to create inspection record. Please try again later.',
        };
      }

      // Update the tank's data if the new inspection date is later
      const tank = await getTankByInternalNumber(newInspection.tankNumber);
      if (!tank) {
        return {
          error: `Tank with internal number ${newInspection.tankNumber} not found`,
        };
      }
      if (
        !tank.lastInspectionDate ||
        newInspection.date.getTime() > tank.lastInspectionDate.getTime()
      ) {
        const fieldsToUpdate: TankUpdateDTO = {
          id: tank.id,
          grade: newInspection.grade,
          lastInspectionDate: newInspection.date,
          valve: newInspection.valve?.type,
        };
        if (newInspection.tankVerdict === 'Condemn') {
          fieldsToUpdate.status = 'Rejected';
        }

        await updateTank(fieldsToUpdate);
      }
    });
    revalidatePath('/tanks');
    revalidatePath('/inspections');
    return { message: 'Inspection has been successfully created.' };
  } catch (error) {
    throw new Error(`Transaction failed: ${(error as Error).message}`);
  } finally {
    await session.endSession();
  }
}
