'use server';

import { partsRepo } from '@/lib/db/parts-repo';
import { PartModel, PartOutputDTO } from '@/models/PartModel';
import { WithId } from 'mongodb';
import { revalidatePath } from 'next/cache';

const partMapper = (part: WithId<PartModel>): PartOutputDTO => {
  const { _id, ...rest } = part;
  return { id: _id.toString(), ...rest };
};

export async function getParts(query: Partial<PartModel> = {}) {
  const parts = await partsRepo.getParts(query);
  return parts.map(partMapper);
}

export async function createPart(state: any, formData: FormData) {
  const getValue = (key: keyof PartModel) =>
    formData.get(key)?.toString().trim() || '';

  const newPart: PartModel = {
    itemNumber: Number(getValue('itemNumber')),
    title: getValue('title'),
    alias: getValue('alias'),
    catalogNumber: getValue('catalogNumber'),
    createdAt: new Date(),
  };

  const { insertedId } = await partsRepo.createPart(newPart);
  if (!insertedId) {
    return {
      error: 'Failed to create part record. Please try again later.',
    };
  }

  revalidatePath('/parts');
  return { message: 'New part has been successfully created.' };
}
