import express from 'express';
import { createIntent, webhook } from '../controllers/paymentController.js';

const router = express.Router();
router.post('/create-intent', createIntent);
router.post('/webhook', webhook);

export default router;
