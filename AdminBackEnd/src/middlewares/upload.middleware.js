import multer from 'multer';
import { randomBytes } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { env } from '../config/index.js';
import ApiError from '../utils/ApiError.js';

/**
 * Accepted image types and the extension each is saved with. The extension
 * comes from this table, never from the uploaded file name. SVG is left out
 * on purpose: it can carry scripts.
 */
const EXTENSIONS = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    mkdirSync(env.uploadDir, { recursive: true });
    cb(null, env.uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${randomBytes(6).toString('hex')}.${EXTENSIONS[file.mimetype]}`);
  },
});

export const uploadImage = multer({
  storage,
  limits: { fileSize: env.maxUploadBytes, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (EXTENSIONS[file.mimetype]) cb(null, true);
    else cb(ApiError.badRequest('Only JPG, PNG, WebP, AVIF or GIF images can be uploaded'));
  },
}).single('file');
