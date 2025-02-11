import { connectDB } from './mongodb';

export const tanksRepo = {
  async getTanks(query) {
    const db = await connectDB();
    const filter = { ...query };

    return await db.collection('tanks').find(filter).toArray();
  },
};
