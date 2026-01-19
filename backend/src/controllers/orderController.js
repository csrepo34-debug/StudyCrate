import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { sendReceipt } from '../utils/mailer.js';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn('Razorpay credentials are missing. Authenticated order routes will be disabled until configured.');
}

const razorpay = RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET ? new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET }) : null;

export const createOrder = async (req, res, next) => {
  try {
    if (!razorpay) {
      return res.status(500).json({ message: 'Payment gateway is not configured. Please contact support.' });
    }
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product || !product.isActive) return res.status(404).json({ message: 'Product unavailable' });

    const options = {
      amount: Math.round(product.price * 100),
      currency: 'INR',
      receipt: `receipt_${productId}_${Date.now()}`,
      notes: { userId: req.user._id.toString(), productId }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    await Order.create({
      userId: req.user._id,
      productId: product._id,
      paymentId: razorpayOrder.id,
      amount: product.price,
      status: 'created'
    });

    res.json({ orderId: razorpayOrder.id, amount: options.amount, currency: options.currency, key: RAZORPAY_KEY_ID });
  } catch (err) {
    next(err);
  }
};

export const listMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('productId', 'title price category');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const adminOrders = async (_req, res, next) => {
  try {
    const orders = await Order.find().populate('userId', 'email').populate('productId', 'title price');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const verifyWebhook = async (req, res, next) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      return res.status(500).json({ message: 'Webhook secret not configured.' });
    }
    const body = JSON.stringify(req.body);
    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
    if (signature !== expected) return res.status(400).json({ message: 'Invalid signature' });

    const { payload } = req.body;
    const payment = payload?.payment?.entity;
    if (!payment) return res.status(400).json({ message: 'Invalid payload' });

    const orderDoc = await Order.findOne({ paymentId: payment.order_id });
    if (!orderDoc) return res.status(404).json({ message: 'Order not found' });

    orderDoc.status = payment.status === 'captured' ? 'paid' : payment.status;
    await orderDoc.save();

    if (orderDoc.status === 'paid') {
      await User.findByIdAndUpdate(orderDoc.userId, { $addToSet: { purchasedProducts: orderDoc.productId } });
      const product = await Product.findById(orderDoc.productId);
      const user = await User.findById(orderDoc.userId);
      await sendReceipt({
        to: user.email,
        subject: 'Purchase receipt',
        text: `Thank you for purchasing ${product.title}. Order ${orderDoc.paymentId}`
      });
    }

    res.json({ status: 'ok' });
  } catch (err) {
    next(err);
  }
};

export const verifyClientConfirmation = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = RAZORPAY_KEY_SECRET;
    if (!secret) {
      return res.status(500).json({ message: 'Payment gateway is not configured.' });
    }
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    if (expected !== razorpay_signature) return res.status(400).json({ message: 'Invalid signature' });

    const orderDoc = await Order.findOneAndUpdate(
      { paymentId: razorpay_order_id },
      { status: 'paid', paymentId: razorpay_order_id },
      { new: true }
    );

    if (!orderDoc) return res.status(404).json({ message: 'Order not found' });
    await User.findByIdAndUpdate(orderDoc.userId, { $addToSet: { purchasedProducts: orderDoc.productId } });
    res.json({ status: 'verified' });
  } catch (err) {
    next(err);
  }
};
