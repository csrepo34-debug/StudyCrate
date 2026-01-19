import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    razorpayOrderId: { type: String, required: true, unique: true },
    paymentId: { type: String },
    productId: { type: String, required: true },
    productTitle: { type: String, required: true },
    amount: { type: Number, required: true },
    customerEmail: { type: String, required: true, lowercase: true, trim: true },
    customerName: { type: String, required: true },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
    downloadToken: { type: String },
    tokenExpiresAt: { type: Date }
  },
  { timestamps: true }
);

orderSchema.index({ customerEmail: 1, productId: 1, status: 1 });

export default mongoose.model('Order', orderSchema);
