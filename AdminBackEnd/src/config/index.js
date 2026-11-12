import dotenv from 'dotenv';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const appRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5001,
  databaseUrl: process.env.DATABASE_URL || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5174',

  // Content files shared with the public API when no database is configured.
  dataDir: process.env.DATA_DIR || join(appRoot, '..', 'BackEnd', 'data'),
  // Admin accounts and the token signing secret never leave this app's folder.
  privateDir: process.env.PRIVATE_DIR || join(appRoot, 'data'),

  uploadDir: process.env.UPLOAD_DIR || join(appRoot, 'uploads'),
  uploadPublicUrl: (process.env.UPLOAD_PUBLIC_URL || '').replace(/\/$/, ''),
  maxUploadBytes: 8 * 1024 * 1024,

  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: '7d',
};

export const isProduction = env.nodeEnv === 'production';
export const isDevelopment = env.nodeEnv === 'development';
