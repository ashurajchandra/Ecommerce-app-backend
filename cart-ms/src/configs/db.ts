import mongoose from 'mongoose';
import { config } from 'dotenv';
import logger from './logger';
config();

export default async () => {
  try {
    const mongoUri = (process.env.MONGO_URI ?? "mongodb://localhost:27017/test")
    // Connect to MongoDB
    await mongoose.connect(mongoUri)
    logger.info('DB connected')
  } catch (error: any) {
    logger.error(`Error -> ${error}`)
  }
}