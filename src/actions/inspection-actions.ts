'use server';

import { ObjectId, WithId } from 'mongodb';
import { redirect } from 'next/navigation';
import { inspectionsRepo } from '@/lib/db/inspections-repo';
import {
  deepSet,
  isValidGrade,
  normalizeInspectionData,
  parseGrade,
} from '@/lib/utils';
import { getTankByInternalNumber, getTanks, updateTank } from './tank-actions';
import {
  InspectionModel,
  InspectionOutputDTO,
  Inspector,
  Verdict,
} from '@/models/InspectionModel';
import { Grade, TankUpdateDTO } from '@/models/TankModel';
import { revalidatePath } from 'next/cache';

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

export async function getInspectionByTankNumber(tankNumber: number) {
  const tank = await getTankByInternalNumber(tankNumber);
  const [lastInspection] = await getInspections({ tankNumber });
  const report = {
    ...lastInspection,
    tank,
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

  const {
    date,
    tankId,
    tankVerdict,
    tankNumber,
    grade: gradeStringValue,
    inspector,
    ...rest
  } = data;

  const normalizedData = normalizeInspectionData(rest);

  let grade: Grade | undefined;
  if (gradeStringValue && isValidGrade(+gradeStringValue)) {
    grade = parseGrade(gradeStringValue as `${Grade}`);
  }

  const newInspection: InspectionModel = {
    ...normalizedData,
    date: new Date(date as string),
    tankId: ObjectId.createFromHexString(tankId as string),
    tankNumber: Number(tankNumber),
    tankVerdict: tankVerdict as Verdict,
    inspector: inspector as unknown as Inspector,
    grade,
    createdAt: new Date(),
  };

  const { insertedId } = await inspectionsRepo.createInspection(newInspection);
  if (!insertedId) {
    throw new Error(
      'Failed to create inspection record. Please try again later.'
    );
  }

  // Update the tank's data if the new inspection date is later
  const [tank] = await getTanks({ internalNumber: newInspection.tankNumber });
  if (
    !tank.lastInspectionDate ||
    newInspection.date.getTime() > tank.lastInspectionDate.getTime()
  ) {
    const fieldsToUpdate: TankUpdateDTO = {
      id: tankId as string,
      grade: newInspection.grade,
      lastInspectionDate: newInspection.date,
      valve: newInspection.valve?.type,
    };
    if (newInspection.tankVerdict === 'Condemn') {
      fieldsToUpdate.status = 'Rejected';
    }

    await updateTank(fieldsToUpdate);
  }
  revalidatePath('/tanks');
  revalidatePath('/inspections');
  return 'Inspection has been successfully created.';
}
