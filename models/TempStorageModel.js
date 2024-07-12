import mongoose from 'mongoose';

// it is used to store temporary data across the project for a specific time

const tempStorageSchema = new mongoose.Schema({
  tempData: Object,
  createdAt: {type: Date, expires: 1200, default: Date.now} // 20 minutes TTL
});

export const TempStorageDB = mongoose.model('TempData', tempStorageSchema);
