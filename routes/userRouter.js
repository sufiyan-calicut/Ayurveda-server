import express from 'express';
import {getNonBlockedBanners} from '../controllers/bannerController.js';
import {userSignup} from '../controllers/authController.js';
import {validateUser} from '../validators/userValidator.js';
const router = express.Router();

router.get('/banners', getNonBlockedBanners);

// ................................AUTH RELATED ROUTES..................................................
router.post('/auth/signup', validateUser, userSignup);

export default router;
