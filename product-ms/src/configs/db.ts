import mongoose from 'mongoose';
import 'dotenv/config';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async () => {
  try {
    const mongoUri = (process.env.MONGO_URI ?? 'mongodb://localhost:27017/test')
    // Connect to MongoDB
    await mongoose.connect(mongoUri)
    console.log('DB connected')
  } catch (error: any) {
    console.log(`Error -> ${error}`)
  }
}