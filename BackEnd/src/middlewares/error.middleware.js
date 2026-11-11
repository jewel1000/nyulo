import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';
import { isProduction } from '../config/index.js';

export const notFoundHandler = (req, _res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  let error = err;

  // Normalize common Mongoose errors into operational ApiErrors.
  if (err.name === 'ValidationError') {
    error = ApiError.unprocessable('Validation failed', Object.values(err.errors).map((e) => e.message));
  } else if (err.name === 'CastError') {
    error = ApiError.badRequest(`Invalid value for '${err.path}'`);
  } else if (err.code === 11000) {
    error = ApiError.badRequest('Duplicate value for a unique field');
  }

  const statusCode = error.statusCode || 500;
  if (statusCode >= 500) logger.error(err);

  res.status(statusCode).json({
    success: false,
    message: error.isOperational ? error.message : 'Internal server error',
    errors: error.errors || [],
    ...(isProduction ? {} : { stack: err.stack }),
  });
};
