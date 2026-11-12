/**
 * Wraps an async route handler and forwards rejections to the global
 * error middleware, removing try/catch noise from controllers.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
