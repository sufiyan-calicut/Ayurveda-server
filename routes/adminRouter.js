import express from 'express';
import {
  createBanner,
  deleteBanner,
  getAllBanners,
  updateBanner,
  updateBannerStatus
} from '../controllers/bannerController.js';
import {validateMongoId, validateBanner, validateSignIn} from '../validators/validator.js';
import { adminTokenVerify, isAdmin, verifyToken } from '../middlewares/auth.js';
import { signIn } from '../controllers/authController.js';
import { mongoIdValidation } from '../validators/validationRules.js';

const adminRouter = express.Router();


// ...................................................AUTH.................................................

adminRouter.get('/auth/sign-in',validateSignIn,signIn)
// ...................................................BANNER RELATED ROUTES...........................................

adminRouter.post('/banners',adminTokenVerify, validateBanner, createBanner);
adminRouter.get('/banners',adminTokenVerify, getAllBanners);
adminRouter.put(
  '/banners/:_id',
  adminTokenVerify,
  mongoIdValidation,
  validateBanner,
  updateBanner
);
adminRouter.delete('/banners/:_id',adminTokenVerify, validateMongoId, deleteBanner);
adminRouter.patch('/banners/:_id/status',adminTokenVerify, validateMongoId, updateBannerStatus);

export default adminRouter;
