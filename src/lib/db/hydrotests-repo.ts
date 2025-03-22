import { Filter, ObjectId } from 'mongodb';
import { connectDB } from './mongo-db';
import { HydrotestModel, HydrotestUpdateDTO } from '@/models/HydrotestModel';

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

  async getPendingHydrotestByTank(tankNumber: number) {
    const db = await connectDB();
    const filter: Filter<HydrotestModel> = {
      tankNumber,
      tankVerdict: { $exists: false },
    };

    return await db.collection<HydrotestModel>('hydrotest').findOne(filter);
  },

  async createHydrotest(hydrotest: HydrotestModel) {
    const db = await connectDB();
    return await db
      .collection<HydrotestModel>('hydrotest')
      .insertOne(hydrotest);
  },

  async updateHydrotest(updateData: HydrotestUpdateDTO) {
    const db = await connectDB();
    const { _id, ...fieldsToUpdate } = updateData;

    const updateFields = Object.entries(fieldsToUpdate).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {}
    );

    const result = await db
      .collection<HydrotestModel>('hydrotest')
      .findOneAndUpdate(
        { _id },
        { $set: { ...updateFields, updatedAt: new Date() } },
        { returnDocument: 'after', includeResultMetadata: true }
      );

    return result.value;
  },
};
