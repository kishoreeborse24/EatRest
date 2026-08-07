import express from 'express';
import { createReview, deleteReview, listReviews, updateReview } from '../controllers/reviewController.js';

const router = express.Router();
router.get('/', listReviews);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
