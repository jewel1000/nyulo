import {
  PROJECT_CATEGORIES,
  SERVICE_INTERESTS,
  ESTIMATE_AREA_LIMITS,
} from '../constants/index.js';

export const contactSchema = {
  name: { required: true, type: 'string', minLength: 2, maxLength: 120 },
  email: { required: true, type: 'email' },
  phone: { required: true, type: 'string', minLength: 6, maxLength: 20 },
  serviceInterest: { type: 'string', enum: SERVICE_INTERESTS },
  subject: { type: 'string', maxLength: 200 },
  message: { required: true, type: 'string', minLength: 10, maxLength: 3000 },
};

export const estimateCalcSchema = {
  spaceType: { required: true, type: 'string' },
  packageKey: { required: true, type: 'string' },
  areaSqft: {
    required: true,
    type: 'number',
    min: ESTIMATE_AREA_LIMITS.min,
    max: ESTIMATE_AREA_LIMITS.max,
  },
};

export const estimateLeadSchema = {
  ...estimateCalcSchema,
  name: { required: true, type: 'string', minLength: 2, maxLength: 120 },
  phone: { required: true, type: 'string', minLength: 6, maxLength: 20 },
  email: { type: 'email' },
};

export const projectSchema = {
  title: { required: true, type: 'string', minLength: 3, maxLength: 160 },
  category: { required: true, type: 'string', enum: PROJECT_CATEGORIES },
  location: { required: true, type: 'string', maxLength: 160 },
  areaSqft: { required: true, type: 'number', min: 1 },
  year: { required: true, type: 'number', min: 2000, max: 2100 },
  client: { type: 'string', maxLength: 160 },
  description: { required: true, type: 'string', minLength: 10 },
  scope: { type: 'array' },
  coverImage: { required: true, type: 'string' },
  images: { type: 'array' },
  featured: { type: 'boolean' },
};

export const serviceSchema = {
  title: { required: true, type: 'string', minLength: 3, maxLength: 120 },
  shortDescription: { required: true, type: 'string', maxLength: 300 },
  description: { required: true, type: 'string', minLength: 10 },
  icon: { type: 'string', maxLength: 40 },
  features: { type: 'array' },
  image: { required: true, type: 'string' },
  order: { type: 'number' },
};

export const testimonialSchema = {
  name: { required: true, type: 'string', minLength: 2, maxLength: 120 },
  location: { type: 'string', maxLength: 120 },
  projectType: { type: 'string', maxLength: 120 },
  avatar: { type: 'string' },
  rating: { required: true, type: 'number', min: 1, max: 5 },
  message: { required: true, type: 'string', minLength: 10, maxLength: 1200 },
  featured: { type: 'boolean' },
};

export const blogSchema = {
  title: { required: true, type: 'string', minLength: 3, maxLength: 200 },
  excerpt: { required: true, type: 'string', maxLength: 400 },
  content: { required: true, type: 'string', minLength: 50 },
  coverImage: { required: true, type: 'string' },
  tags: { type: 'array' },
  author: { type: 'string', maxLength: 120 },
  readTimeMinutes: { type: 'number', min: 1, max: 120 },
};
