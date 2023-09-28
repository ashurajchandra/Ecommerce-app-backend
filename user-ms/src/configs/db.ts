import mongoose from 'mongoose';
import logger from './logger';

export default async () => {
  try {
    const mongoUri = (process.env.MONGO_URI ?? 'mongo:27017/test')
    await mongoose.connect(mongoUri)
    logger.info('DB connected')
  } catch (error: any) {
    logger.error(`Error -> ${error}`)
  }
}