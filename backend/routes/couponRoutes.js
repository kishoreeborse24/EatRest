import express from 'express';
import { createCoupon, deleteCoupon, listCoupons, updateCoupon } from '../controllers/couponController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', listCoupons);
router.post('/', protect, createCoupon);
router.put('/:code', protect, updateCoupon);
router.delete('/:code', protect, deleteCoupon);

export default router;
