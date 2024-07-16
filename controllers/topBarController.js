import {TopBarDB} from '../models/TopBarModel';

// ..............................................................GET-TOP-BAR...............................................
 const getTopBar = async (req, res, options) => {
  try {

    const { role } = options;
    let query = {};
    
    if (role === 'user') {
        query.isBlocked = false; // Users see only unblocked top bars
      }

    const topBars = await TopBarDB.find();
    res.status(200).json(topBars);
  } catch (error) {
    console.error(`Error in getTopBar: ${error.message}`);
    res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

// Admin-specific function
export const getAdminTopBar = (req, res) => {
  getTopBar(req, res, {role: 'admin'});
};

// User-specific function
export const getUserTopBar = (req, res) => {
  getTopBar(req, res, {role: 'user'});
};

// ..............................................................ADD-TOP-BAR...............................................
export const addTopBar = async (req, res) => {
  try {
    const {title, description} = req.body;
    const newTopBar = new TopBarDB({title, description});
    await newTopBar.save();
    res
      .status(201)
      .json({message: 'Top Bar added successfully', topBar: newTopBar});
  } catch (error) {
    console.error(`Error in addTopBar: ${error.message}`);
    res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

// ..............................................................UPDATE-TOP-BAR...............................................
export const updateTopBar = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description} = req.body;
    const updatedTopBar = await TopBarDB.findByIdAndUpdate(
      id,
      {title, description},
      {new: true}
    );
    if (!updatedTopBar) {
      return res.status(404).json({message: 'Top Bar not found'});
    }
    res
      .status(200)
      .json({message: 'Top Bar updated successfully', topBar: updatedTopBar});
  } catch (error) {
    console.error(`Error in updateTopBar: ${error.message}`);
    res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

// ..............................................................UPDATE-TOP-BAR-STATUS...............................................
export const updateTopBarStatus = async (req, res) => {
  try {
    const {id} = req.params;
    const {status} = req.body;
    const updatedTopBar = await TopBarDB.findByIdAndUpdate(
      id,
      {status},
      {new: true}
    );
    if (!updatedTopBar) {
      return res.status(404).json({message: 'Top Bar not found'});
    }
    res
      .status(200)
      .json({
        message: 'Top Bar status updated successfully',
        topBar: updatedTopBar
      });
  } catch (error) {
    console.error(`Error in updateTopBarStatus: ${error.message}`);
    res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

// ..............................................................REMOVE-TOP-BAR...............................................
export const removeTopBar = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedTopBar = await TopBarDB.findByIdAndRemove(id);
    if (!deletedTopBar) {
      return res.status(404).json({message: 'Top Bar not found'});
    }
    res.status(200).json({message: 'Top Bar removed successfully'});
  } catch (error) {
    console.error(`Error in removeTopBar: ${error.message}`);
    res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};
