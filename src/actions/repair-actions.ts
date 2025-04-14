'use server';

import { repairsRepo } from '@/lib/db/repairs-repo';
import { RepairModel, RepairOutputDTO } from '@/models/RepairModel';
import { ObjectId, WithId } from 'mongodb';
import { getTankByInternalNumber } from './tank-actions';
import { revalidatePath } from 'next/cache';
import { deepSet } from '@/lib/utils';

const repairMapper = (repair: WithId<RepairModel>): RepairOutputDTO => {
  const { _id, tankId, ...rest } = repair;
  return { id: _id.toString(), tankId: tankId.toString(), ...rest };
};

export async function getRepairs(query: Partial<RepairModel> = {}) {
  const repairs = await repairsRepo.getRepairs(query);
  return repairs.map(repairMapper);
}

export async function getRepair(id: string) {
  const repair = await repairsRepo.getRepair(id);
  if (!repair) return null;
  return repairMapper(repair);
}

const extractFormData = async (formData: FormData) => {
  const data: { [x: string]: FormDataEntryValue } = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('$')) continue;
    if (key.includes('.')) {
      deepSet(data, key, value);
    } else {
      data[key] = value;
    }
  }

  const parts: { [key: string]: number } = {};
  for (const [key, value] of Object.entries(data.parts)) {
    parts[key] = Number(value);
  }

  return {
    id: data.id as string | undefined,
    tankNumber: Number(data.tankNumber),
    parts,
    date: new Date(data.date as string),
    executor: data.executor as string,
  };
};

export async function createRepair(state: any, formData: FormData) {
  const { tankNumber, parts, date, executor } = await extractFormData(formData);

  const tank = await getTankByInternalNumber(tankNumber);
  if (!tank) {
    return { error: `Tank with internal number ${tankNumber} not found` };
  }

  const newRepair: RepairModel = {
    date,
    tankId: ObjectId.createFromHexString(tank.id),
    tankNumber,
    executor,
    parts,
    createdAt: new Date(),
  };

  const { insertedId } = await repairsRepo.createRepair(newRepair);
  if (!insertedId) {
    return {
      error: 'Failed to create repair record. Please try again later.',
    };
  }

  revalidatePath('/repairs');
  revalidatePath('/reports/parts/for-repair');
  return { message: 'New repair has been successfully created.' };
}

export async function updateRepair(state: any, formData: FormData) {
  const { id, ...rest } = await extractFormData(formData);
  if (!id) {
    return {
      error: 'Repair ID must be present.',
    };
  }

  const updatedRepair = await repairsRepo.updateRepair({ ...rest, id });
  if (!updatedRepair) {
    return {
      error: 'Failed to update repair record. Please try again later.',
    };
  }

  revalidatePath('/repairs');
  revalidatePath('/reports/parts/for-repair');
  return { message: 'Repair has been successfully updated.' };
}

export async function deleteRepair(id: string) {
  const result = await repairsRepo.deleteRepair(id);
  if (result.deletedCount !== 1) {
    return {
      error: 'Failed to delete repair record. Please try again later.',
    };
  }
  revalidatePath('/repairs');
  revalidatePath('/reports/parts/for-repair');
  return {
    message: 'The repair has been successfully deleted.',
  };
}
