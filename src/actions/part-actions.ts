'use server';

import { WithId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { partsRepo } from '@/lib/db/parts-repo';
import { PartModel, PartOutputDTO, PartQueryDTO } from '@/models/PartModel';

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

export async function partsUsageReport(query: PartQueryDTO) {
  const report = await partsRepo.partsUsageReport(query);

  const allParts = await getParts();

  return allParts
    .map((part) => ({
      ...part,
      total: report[part.alias] || 0,
    }))
    .filter((p) => p.total);
}
