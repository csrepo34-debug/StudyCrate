import Product from '../models/Product.js';
import { resolveFilePath, fileExists } from '../utils/storage.js';

export const listActive = async (_req, res, next) => {
  try {
    const products = await Product.find({ isActive: true }).select('-filePath');
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).select('-filePath');
    if (!product || !product.isActive) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { title, description, category, price, isActive } = req.body;
    const filePath = req.file?.filename;
    if (!filePath) return res.status(400).json({ message: 'File is required' });
    const product = await Product.create({ title, description, category, price, filePath, isActive });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updates = req.body;
    if (req.file?.filename) updates.filePath = req.file.filename;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const toggleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    product.isActive = !product.isActive;
    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const downloadProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    const hasAccess =
      req.user.role === 'admin' || req.user.purchasedProducts?.some((p) => p.toString() === product._id.toString());
    if (!hasAccess) return res.status(403).json({ message: 'Purchase required' });
    const filePath = resolveFilePath(product.filePath);
    if (!fileExists(filePath)) return res.status(404).json({ message: 'File missing' });
    res.download(filePath, `${product.title}.pdf`);
  } catch (err) {
    next(err);
  }
};
