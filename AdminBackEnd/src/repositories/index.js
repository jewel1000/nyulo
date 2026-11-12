import { join } from 'node:path';
import { env } from '../config/index.js';
import { getStorageMode } from '../config/postgres.js';
import FileRepository from './file.repository.js';
import PostgresRepository from './postgres.repository.js';

/** Repository name → table / file name. */
const COLLECTIONS = {
  project: 'projects',
  service: 'services',
  testimonial: 'testimonials',
  blog: 'blogs',
  contact: 'contacts',
  estimate: 'estimates',
  setting: 'settings',
  admin: 'admins',
};

const cache = { postgres: {}, file: {} };

const build = (mode, name) => {
  const collection = COLLECTIONS[name];
  if (mode === 'postgres') return new PostgresRepository(collection);
  // Admin accounts stay in this app's private folder; content is shared with the public API.
  const dir = name === 'admin' ? env.privateDir : env.dataDir;
  return new FileRepository(join(dir, `${collection}.json`));
};

export const getRepository = (name) => {
  if (!COLLECTIONS[name]) throw new Error(`Unknown repository: ${name}`);
  const mode = getStorageMode();
  cache[mode][name] ??= build(mode, name);
  return cache[mode][name];
};
