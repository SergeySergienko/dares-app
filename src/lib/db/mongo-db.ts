import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

const client = new MongoClient(MONGO_URI);

export async function connectDB() {
  try {
    await client.connect();
    return client.db(DB_NAME);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
