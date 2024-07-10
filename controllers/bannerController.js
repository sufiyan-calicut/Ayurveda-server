import {response} from 'express';
import BannerDB from '../models/BannerModel.js';

// ......................................GET ALL BANNERS (admin)....................................................

export const getAllBanners = async (req, res) => {
  try {
    const banners = await BannerDB.find();
    if (!banners) {
      res.status(404).json({message: `No data found`});
    }

    res.status(200).json({message: `Banners fetched successfully`, banners});
  } catch (error) {
    console.error(`Error in get all banners`, error.message);
    res.status(500).json({
      message: `Internal Server Error: Couldn't fetch banners`,
      error: error.message
    });
  }
};

// ......................................GET NON BLOCKED BANNERS (user).................................................

export const getNonBlockedBanners = async (req, res) => {
  try {
    const banners = await BannerDB.find({isBlocked: false});

    if (!banners) {
      res.status(404).json({message: `No banner found`});
    }

    res.status(200).json({message: `Banners Fetched Successfully`, banners});
  } catch (error) {
    console.error(`Error getting non blocked banners`, error.message);
    res
      .status(500)
      .json({message: `Internal Server Error: Couldn't fetch banners`});
  }
};

// ......................................ADD NEW BANNER.................................................

export const createBanner = async (req, res) => {
  try {
    const {title, imageUrl, description} = req.body;

    const newBanner = new BannerDB({
      title,
      imageUrl,
      description
    });

    await newBanner.save();

    res
      .status(201)
      .json({message: 'Banner added successfully', banner: newBanner});
  } catch (error) {
    console.error('Error adding new banner', error.message);
    res.status(500).json({
      message: `Internal Server Error: Could't add new banner`,
      error: error.message
    });
  }
};

// ................................................UPDATE BANNER............................................

export const updateBanner = async (req, res) => {
  try {
    const {_id} = req.params;
    const {title, description, imageUrl} = req.body;

    const banner = await BannerDB.findById(_id);
    if (!banner) {
      res.status(404).json({message: `Banner is not found`});
    }

    if (
      banner.title === title &&
      banner.description === description &&
      banner.imageUrl
    ) {
      return res.status(200).json({message: `No changes made`});
    }

    banner.set({
      title,
      description,
      imageUrl
    });

    const response = await banner.save();

    res
      .status(200)
      .json({message: 'Banner updated successfully', banner: response});
  } catch (error) {
    console.error(`Error updating banner: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error: Couldn't update banner",
      error: error.message
    });
  }
};

// ...............................................DELETE BANNER..........................................

export const deleteBanner = async (req, res) => {
  try {
    const {_id} = req.params;
    const response = await BannerDB.deleteOne({_id});

    if (response.deletedCount === 0) {
      return res.status(404).json({message: `banner not found or deleted`});
    }

    res.status(200).json({message: `Banner deleted successfully`});
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: Could't remove banner`,
      error: error.message
    });
  }
};

// ................................................BLOCK/UNBLOCK BANNER..........................................

export const updateBannerStatus = async (req, res) => {
  try {
    const {_id} = req.params;
    const banner = await BannerDB.findById({_id});

    if (!banner) {
      return res.status(404).json({message: `Banner not found`});
    }

    banner.isBlocked = !banner.isBlocked;

    const response = await banner.save();

    res.status(200).json({
      message: `banner is ${
        banner.isBlocked ? 'blocked' : 'unblocked'
      } successfully`,
      banner: response
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: Couldn't change status of banner`,
      error: error.message
    });
  }
};
