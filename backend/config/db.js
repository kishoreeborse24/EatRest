import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/restaurant');
    console.log('MongoDB connected');
  } catch (error) {
    console.warn('MongoDB unavailable, continuing in demo mode:', error.message);
  }
};
