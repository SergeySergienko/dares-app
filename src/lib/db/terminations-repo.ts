import { ClientSession } from 'mongodb';
import { connectDB } from './mongo-db';
import { TerminationModel } from '@/models/TerminationModel';

export const terminationsRepo = {
  async createTermination(
    termination: TerminationModel,
    session?: ClientSession
  ) {
    const db = await connectDB();
    return await db
      .collection<TerminationModel>('termination')
      .insertOne(termination, { session });
  },
};
