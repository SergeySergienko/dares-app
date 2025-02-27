'use server';

import {
  Fit,
  InventoryModel,
  InventoryOutputDTO,
} from '@/models/InventoryModel';
import { ObjectId, WithId } from 'mongodb';
import { getTanks, updateTank } from './tank-actions';
import { inventoriesRepo } from '@/lib/db/inventories-repo';
import { redirect } from 'next/navigation';

const inventoryMapper = (
  inventory: WithId<InventoryModel>
): InventoryOutputDTO => {
  const { _id, tankId, ...rest } = inventory;
  return { id: _id.toString(), tankId: tankId.toString(), ...rest };
};

export async function getInventories(query: Partial<InventoryModel> = {}) {
  const inventories = await inventoriesRepo.getInventories(query);
  return inventories.map(inventoryMapper);
}

export async function createInventory(state: any, formData: FormData) {
  const getValue = (key: keyof InventoryModel) =>
    formData.get(key)?.toString().trim() || '';

  const newInventory: InventoryModel = {
    date: new Date(getValue('date')),
    tankId: ObjectId.createFromHexString(getValue('tankId')),
    tankNumber: Number(getValue('tankNumber')),
    tankStatus: getValue('tankStatus') as Fit,
    executor: getValue('executor'),
    description: getValue('description'),
    createdAt: new Date(),
  };

  const { insertedId } = await inventoriesRepo.createInventory(newInventory);
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

  redirect('/inventories');
}
