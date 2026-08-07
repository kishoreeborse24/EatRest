import express from 'express';
import { createFood, deleteFood, getFood, listFoods, updateFood } from '../controllers/foodController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', listFoods);
router.get('/:id', getFood);
router.post('/', protect, createFood);
router.put('/:id', protect, updateFood);
router.delete('/:id', protect, deleteFood);

export default router;
