import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import Order from './models/Order.js';
import { getProductById } from './config/products.js';
import { sendReceipt, sendContactMessage } from './utils/mailer.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const sanitizeBaseUrl = (value = '') => value.trim().replace(/\/$/, '');
const PUBLIC_API_BASE = sanitizeBaseUrl(process.env.PUBLIC_API_URL || process.env.API_BASE_URL) || `http://localhost:${PORT}`;
const CLIENT_ORIGIN = process.env.CLIENT_URL || '*';

// Middleware
app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple health checks
app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Track short-lived Razorpay orders until verification completes
const pendingOrders = new Map();

const buildDownloadLink = (token) => `${PUBLIC_API_BASE}/api/download/${token}`;

const resolveProductFile = (productId) => {
  const product = getProductById(productId);
  if (!product) return path.join(__dirname, '..', 'uploads', `product_${productId}.pdf`);
  return path.join(__dirname, '..', 'uploads', product.fileName);
};

const getPendingOrderDetails = async (razorpayOrderId) => {
  if (pendingOrders.has(razorpayOrderId)) {
    return pendingOrders.get(razorpayOrderId);
  }

  try {
    const fetchedOrder = await razorpay.orders.fetch(razorpayOrderId);
    const productId = fetchedOrder?.notes?.productId;
    const product = productId ? getProductById(productId) : null;
    if (product) {
      const hydrated = {
        productId,
        amount: product.price,
        productTitle: product.title
      };
      pendingOrders.set(razorpayOrderId, hydrated);
      return hydrated;
    }
  } catch (fetchErr) {
    console.error('Unable to hydrate pending order from Razorpay', fetchErr);
  }

  return null;
};

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create Razorpay order (no auth needed)
app.post('/api/checkout', async (req, res) => {
  try {
    const { productId } = req.body;
    const product = getProductById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not available' });
    }

    const options = {
      amount: Math.round(product.price * 100),
      currency: 'INR',
      receipt: `receipt_${productId}_${Date.now()}`,
      notes: { productId }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    pendingOrders.set(razorpayOrder.id, {
      productId,
      amount: product.price,
      productTitle: product.title,
      createdAt: new Date(),
      status: 'created'
    });

    res.json({
      orderId: razorpayOrder.id,
      amount: options.amount,
      currency: options.currency,
      key: process.env.RAZORPAY_KEY_ID,
      price: product.price,
      productTitle: product.title
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

    if (!customer_email || !customer_name) {
      return res.status(400).json({ message: 'Customer name and email required' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const orderDetails = await getPendingOrderDetails(razorpay_order_id);
    if (!orderDetails) return res.status(404).json({ message: 'Order not found' });

    pendingOrders.delete(razorpay_order_id);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const token = jwt.sign(
      { orderId: razorpay_order_id, productId: orderDetails.productId },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayOrderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        productId: orderDetails.productId,
        productTitle: orderDetails.productTitle,
        amount: orderDetails.amount,
        customerEmail: customer_email,
        customerName: customer_name,
        status: 'paid',
        downloadToken: token,
        tokenExpiresAt: expiresAt
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const downloadLink = buildDownloadLink(token);
    await sendReceipt({
      to: customer_email,
      subject: `Your purchase: ${orderDetails.productTitle}`,
      html: `
        <h2>Thank you for your purchase!</h2>
        <p>Hi ${customer_name},</p>
        <p>Your purchase of <strong>${orderDetails.productTitle}</strong> is confirmed.</p>
        <p><a href="${downloadLink}" style="background: #22c55e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download your file</a></p>
        <p>Link valid for 7 days. Order ID: ${razorpay_order_id}</p>
      `
    });

    res.json({ token, downloadLink, message: 'Payment verified! Download ready.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Verification failed' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    await sendContactMessage({ name, email, message });

    res.json({ message: 'Your message has been sent. Thank you for reaching out!' });
  } catch (err) {
    console.error('Error handling contact form submission:', err);
    res.status(500).json({ message: 'Unable to send your message right now. Please try again later.' });
  }
});

// Provide a free sample download
app.get('/api/sample-download', (_req, res) => {
  const samplePath = path.join(__dirname, '..', 'uploads', 'studycrate-sample.pdf');
  if (!fs.existsSync(samplePath)) {
    return res.status(404).json({ message: 'Sample not available' });
  }

  res.download(samplePath, 'StudyCrate-sample.pdf');
});

app.get('/api/sample-notebook', (_req, res) => {
  const notebookPath = path.join(__dirname, '..', 'uploads', 'studycrate-sample-notebook.ipynb');

  if (!fs.existsSync(notebookPath)) {
    return res.status(404).json({ message: 'Sample notebook not available' });
  }

  res.download(notebookPath, 'StudyCrate-sample-notebook.ipynb');
});

// Download file with token verification
app.get('/api/download/:token', async (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, process.env.JWT_SECRET || 'secret');
    const order = await Order.findOne({ razorpayOrderId: payload.orderId, status: 'paid' });

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (!order.downloadToken || order.downloadToken !== req.params.token) {
      return res.status(401).json({ message: 'Token mismatch' });
    }
    if (order.tokenExpiresAt && order.tokenExpiresAt < new Date()) {
      return res.status(401).json({ message: 'Download link expired' });
    }

    const product = getProductById(order.productId);
    const filePath = resolveProductFile(order.productId);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    const downloadName = product?.fileName || path.basename(filePath);
    res.download(filePath, downloadName);
  } catch (err) {
    console.error('Download failed', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true
    });

    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Client URL: ${process.env.CLIENT_URL}`);
      console.log(`Public API URL: ${PUBLIC_API_BASE}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

startServer();
