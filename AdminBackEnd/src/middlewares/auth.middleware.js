import ApiError from '../utils/ApiError.js';
import { verifyToken } from '../utils/token.js';

/** Requires a valid `Authorization: Bearer <token>` header from a signed-in admin. */
export const requireAdmin = (req, _res, next) => {
  const [scheme, token] = String(req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) return next(ApiError.unauthorized('Please sign in'));

  try {
    const payload = verifyToken(token);
    req.admin = { id: payload.sub, username: payload.username };
    next();
  } catch {
    next(ApiError.unauthorized('Your session has expired — please sign in again'));
  }
};
