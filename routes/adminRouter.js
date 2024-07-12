import express from 'express';
import {
  createBanner,
  deleteBanner,
  getAllBanners,
  updateBanner,
  updateBannerStatus
} from '../controllers/bannerController.js';
import {validateMongoId, validateBanner} from '../validators/validator.js';

const adminRouter = express.Router();

// ...................................................BANNER RELATED ROUTES...........................................

adminRouter.get('/banners', getAllBanners);
adminRouter.post('/banners', validateBanner, createBanner);
adminRouter.put(
  '/banners/:_id',

  validateBanner,
  updateBanner
);
adminRouter.delete('/banners/:_id', validateMongoId, deleteBanner);
adminRouter.put('/banners/status/:_id', validateMongoId, updateBannerStatus);

export default adminRouter;
