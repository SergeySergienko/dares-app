'use server';

import { ObjectId, WithId } from 'mongodb';
import { inspectionsRepo } from '@/lib/db/inspections-repo';
import { deepSet, normalizeInspectionData } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { getTankByInternalNumber, getTanks, updateTank } from './tank-actions';
import { InspectionModel, InspectionOutputDTO } from '@/models/InspectionModel';

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
  const query = { tankNumber };
  const [lastInspection] = await getInspections(query);
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

  const { date, tankId, tankVerdict, tankNumber, grade, ...rest } = data;

  const normalizedData = normalizeInspectionData(rest);
  const newInspection: InspectionModel = {
    ...normalizedData,
    date: new Date(date as string),
    tankId: ObjectId.createFromHexString(tankId as string),
    tankNumber: Number(tankNumber),
    tankVerdict,
    grade: Number(grade),
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
    new Date(newInspection.date).getTime() >
    new Date(tank.lastInspectionDate).getTime()
  ) {
    await updateTank({
      id: tankId as string,
      grade: newInspection.grade,
      lastInspectionDate: newInspection.date,
      valve: newInspection.valve?.type,
    });
  }

  redirect('/inspections');
}
