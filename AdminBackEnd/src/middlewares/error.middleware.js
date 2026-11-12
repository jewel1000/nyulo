import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';
import { isProduction } from '../config/index.js';

export const notFoundHandler = (req, _res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  let error = err;

  if (err.name === 'MulterError') {
    error = ApiError.badRequest(
      err.code === 'LIMIT_FILE_SIZE' ? 'That image is too large (maximum 8 MB)' : `Upload failed: ${err.message}`
    );
  } else if (err.type === 'entity.too.large') {
    error = ApiError.badRequest('Request is too large');
  }

  const statusCode = error.statusCode || 500;
  if (statusCode >= 500) logger.error(err);

  res.status(statusCode).json({
    success: false,
    message: error.isOperational ? error.message : 'Internal server error',
    errors: error.errors || [],
    ...(isProduction || error.isOperational ? {} : { stack: err.stack }),
  });
};
