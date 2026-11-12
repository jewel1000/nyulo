import { join } from 'node:path';
import { env } from '../config/index.js';
import { getStorageMode } from '../config/db.js';
import FileRepository from './file.repository.js';
import MongoRepository from './mongo.repository.js';
import PostgresRepository from './postgres.repository.js';
import { Project } from '../models/project.model.js';
import { Service } from '../models/service.model.js';
import { Testimonial } from '../models/testimonial.model.js';
import { Blog } from '../models/blog.model.js';
import { Contact } from '../models/contact.model.js';
import { Estimate } from '../models/estimate.model.js';
import { Setting } from '../models/setting.model.js';
import * as seedData from '../seed/data.js';

const file = (name, seed = []) => new FileRepository(join(env.dataDir, `${name}.json`), seed);

const builders = {
  postgres: () => ({
    project: new PostgresRepository('projects'),
    service: new PostgresRepository('services'),
    testimonial: new PostgresRepository('testimonials'),
    blog: new PostgresRepository('blogs'),
    contact: new PostgresRepository('contacts'),
    estimate: new PostgresRepository('estimates'),
    setting: new PostgresRepository('settings'),
  }),
  mongodb: () => ({
    project: new MongoRepository(Project),
    service: new MongoRepository(Service),
    testimonial: new MongoRepository(Testimonial),
    blog: new MongoRepository(Blog),
    contact: new MongoRepository(Contact),
    estimate: new MongoRepository(Estimate),
    setting: new MongoRepository(Setting),
  }),
  // No database: JSON files in the data directory, seeded on first run.
  file: () => ({
    project: file('projects', seedData.projects),
    service: file('services', seedData.services),
    testimonial: file('testimonials', seedData.testimonials),
    blog: file('blogs', seedData.blogs),
    contact: file('contacts'),
    estimate: file('estimates'),
    setting: file('settings'),
  }),
};

const cache = {};

/**
 * Returns the repository for a collection, using whichever store connected
 * at startup (see config/db.js). Built lazily so the file store only touches
 * the disk when it is actually the one in use.
 */
export const getRepository = (name) => {
  const mode = getStorageMode();
  cache[mode] ??= builders[mode]();
  const repo = cache[mode][name];
  if (!repo) throw new Error(`Unknown repository: ${name}`);
  return repo;
};
