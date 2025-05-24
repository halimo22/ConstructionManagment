import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error(
    "MONGO_URI must be set in the environment variables. Did you forget to set up the .env file?",
  );
}

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI as string;
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;