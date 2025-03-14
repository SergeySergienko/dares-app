import { Filter } from 'mongodb';
import { connectDB } from './mongo-db';
import { HydrotestModel } from '@/models/HydrotestModel';

export const hydrotestRepo = {
  async getHydrotests(query: Partial<HydrotestModel>) {
    const db = await connectDB();
    const filter: Filter<HydrotestModel> = { ...query };

    return await db
      .collection<HydrotestModel>('hydrotest')
      .find(filter)
      .sort({ date: 'desc' })
      .toArray();
  },

  async createHydrotest(hydrotest: HydrotestModel) {
    const db = await connectDB();
    return await db
      .collection<HydrotestModel>('hydrotest')
      .insertOne(hydrotest);
  },
};
