import express, { Router } from 'express';
import { verifyWebhook } from '../controllers/orderController.js';

const router = Router();

router.post('/razorpay', express.raw({ type: 'application/json' }), verifyWebhook);

export default router;
