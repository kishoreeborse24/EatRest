import express from 'express';
import { createOrder, deleteOrder, listOrders, updateOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', protect, listOrders);
router.post('/', protect, createOrder);
router.put('/:id', protect, updateOrder);
router.delete('/:id', protect, deleteOrder);

export default router;
