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
};
