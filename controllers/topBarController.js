import {TopBarDB} from '../models/TopBarModel.js';

// ..............................................................GET-TOP-BAR...............................................
export const getTopBar = async (req, res) => {
  try {
    let query = {};

    if (!req.user || (req.user && !req.user.isAdmin)) {
      query.isBlocked = false; // Users see only unblocked top bars
    }

    const topBars = await TopBarDB.find(query);
    if (!topBars.length) {
     return res.status(401).json({message: `No Top bar found`});
    }
   return res.status(200).json({message: `Top bar fetched successfully`, topBars});
  } catch (error) {
    console.error(`Error in getTopBar: ${error.message}`);
   return res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

// Admin-specific function
// export const getAdminTopBar = (req, res) => {
//   getTopBar(req, res, {role: 'admin'});
// };

// // User-specific function
// export const getUserTopBar = (req, res) => {
//   getTopBar(req, res, {role: 'user'});
// };

// ..............................................................ADD-TOP-BAR...............................................
export const addTopBar = async (req, res) => {
  try {
    const {title, description} = req.body;
    const newTopBar = new TopBarDB({title, description});
    await newTopBar.save();
    return res
      .status(201)
      .json({message: 'Top Bar added successfully', topBar: newTopBar});
  } catch (error) {
    console.error(`Error in addTopBar: ${error.message}`);
    return res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

// ..............................................................UPDATE-TOP-BAR...............................................
export const updateTopBar = async (req, res) => {
  try {
    const {_id} = req.params;
    const {title, description} = req.body;
    const updatedTopBar = await TopBarDB.findByIdAndUpdate(
      _id,
      {title, description},
      {new: true}
    );
    if (!updatedTopBar) {
      return res.status(404).json({message: 'Top Bar not found'});
    }
    return res
      .status(200)
      .json({message: 'Top Bar updated successfully', topBar: updatedTopBar});
  } catch (error) {
    console.error(`Error in updateTopBar: ${error.message}`);
    return res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

// ..............................................................UPDATE-TOP-BAR-STATUS...............................................
export const updateTopBarStatus = async (req, res) => {
  try {
    const {_id} = req.params;
    
    const topBar = await TopBarDB.findById({_id});
    
    if (!topBar) {
      return res.status(404).json({message: 'Top Bar not found'});
    }

    topBar.isBlocked = !topBar.isBlocked;

    const updatedTopBar = await topBar.save();
    res.status(200).json({
      message: `Top bar is ${topBar.isBlocked ? 'blocked':'unblocked'} Successfully`,
      topBar: updatedTopBar
    });
  } catch (error) {
    console.error(`Error in updateTopBarStatus: ${error.message}`);
    return res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

// ..............................................................REMOVE-TOP-BAR...............................................
export const removeTopBar = async (req, res) => {
  try {
    const {_id} = req.params;
    const deletedTopBar = await TopBarDB.findByIdAndDelete({_id});
    if (!deletedTopBar) {
      return res.status(404).json({message: 'Top Bar not found'});
    }
    res.status(200).json({message: 'Top Bar removed successfully'});
  } catch (error) {
    console.error(`Error in removeTopBar: ${error.message}`);
    return res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};
