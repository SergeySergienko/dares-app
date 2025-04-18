'use server';

import {
  Fit,
  InventoryModel,
  InventoryOutputDTO,
} from '@/models/InventoryModel';
import { ObjectId, WithId } from 'mongodb';
import { getTankByInternalNumber, getTanks, updateTank } from './tank-actions';
import { inventoriesRepo } from '@/lib/db/inventories-repo';
import { client } from '@/lib/db/mongo-db';
import { revalidatePath } from 'next/cache';

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

const validTransitions: Record<Fit, Fit[]> = {
  Created: ['In use'],
  'In use': ['Not found'],
  'Not found': ['In use'],
};

export async function createInventory(state: any, formData: FormData) {
  const getValue = (key: keyof InventoryModel) =>
    formData.get(key)?.toString().trim() || '';

  const tankNumber = Number(getValue('tankNumber'));
  const tank = await getTankByInternalNumber(tankNumber);
  if (!tank) {
    return { error: `Tank with internal number ${tankNumber} not found` };
  }

  // Check for valid transition
  const newTankStatus = getValue('tankStatus') as Fit;
  if (
    !(
      validTransitions[tank.status as Fit] &&
      validTransitions[tank.status as Fit].includes(newTankStatus)
    )
  ) {
    return {
      error: `Transition from ${tank.status} to ${newTankStatus} is not allowed.`,
    };
  }

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const newInventory: InventoryModel = {
        date: new Date(getValue('date')),
        tankId: ObjectId.createFromHexString(tank.id),
        tankNumber,
        tankStatus: getValue('tankStatus') as Fit,
        executor: getValue('executor'),
        description: getValue('description'),
        createdAt: new Date(),
      };

      const { insertedId } = await inventoriesRepo.createInventory(
        newInventory
      );
      if (!insertedId) {
        return {
          error: 'Failed to create inventory record. Please try again later.',
        };
      }

      // Update the tank's data if its last inventory date is missing or older
      if (
        !tank.lastInventoryDate ||
        newInventory.date.getTime() > tank.lastInventoryDate.getTime()
      ) {
        await updateTank({
          id: tank.id,
          status: newInventory.tankStatus,
          lastInventoryDate: newInventory.date,
        });
      }
    });
    revalidatePath('/tanks');
    revalidatePath('/inventories');
    return { message: 'Inventory has been successfully created.' };
  } catch (error) {
    throw new Error(`Transaction failed: ${(error as Error).message}`);
  } finally {
    await session.endSession();
  }
}
