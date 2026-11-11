import { join } from 'node:path';
import { env } from '../config/index.js';
import { getStorageMode } from '../config/db.js';
import MemoryRepository from './memory.repository.js';
import FileRepository from './file.repository.js';
import MongoRepository from './mongo.repository.js';
import PostgresRepository from './postgres.repository.js';
import { Project } from '../models/project.model.js';
import { Service } from '../models/service.model.js';
import { Testimonial } from '../models/testimonial.model.js';
import { Blog } from '../models/blog.model.js';
import { Contact } from '../models/contact.model.js';
import { Estimate } from '../models/estimate.model.js';
import * as seedData from '../seed/data.js';

const repos = {
  postgres: {
    project: new PostgresRepository('projects'),
    service: new PostgresRepository('services'),
    testimonial: new PostgresRepository('testimonials'),
    blog: new PostgresRepository('blogs'),
    contact: new PostgresRepository('contacts'),
    estimate: new PostgresRepository('estimates'),
  },
  mongodb: {
    project: new MongoRepository(Project),
    service: new MongoRepository(Service),
    testimonial: new MongoRepository(Testimonial),
    blog: new MongoRepository(Blog),
    contact: new MongoRepository(Contact),
    estimate: new MongoRepository(Estimate),
  },
  file: {
    project: new MemoryRepository(seedData.projects),
    service: new MemoryRepository(seedData.services),
    testimonial: new MemoryRepository(seedData.testimonials),
    blog: new MemoryRepository(seedData.blogs),
    // Leads must outlive restarts even without a database, so they go to disk.
    contact: new FileRepository(join(env.dataDir, 'contacts.json')),
    estimate: new FileRepository(join(env.dataDir, 'estimates.json')),
  },
};

/**
 * Returns the repository for a collection. Resolved per call so the app
 * uses whichever store connected at startup (see config/db.js).
 */
export const getRepository = (name) => {
  const repo = repos[getStorageMode()][name];
  if (!repo) throw new Error(`Unknown repository: ${name}`);
  return repo;
};
