import mongoose from 'mongoose';
import { env } from './index.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.DB_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
