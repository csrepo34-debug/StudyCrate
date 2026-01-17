import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Programming', 'DSA', 'ML', 'DS', 'DAA', 'Others'], default: 'Others' },
    price: { type: Number, required: true, min: 0 },
    filePath: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model('Product', productSchema);
