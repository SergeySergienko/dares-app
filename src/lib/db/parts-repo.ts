import { Filter } from 'mongodb';
import { connectDB } from './mongo-db';
import { PartModel } from '@/models/PartModel';

export const partsRepo = {
  async getParts(query: Partial<PartModel>) {
    const db = await connectDB();
    const filter: Filter<PartModel> = { ...query };

    return await db
      .collection<PartModel>('parts')
      .find(filter)
      .sort({ itemNumber: 'asc' })
      .toArray();
  },

  async createPart(part: PartModel) {
    const db = await connectDB();
    return await db.collection<PartModel>('parts').insertOne(part);
  },
};
