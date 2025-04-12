import { Filter, ObjectId } from 'mongodb';
import { RepairModel } from '@/models/RepairModel';
import { connectDB } from './mongo-db';

export const repairsRepo = {
  async getRepairs(query: Partial<RepairModel>) {
    const db = await connectDB();
    const filter: Filter<RepairModel> = { ...query };
    return await db
      .collection<RepairModel>('repair')
      .find(filter)
      .sort({ date: 'desc' })
      .toArray();
  },

  async getRepair(id: string) {
    const db = await connectDB();
    return await db
      .collection<RepairModel>('repair')
      .findOne({ _id: new ObjectId(id) });
  },

  async createRepair(repair: RepairModel) {
    const db = await connectDB();
    return await db.collection<RepairModel>('repair').insertOne(repair);
  },

  async deleteRepair(id: string) {
    const db = await connectDB();
    const result = await db
      .collection<RepairModel>('repair')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount !== 1) {
      return {
        success: false,
        message: 'Failed to delete repair record. Please try again later.',
      };
    }
    return {
      success: true,
      message: 'The repair has been successfully deleted.',
    };
  },
};
