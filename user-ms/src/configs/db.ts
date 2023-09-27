import mongoose from 'mongoose';
import 'dotenv/config';

export default async () => {
  try {
    const mongoUri = (process.env.MONGO_URI ?? 'mongodb://localhost:27017/test')
    await mongoose.connect(mongoUri)
    console.log('DB connected')
  } catch (error: any) {
    console.log(`Error -> ${error}`)
  }
}