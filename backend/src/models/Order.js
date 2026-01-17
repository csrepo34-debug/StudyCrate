import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['created', 'paid', 'failed', 'refunded'], default: 'created' }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model('Order', orderSchema);
