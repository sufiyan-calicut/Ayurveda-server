import express from 'express';
import {getNonBlockedBanners} from '../controllers/bannerController.js';
import {forgotPassword, resendOtp, resetPassword, signIn, userSignup, verifyOtp} from '../controllers/authController.js';
import { validateEmail, validateMongoId, validateOtp, validatePassword, validateRating, validateSignIn, validateUser } from '../validators/validator.js';
import { emailValidation, mongoIdValidation } from '../validators/validationRules.js';
import { getTopBar } from '../controllers/topBarController.js';
import { addRatingAndReview, getAllProducts } from '../controllers/productController.js';
import { verifyToken } from '../middlewares/auth.js';

const userRouter = express.Router();




// ................................AUTH RELATED ROUTES..................................................
userRouter.post('/auth/signup', validateUser, userSignup);
userRouter.post('/auth/sign-in', validateSignIn, signIn);
userRouter.get('/auth/resend-otp/:_id',validateMongoId, resendOtp);
userRouter.post('/auth/verify-otp/:_id',validateOtp, verifyOtp);
userRouter.post('/auth/forgot-password', validateEmail, forgotPassword);
userRouter.post('/auth/reset-password/:_id',validatePassword , resetPassword);

// ..................................TOP-BAR-RELATED-ROUTES............................................
userRouter.get('/top-bar',getTopBar)



// ...............................BANNER-RELATED-ROUTES..................................................
userRouter.get('/banners', getNonBlockedBanners);

userRouter.get('/products', getAllProducts)
userRouter.post('/products/rating/:_id',verifyToken,validateRating, addRatingAndReview)


export default userRouter;
