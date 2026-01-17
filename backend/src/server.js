import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Razorpay from 'razorpay';
import { sendReceipt } from './utils/mailer.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// In-memory order store (will be cleared on restart — for demo)
const orders = new Map();

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create Razorpay order (no auth needed)
app.post('/api/checkout', async (req, res) => {
  try {
    const { productId, amount, productTitle } = req.body;
    if (!productId || !amount) return res.status(400).json({ message: 'Product ID and amount required' });

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `receipt_${productId}_${Date.now()}`,
      notes: { productId }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Store order info temporarily (in-memory for now)
    orders.set(razorpayOrder.id, {
      productId,
      amount,
      productTitle,
      createdAt: new Date(),
      status: 'created'
    });

    res.json({
      orderId: razorpayOrder.id,
      amount: options.amount,
      currency: options.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Checkout failed' });
  }
});

// Verify payment and generate download token
app.post('/api/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer_email, customer_name } = req.body;

    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    // Get order details
    const order = orders.get(razorpay_order_id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Update order status
    order.status = 'paid';
    order.paymentId = razorpay_payment_id;
    order.customer = { email: customer_email, name: customer_name };
    order.paidAt = new Date();

    // Generate time-limited download token (valid for 7 days)
    const token = jwt.sign(
      { orderId: razorpay_order_id, productId: order.productId },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    // Send email with download link
    const downloadLink = `${process.env.CLIENT_URL}/download/${token}`;
    await sendReceipt({
      to: customer_email,
      subject: `Your purchase: ${order.productTitle}`,
      html: `
        <h2>Thank you for your purchase!</h2>
        <p>Hi ${customer_name},</p>
        <p>Your purchase of <strong>${order.productTitle}</strong> is confirmed.</p>
        <p><a href="${downloadLink}" style="background: #22c55e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download your file</a></p>
        <p>Link valid for 7 days. Order ID: ${razorpay_order_id}</p>
      `
    });

    res.json({ token, downloadLink, message: 'Payment verified! Check your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Verification failed' });
  }
});

// Download file with token verification
app.get('/api/download/:token', (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, process.env.JWT_SECRET || 'secret');
    const order = orders.get(payload.orderId);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Map product ID to file path (you'll need to update this based on your files)
    const filePath = path.join(__dirname, '..', 'uploads', `product_${payload.productId}.pdf`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(filePath);
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL}`);
});
