import { TempStorageDB } from "../models/TempStorageModel.js";


// .............................................STORE-DATA-TEMPORALLY.....................................
export const storeTempData = async (data) => {
  try {
    const tempStoredData = await TempStorageDB.create({ tempData: data });
    return tempStoredData._id;
  } catch (error) {
    console.error(`Error storing temporary data: ${error.message}`);
    throw new Error('Error storing temporary data');
  }
};

// .............................................FETCH-TEMPORARY-DATA.....................................
export const getTempStoredData = async (_id) => {
  try {
    let data = await TempStorageDB.findOne({ _id });
    if (!data) {
      data = null; // handling this in where it is called
    }
    return data;
  } catch (error) {
    console.error(`Error fetching temporary data: ${error.message}`);
    throw new Error('Error fetching temporary data');
  }
};

// .............................................DELETE-TEMPORARY-DATA.....................................
export const removeTempStoredData = async (_id) => {
  try {
    const result = await TempStorageDB.deleteOne({ _id });
    if (result.deletedCount === 0) {
      throw new Error('Temporary data not found or already removed');
    }
  } catch (error) {
    console.error(`Error removing temporary data: ${error.message}`);
    throw new Error('Error removing temporary data');
  }
};
