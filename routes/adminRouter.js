import express from 'express';
import {
  createBanner,
  deleteBanner,
  getAllBanners,
  updateBanner,
  updateBannerStatus
} from '../controllers/bannerController.js';
import {validateMongoId, validateBanner, validateSignIn, validateTopBar, validateProduct} from '../validators/validator.js';
import { adminTokenVerify, isAdmin, verifyToken } from '../middlewares/auth.js';
import { signIn } from '../controllers/authController.js';
import { mongoIdValidation } from '../validators/validationRules.js';
import { addTopBar, getTopBar, removeTopBar, updateTopBar, updateTopBarStatus } from '../controllers/topBarController.js';
import { createProduct, deleteProduct, getAllProducts, updateProduct, updateProductQuantity, updateProductStatus } from '../controllers/productController.js';

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


// ...........................................TOP-BAR RELATED ROUTES..........................................

adminRouter.post('/top-bar',adminTokenVerify,validateTopBar,addTopBar)
adminRouter.get('/top-bar',adminTokenVerify,getTopBar)
adminRouter.put('/top-bar/:_id',adminTokenVerify,validateMongoId,validateTopBar,updateTopBar)
adminRouter.patch('/top-bar/:_id/status',adminTokenVerify,validateMongoId,updateTopBarStatus)
adminRouter.delete('/top-bar/:_id',adminTokenVerify,validateMongoId,removeTopBar)


// ...........................................PRODUCT-RELATED_ROUTES..........................................

adminRouter.get('/products',adminTokenVerify,getAllProducts)
adminRouter.post('/products',adminTokenVerify,validateProduct,createProduct)
adminRouter.put('/products/:_id',adminTokenVerify,validateProduct,updateProduct)
adminRouter.patch('/products/:_id/status',adminTokenVerify,validateMongoId,updateProductStatus)
adminRouter.patch('/products/:_id/quantity',adminTokenVerify,validateMongoId,updateProductQuantity)
adminRouter.delete('/products/:_id',adminTokenVerify,deleteProduct)
export default adminRouter;
