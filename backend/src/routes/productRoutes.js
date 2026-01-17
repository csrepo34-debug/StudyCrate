import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { listActive, getById, createProduct, updateProduct, toggleProduct, downloadProduct } from '../controllers/productController.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, process.env.FILE_STORAGE_ROOT || 'uploads'),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({ storage });

router.get('/', listActive);
router.get('/:id', getById);

router.post('/', authenticate, requireRole('admin'), upload.single('file'), createProduct);
router.put('/:id', authenticate, requireRole('admin'), upload.single('file'), updateProduct);
router.post('/:id/toggle', authenticate, requireRole('admin'), toggleProduct);
router.get('/:id/download', authenticate, downloadProduct);

export default router;
