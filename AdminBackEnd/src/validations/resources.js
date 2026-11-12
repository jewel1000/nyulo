/**
 * Registry of the content collections the admin panel manages.
 * Each entry names the repository, the validation schema, the default sort
 * and (optionally) the field a URL slug is generated from.
 */
const PROJECT_CATEGORIES = [
  'Residential',
  'Penthouse & Duplex',
  'Kitchen & Wardrobe',
  'Workspace',
  'Hospitality & Retail',
];

const LEAD_STATUSES = ['new', 'contacted', 'closed'];

const projectSchema = {
  title: { required: true, type: 'string', minLength: 3, maxLength: 160 },
  category: { required: true, type: 'string', enum: PROJECT_CATEGORIES },
  location: { required: true, type: 'string', maxLength: 160 },
  areaSqft: { required: true, type: 'number', min: 1 },
  year: { required: true, type: 'number', min: 2000, max: 2100 },
  client: { type: 'string', maxLength: 160 },
  description: { required: true, type: 'string', minLength: 10, maxLength: 6000 },
  scope: { type: 'array' },
  coverImage: { required: true, type: 'url' },
  images: { type: 'urls' },
  featured: { type: 'boolean' },
};

const serviceSchema = {
  title: { required: true, type: 'string', minLength: 3, maxLength: 120 },
  shortDescription: { required: true, type: 'string', maxLength: 300 },
  description: { required: true, type: 'string', minLength: 10, maxLength: 6000 },
  icon: { type: 'string', maxLength: 40 },
  features: { type: 'array' },
  image: { required: true, type: 'url' },
  order: { type: 'number', min: 0 },
};

const testimonialSchema = {
  name: { required: true, type: 'string', minLength: 2, maxLength: 120 },
  location: { type: 'string', maxLength: 120 },
  projectType: { type: 'string', maxLength: 120 },
  avatar: { type: 'url' },
  rating: { required: true, type: 'number', min: 1, max: 5 },
  message: { required: true, type: 'string', minLength: 10, maxLength: 1200 },
  featured: { type: 'boolean' },
};

const blogSchema = {
  title: { required: true, type: 'string', minLength: 3, maxLength: 200 },
  excerpt: { required: true, type: 'string', maxLength: 400 },
  content: { required: true, type: 'string', minLength: 50, maxLength: 40000 },
  coverImage: { required: true, type: 'url' },
  tags: { type: 'array' },
  author: { type: 'string', maxLength: 120 },
  readTimeMinutes: { type: 'number', min: 1, max: 120 },
  publishedAt: { type: 'string', maxLength: 40 },
};

/** Leads come in through the public site; admins only track their status. */
const leadSchema = {
  status: { type: 'string', enum: LEAD_STATUSES },
  notes: { type: 'string', maxLength: 2000 },
};

export const RESOURCES = {
  projects: { repo: 'project', schema: projectSchema, sort: '-year', slugFrom: 'title' },
  services: { repo: 'service', schema: serviceSchema, sort: 'order', slugFrom: 'title' },
  testimonials: { repo: 'testimonial', schema: testimonialSchema, sort: '-createdAt' },
  blogs: { repo: 'blog', schema: blogSchema, sort: '-publishedAt', slugFrom: 'title' },
  contacts: { repo: 'contact', schema: leadSchema, sort: '-createdAt', readOnlyFields: true },
  estimates: { repo: 'estimate', schema: leadSchema, sort: '-createdAt', readOnlyFields: true },
};

export const META = { projectCategories: PROJECT_CATEGORIES, leadStatuses: LEAD_STATUSES };
