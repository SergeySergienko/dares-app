import { ObjectId } from 'mongodb';
import { connectDB } from './mongo-db';

export const tanksRepo = {
  async getTanks(query) {
    const db = await connectDB();
    const filter = { ...query };

    return await db.collection('tanks').find(filter).toArray();
  },

  async updateTank(updateData) {
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
      .collection('tanks')
      .findOneAndUpdate(
        { _id: ObjectId.createFromHexString(id) },
        { $set: { ...updateFields, updatedAt: new Date() } },
        { returnDocument: 'after', includeResultMetadata: true }
      );

    return result.value;
  },
};
