import ApiError from '../utils/ApiError.js';

/**
 * Declarative request-body validator.
 *
 * A schema maps field names to rules:
 *   { required, type: 'string'|'number'|'email'|'boolean'|'array',
 *     enum, min, max, minLength, maxLength }
 *
 * On success req.body is replaced with ONLY the validated fields
 * (whitelisting), so unexpected fields never reach the database.
 */
export const validateBody = (schema) => (req, _res, next) => {
  const errors = [];
  const sanitized = {};
  const body = req.body ?? {};

  for (const [field, rules] of Object.entries(schema)) {
    let value = body[field];
    if (typeof value === 'string') value = value.trim();

    const isEmpty = value === undefined || value === null || value === '';
    if (isEmpty) {
      if (rules.required) errors.push(`'${field}' is required`);
      continue;
    }

    switch (rules.type) {
      case 'number': {
        value = Number(value);
        if (Number.isNaN(value)) {
          errors.push(`'${field}' must be a number`);
          continue;
        }
        if (rules.min !== undefined && value < rules.min) errors.push(`'${field}' must be at least ${rules.min}`);
        if (rules.max !== undefined && value > rules.max) errors.push(`'${field}' must be at most ${rules.max}`);
        break;
      }
      case 'email': {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.push(`'${field}' must be a valid email`);
        break;
      }
      case 'boolean': {
        if (typeof value !== 'boolean') value = value === 'true';
        break;
      }
      case 'array': {
        if (!Array.isArray(value)) {
          errors.push(`'${field}' must be an array`);
          continue;
        }
        break;
      }
      default: {
        value = String(value);
        if (rules.minLength !== undefined && value.length < rules.minLength)
          errors.push(`'${field}' must be at least ${rules.minLength} characters`);
        if (rules.maxLength !== undefined && value.length > rules.maxLength)
          errors.push(`'${field}' must be at most ${rules.maxLength} characters`);
      }
    }

    if (rules.enum && !rules.enum.includes(value)) {
      errors.push(`'${field}' must be one of: ${rules.enum.join(', ')}`);
      continue;
    }

    sanitized[field] = value;
  }

  if (errors.length) return next(ApiError.unprocessable('Validation failed', errors));
  req.body = sanitized;
  next();
};
