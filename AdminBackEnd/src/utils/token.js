import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { env } from '../config/index.js';

let cachedSecret = null;

/**
 * Signing secret: JWT_SECRET when provided, otherwise one generated on first
 * use and kept in the private data folder so sessions survive restarts.
 */
const getSecret = () => {
  if (cachedSecret) return cachedSecret;
  if (env.jwtSecret) return (cachedSecret = env.jwtSecret);

  const file = join(env.privateDir, 'jwt-secret');
  if (!existsSync(file)) {
    mkdirSync(env.privateDir, { recursive: true });
    writeFileSync(file, randomBytes(48).toString('hex'), { mode: 0o600 });
  }
  return (cachedSecret = readFileSync(file, 'utf8').trim());
};

export const signToken = (admin) =>
  jwt.sign({ sub: admin._id, username: admin.username }, getSecret(), { expiresIn: env.jwtExpiresIn });

/** Throws when the token is missing, malformed, tampered with or expired. */
export const verifyToken = (token) => jwt.verify(token, getSecret());
