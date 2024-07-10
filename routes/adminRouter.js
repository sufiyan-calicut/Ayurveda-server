import express from 'express';
import {createBanner, deleteBanner, getAllBanners, updateBanner, updateBannerStatus} from '../controllers/bannerController.js';
import {validateBanner} from '../validators/bannerValidator.js';
import {mongoIdValidator} from '../validators/mongoIdValidator.js';
const router = express.Router();

// ...................................................BANNER RELATED ROUTES...........................................

router.get('/banners',getAllBanners)
router.post('/banners', validateBanner, createBanner);
router.put(
  '/banners/:_id',
  mongoIdValidator,
  validateBanner,
  updateBanner
);
router.delete('/banners/:_id',mongoIdValidator,deleteBanner);
router.put('/banners/status/:_id', mongoIdValidator, updateBannerStatus);


export default router;
