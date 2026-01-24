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
import authRoutes from './routes/authRoutes.js';
import { authenticate } from './middleware/auth.js';
import { getProductById } from './config/products.js';
import { sendReceipt, sendContactMessage } from './utils/mailer.js';
import { resolveFilePath, fileExists } from './utils/storage.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const sanitizeBaseUrl = (value = '') => value.trim().replace(/\/$/, '');
const PUBLIC_API_BASE = sanitizeBaseUrl(process.env.PUBLIC_API_URL || process.env.API_BASE_URL) || `http://localhost:${PORT}`;
const parseOrigins = (value = '') =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const CLIENT_ORIGINS = parseOrigins(process.env.CLIENT_URL);
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn('Razorpay credentials are missing. Payment routes will reject incoming requests until configured.');
}
if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET is missing. Token issuance/verification will fail until configured.');
}

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (CLIENT_ORIGINS.length === 0 || CLIENT_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Auth routes
app.use('/api/auth', authRoutes);

// Simple health checks
app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Razorpay instance
const razorpay = RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET ? new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET }) : null;

// Track short-lived Razorpay orders until verification completes
const pendingOrders = new Map();

const buildDownloadLink = (token) => `${PUBLIC_API_BASE}/api/download/${token}`;

const resolveProductFile = (productId) => {
  const product = getProductById(productId);
  if (product?.fileName) {
    return resolveFilePath(product.fileName);
  }
  return resolveFilePath(`product_${productId}.pdf`);
};

const getPendingOrderDetails = async (razorpayOrderId) => {
  if (pendingOrders.has(razorpayOrderId)) {
    return pendingOrders.get(razorpayOrderId);
  }

  if (!razorpay) {
    console.error('Cannot hydrate pending order because Razorpay client is not configured.');
    return null;
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

// Create Razorpay order (auth required)
app.post('/api/checkout', authenticate, async (req, res) => {
  try {
    if (!razorpay) {
      console.error('Checkout attempted without Razorpay credentials');
      return res.status(500).json({ message: 'Payment gateway is not configured. Please contact support.' });
    }
    const { productId } = req.body;
    const product = getProductById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not available' });
    }

    // Razorpay limits receipt length to 40 characters
    const rawReceipt = `p_${productId}_${Date.now().toString(36)}`;
    const safeReceipt = rawReceipt.slice(0, 40);

    const options = {
      amount: Math.round(product.price * 100),
      currency: 'INR',
      receipt: safeReceipt,
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
      key: RAZORPAY_KEY_ID,
      price: product.price,
      productTitle: product.title
    });
  } catch (err) {
    console.error('Error during /api/checkout Razorpay order creation', {
      message: err?.message,
      statusCode: err?.statusCode,
      error: err?.error
    });

    const reason = err?.error?.description || err?.message;
    res.status(500).json({ message: reason || 'Checkout failed' });
  }
});

// Verify payment and generate download token (auth required)
app.post('/api/verify', authenticate, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer_email, customer_name } = req.body;

    if (!customer_email || !customer_name) {
      return res.status(400).json({ message: 'Customer name and email required' });
    }

    const secret = RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error('Razorpay verification attempted without secret');
      return res.status(500).json({ message: 'Payment verification unavailable. Please contact support.' });
    }
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const orderDetails = await getPendingOrderDetails(razorpay_order_id);
    if (!orderDetails) return res.status(404).json({ message: 'Order not found' });

    pendingOrders.delete(razorpay_order_id);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('Attempted to sign download token without JWT_SECRET');
      return res.status(500).json({ message: 'Download service unavailable. Please contact support.' });
    }

    const token = jwt.sign({ orderId: razorpay_order_id, productId: orderDetails.productId }, jwtSecret, { expiresIn: '7d' });

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
        tokenExpiresAt: expiresAt,
        user: req.user?._id || undefined
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const downloadLink = buildDownloadLink(token);

    // NEW: send data to Zapier so it can email the Drive link
    const product = getProductById(orderDetails.productId);
    const driveUrl = product?.driveUrl;
    try {
      if (process.env.ZAPIER_HOOK_URL && driveUrl) {
        await fetch(process.env.ZAPIER_HOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: customer_email,
            name: customer_name,
            productId: orderDetails.productId,
            productTitle: orderDetails.productTitle,
            amount: orderDetails.amount,
            driveUrl
          })
        });
      }
    } catch (zapErr) {
      console.error('Zapier hook failed (continuing):', zapErr?.message || zapErr);
    }

    // (optional) keep your existing backend email as well
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
    console.error('Error during /api/verify payment verification', {
      message: err?.message,
      name: err?.name,
      stack: err?.stack
    });
    res.status(500).json({ message: err?.message || 'Verification failed' });
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

// Get purchases for the authenticated user
app.get('/api/my-orders', authenticate, async (req, res) => {
  try {
    const userId = req.user?._id;
    const email = req.user?.email;

    const orders = await Order.find({
      $or: [
        userId ? { user: userId, status: 'paid' } : null,
        email ? { customerEmail: email, status: 'paid' } : null
      ].filter(Boolean)
    })
      .sort({ createdAt: -1 })
      .lean();

    const normalized = orders.map((order) => {
      const product = getProductById(order.productId);
      return {
        id: order._id,
        productId: order.productId,
        productTitle: order.productTitle || product?.title,
        amount: order.amount,
        createdAt: order.createdAt,
        status: order.status
      };
    });

    res.json({ orders: normalized });
  } catch (err) {
    console.error('Error fetching user orders', err);
    res.status(500).json({ message: 'Unable to load your purchases right now.' });
  }
});

// Provide a free sample download
app.get('/api/sample-download', (_req, res) => {
  const samplePath = resolveFilePath('studycrate-sample.pdf');
  if (!fileExists(samplePath)) {
    console.error('Sample download file missing at path', samplePath);
    return res.status(404).json({ message: 'Sample not available' });
  }

  res.download(samplePath, 'StudyCrate-sample.pdf');
});

app.get('/api/sample-notebook', (_req, res) => {
  const notebookPath = resolveFilePath('studycrate-sample-notebook.ipynb');

  if (!fileExists(notebookPath)) {
    console.error('Sample notebook file missing at path', notebookPath);
    return res.status(404).json({ message: 'Sample notebook not available' });
  }

  res.download(notebookPath, 'StudyCrate-sample-notebook.ipynb');
});

// Download file with token verification
app.get('/api/download/:token', async (req, res) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('Attempted to verify download token without JWT_SECRET');
      return res.status(500).json({ message: 'Download service unavailable. Please contact support.' });
    }
    const payload = jwt.verify(req.params.token, jwtSecret);
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

    if (!fileExists(filePath)) {
      console.error('Download file not found for product', {
        productId: order.productId,
        expectedPath: filePath
      });
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
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
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
