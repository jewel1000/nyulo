/**
 * Standalone seeding script: `npm run seed`
 * Drops existing content collections and inserts fresh demo data.
 */
import mongoose from 'mongoose';
import { env } from '../config/index.js';
import logger from '../utils/logger.js';
import { Project } from '../models/project.model.js';
import { Service } from '../models/service.model.js';
import { Testimonial } from '../models/testimonial.model.js';
import { Blog } from '../models/blog.model.js';
import * as data from './data.js';

const run = async () => {
  await mongoose.connect(env.mongoUri);
  logger.info(`Connected to ${env.mongoUri}`);

  await Promise.all([
    Project.deleteMany({}),
    Service.deleteMany({}),
    Testimonial.deleteMany({}),
    Blog.deleteMany({}),
  ]);

  const [projects, services, testimonials, blogs] = await Promise.all([
    Project.insertMany(data.projects),
    Service.insertMany(data.services),
    Testimonial.insertMany(data.testimonials),
    Blog.insertMany(data.blogs),
  ]);

  logger.info(
    `Seeded: ${projects.length} projects, ${services.length} services, ` +
      `${testimonials.length} testimonials, ${blogs.length} blog posts.`
  );
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((error) => {
  logger.error('Seeding failed:', error);
  process.exit(1);
});
