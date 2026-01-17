import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const resolveFilePath = (relativePath) => {
  const root = process.env.FILE_STORAGE_ROOT || path.join(__dirname, '..', 'uploads');
  return path.join(root, relativePath);
};

export const fileExists = (fullPath) => fs.existsSync(fullPath);
