'use server';

import { Fit, InventoryModel } from '@/models/InventoryModel';
import { ObjectId } from 'mongodb';
import { getTanks, updateTank } from './tank-actions';
import { inventoryRepo } from '@/lib/db/inventory-repo';
import { redirect } from 'next/navigation';

export async function createInventory(state: any, formData: FormData) {
  const getValue = (key: string) => formData.get(key)?.toString().trim() || '';

  const newInventory: InventoryModel = {
    date: new Date(getValue('date')),
    tankId: ObjectId.createFromHexString(getValue('tankId')),
    tankNumber: Number(getValue('tankNumber')),
    tankStatus: getValue('tankStatus') as Fit,
    executor: getValue('executor'),
    description: getValue('description'),
    createdAt: new Date(),
  };

  const { insertedId } = await inventoryRepo.createInventory(newInventory);
  if (!insertedId) {
    throw new Error(
      'Failed to create inventory record. Please try again later.'
    );
  }

  // Update the tank's data if its last inventory date is missing or older
  const [tank] = await getTanks({ internalNumber: newInventory.tankNumber });
  if (
    !tank.lastInventoryDate ||
    new Date(newInventory.date).getTime() >
      new Date(tank.lastInventoryDate).getTime()
  ) {
    await updateTank({
      id: getValue('tankId'),
      status: newInventory.tankStatus,
      lastInventoryDate: newInventory.date,
    });
  }

  redirect('/tanks'); // TODO: redirect('/inventory')
}
