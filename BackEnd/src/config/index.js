import dotenv from 'dotenv';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

/**
 * Central, validated application configuration.
 * Every environment variable is read in exactly one place.
 */
export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  // postgres://user:password@host:5432/dbname — takes priority over MongoDB when set
  databaseUrl: process.env.DATABASE_URL || '',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nyulo_interior',
  // Main site and admin panel dev servers
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174',
  adminApiKey: process.env.ADMIN_API_KEY || '',
  // Where leads are stored when MongoDB is not configured. Lives outside src/
  // so a redeploy never touches it.
  dataDir: process.env.DATA_DIR || join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data'),
};

export const isProduction = env.nodeEnv === 'production';
export const isDevelopment = env.nodeEnv === 'development';
