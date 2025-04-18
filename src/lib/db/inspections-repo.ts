import { Filter, ObjectId } from 'mongodb';
import { connectDB } from './mongo-db';
import { InspectionModel, InspectionUpdateDTO } from '@/models/InspectionModel';

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

  async getInspection(id: string) {
    const db = await connectDB();
    return await db
      .collection<InspectionModel>('inspection')
      .findOne({ _id: new ObjectId(id) });
  },

  async createInspection(inspection: InspectionModel) {
    const db = await connectDB();
    return await db
      .collection<InspectionModel>('inspection')
      .insertOne(inspection);
  },

  async updateInspection(updateData: InspectionUpdateDTO) {
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
      .collection<InspectionModel>('inspection')
      .findOneAndUpdate(
        { _id: ObjectId.createFromHexString(id) },
        { $set: { ...updateFields, updatedAt: new Date() } },
        { returnDocument: 'after', includeResultMetadata: true }
      );

    return result.value;
  },

  async deleteInspection(id: string) {
    const db = await connectDB();
    return await db
      .collection<InspectionModel>('inspection')
      .deleteOne({ _id: new ObjectId(id) });
  },
};
