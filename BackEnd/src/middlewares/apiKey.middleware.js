import ApiError from '../utils/ApiError.js';
import { env } from '../config/index.js';

/**
 * Minimal guard for admin-only write endpoints. Replace with a full
 * JWT/RBAC auth module when an admin panel is added.
 */
export const requireApiKey = (req, _res, next) => {
  if (!env.adminApiKey) {
    return next(ApiError.forbidden('Admin API key is not configured on the server'));
  }
  if (req.headers['x-api-key'] !== env.adminApiKey) {
    return next(ApiError.unauthorized('Invalid or missing API key'));
  }
  next();
};
