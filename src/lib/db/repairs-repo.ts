import { Filter, ObjectId } from 'mongodb';
import { RepairModel, RepairUpdateDTO } from '@/models/RepairModel';
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

  async updateRepair(updateData: RepairUpdateDTO) {
    const db = await connectDB();
    const { id, ...fieldsToUpdate } = updateData;

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
      .collection<RepairModel>('repair')
      .findOneAndUpdate(
        { _id: ObjectId.createFromHexString(id) },
        { $set: { ...updateFields, updatedAt: new Date() } },
        { returnDocument: 'after', includeResultMetadata: true }
      );

    return result.value;
  },

  async deleteRepair(id: string) {
    const db = await connectDB();
    return await db
      .collection<RepairModel>('repair')
      .deleteOne({ _id: new ObjectId(id) });
  },
};
