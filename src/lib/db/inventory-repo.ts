import { InventoryModel } from '@/models/InventoryModel';
import { connectDB } from './mongo-db';

export const inventoryRepo = {
  async createInventory(inventory: InventoryModel) {
    const db = await connectDB();
    return await db
      .collection<InventoryModel>('inventory')
      .insertOne(inventory);
  },
};
