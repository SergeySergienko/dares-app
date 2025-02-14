import { Filter } from 'mongodb';
import { connectDB } from './mongo-db';
import { InspectionModel } from '@/models/InspectionModel';

export const inspectionsRepo = {
  async getInspections(query: Partial<InspectionModel>) {
    const db = await connectDB();
    const filter: Filter<InspectionModel> = { ...query };

    return await db
      .collection<InspectionModel>('inspection')
      .find(filter)
      .sort({ date: 'desc' })
      .toArray();
  },

  async createInspection(inspection: InspectionModel) {
    const db = await connectDB();
    return await db
      .collection<InspectionModel>('inspection')
      .insertOne(inspection);
  },
};
