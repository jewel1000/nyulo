import mongoose from 'mongoose';
import { env } from './index.js';
import { connectPostgres, isPostgresReady } from './postgres.js';
import logger from '../utils/logger.js';

/**
 * Storage is chosen at startup, in this order:
 *   1. PostgreSQL  — when DATABASE_URL is set (production on cPanel)
 *   2. MongoDB     — when MONGODB_URI is reachable
 *   3. Files       — content from seed data, leads saved to JSON on disk
 *
 * The application never crashes because a database is unreachable; the
 * repository layer falls through to the next option.
 */
export const connectDatabase = async () => {
  if (await connectPostgres()) {
    await seedPostgresIfEmpty();
    return;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 4000 });
    logger.info(`MongoDB connected: ${mongoose.connection.host}`);
    await seedMongoIfEmpty();
  } catch (error) {
    logger.warn(
      `No database connected (${error.message}). Serving content from seed data; leads are saved to JSON files on disk.`
    );
  }
};

export const isDatabaseConnected = () => mongoose.connection.readyState === 1;

/** Which backing store the repositories are using right now. */
export const getStorageMode = () => {
  if (isPostgresReady()) return 'postgres';
  if (isDatabaseConnected()) return 'mongodb';
  return 'file';
};

const seedPostgresIfEmpty = async () => {
  const [{ getRepository }, seedData] = await Promise.all([
    import('../repositories/index.js'),
    import('../seed/data.js'),
  ]);

  if ((await getRepository('project').count()) > 0) return;

  const collections = {
    project: seedData.projects,
    service: seedData.services,
    testimonial: seedData.testimonials,
    blog: seedData.blogs,
  };
  for (const [name, items] of Object.entries(collections)) {
    for (const item of items) await getRepository(name).create(item);
  }
  logger.info('PostgreSQL was empty — seed data inserted automatically.');
};

const seedMongoIfEmpty = async () => {
  const [{ Project }, { Service }, { Testimonial }, { Blog }, seedData] = await Promise.all([
    import('../models/project.model.js'),
    import('../models/service.model.js'),
    import('../models/testimonial.model.js'),
    import('../models/blog.model.js'),
    import('../seed/data.js'),
  ]);

  const count = await Project.estimatedDocumentCount();
  if (count > 0) return;

  await Promise.all([
    Project.insertMany(seedData.projects),
    Service.insertMany(seedData.services),
    Testimonial.insertMany(seedData.testimonials),
    Blog.insertMany(seedData.blogs),
  ]);
  logger.info('MongoDB was empty — seed data inserted automatically.');
};
