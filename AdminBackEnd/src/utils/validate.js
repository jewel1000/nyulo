import ApiError from './ApiError.js';

/** Image and link fields must be web addresses, never `javascript:` or `data:` URLs. */
export const isSafeUrl = (value) => typeof value === 'string' && /^(https?:\/\/|\/)[^\s]*$/i.test(value);

/**
 * Validates `body` against a declarative schema and returns only the listed
 * fields (whitelisting).
 *
 * Rules: { required, type: 'string'|'number'|'email'|'boolean'|'array'|'url'|'urls',
 *          enum, min, max, minLength, maxLength }
 *
 * With `partial: true` (updates) missing fields are skipped and an optional
 * text field may be cleared by sending an empty string.
 */
export const validate = (schema, body = {}, { partial = false } = {}) => {
  const errors = [];
  const clean = {};

  for (const [field, rules] of Object.entries(schema)) {
    let value = body[field];
    if (typeof value === 'string') value = value.trim();

    const isMissing = value === undefined || value === null;
    const isEmpty = isMissing || value === '';

    if (isEmpty) {
      if (rules.required && (!partial || !isMissing)) errors.push(`'${field}' is required`);
      else if (partial && value === '') clean[field] = '';
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
          errors.push(`'${field}' must be a list`);
          continue;
        }
        value = value.map((item) => String(item).trim()).filter(Boolean);
        break;
      }
      case 'url': {
        if (!isSafeUrl(value)) {
          errors.push(`'${field}' must be an image or page address starting with http(s):// or /`);
          continue;
        }
        break;
      }
      case 'urls': {
        if (!Array.isArray(value) || !value.every(isSafeUrl)) {
          errors.push(`'${field}' must be a list of image addresses`);
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

    clean[field] = value;
  }

  if (errors.length) throw ApiError.unprocessable('Please fix the highlighted fields', errors);
  return clean;
};
