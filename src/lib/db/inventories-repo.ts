import { Filter } from 'mongodb';
import { connectDB } from './mongo-db';
import { InventoryModel } from '@/models/InventoryModel';

export const inventoriesRepo = {
  async getInventories(query: Partial<InventoryModel>) {
    const db = await connectDB();
    const filter: Filter<InventoryModel> = { ...query };

    return await db
      .collection<InventoryModel>('inventory')
      .find(filter)
      .sort({ date: 'desc' })
      .toArray();
  },

  async createInventory(inventory: InventoryModel) {
    const db = await connectDB();
    return await db
      .collection<InventoryModel>('inventory')
      .insertOne(inventory);
  },
};
