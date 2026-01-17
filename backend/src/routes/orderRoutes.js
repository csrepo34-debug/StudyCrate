import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import { createOrder, listMyOrders, adminOrders, verifyClientConfirmation } from '../controllers/orderController.js';

const router = Router();

router.post('/', authenticate, createOrder);
router.get('/me', authenticate, listMyOrders);
router.get('/admin', authenticate, requireRole('admin'), adminOrders);
router.post('/verify', verifyClientConfirmation);

export default router;
