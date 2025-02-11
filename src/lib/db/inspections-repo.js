import { connectDB } from './mongo-db';

export const inspectionsRepo = {
  async getInspections(query = {}) {
    const db = await connectDB();
    const { sortBy = 'date', sortOrder = 'desc', ...filter } = query;

    return await db
      .collection('inspection')
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .toArray();
  },
  async createInspection(inspection) {
    const db = await connectDB();
    return await db.collection('inspection').insertOne(inspection);
  },
};
