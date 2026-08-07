import express from 'express';
import { addToCart, getCart, removeCartItem, updateCart } from '../controllers/cartController.js';

const router = express.Router();
router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCart);
router.delete('/:id', removeCartItem);

export default router;
