import { Filter, ObjectId } from 'mongodb';
import { connectDB } from './mongo-db';
import { TankModel, TankUpdateDTO } from '@/models/TankModel';

export const tanksRepo = {
  async getTanks({
    internalNumber,
    lastInspectionDate,
    lastHydrotestDate,
  }: Partial<TankModel>) {
    const db = await connectDB();
    const filter: Filter<TankModel> = {};
    if (internalNumber) {
      filter.internalNumber = Number(internalNumber);
    }
    if (lastInspectionDate) {
      filter.lastInspectionDate = {};
      filter.lastInspectionDate.$lte = lastInspectionDate;
    }
    if (lastHydrotestDate) {
      filter.lastHydrotestDate = {};
      filter.lastHydrotestDate.$lte = lastHydrotestDate;
    }
    return await db.collection<TankModel>('tanks').find(filter).toArray();
  },

  async updateTank(updateData: TankUpdateDTO) {
    const db = await connectDB();
    const { id, ...fieldsToUpdate } = updateData;

    const updateFields = Object.entries(fieldsToUpdate).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    const result = await db
      .collection<TankModel>('tanks')
      .findOneAndUpdate(
        { _id: ObjectId.createFromHexString(id) },
        { $set: { ...updateFields, updatedAt: new Date() } },
        { returnDocument: 'after', includeResultMetadata: true }
      );

    return result.value;
  },
};
