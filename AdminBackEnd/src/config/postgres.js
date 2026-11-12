import pg from 'pg';
import { env } from './index.js';
import logger from '../utils/logger.js';

/** Same JSONB-document tables as the public API, plus the admin accounts. */
export const PG_TABLES = [
  'projects',
  'services',
  'testimonials',
  'blogs',
  'contacts',
  'estimates',
  'settings',
  'admins',
];

let pool = null;
let ready = false;

export const getPool = () => pool;
export const isPostgresReady = () => ready;

const createSchema = async () => {
  for (const table of PG_TABLES) {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS ${table} (
         id         text PRIMARY KEY,
         data       jsonb NOT NULL,
         created_at timestamptz NOT NULL DEFAULT now()
       )`
    );
    await pool.query(`CREATE INDEX IF NOT EXISTS ${table}_data_idx ON ${table} USING gin (data)`);
  }
};

export const connectDatabase = async () => {
  if (!env.databaseUrl) {
    logger.warn(`DATABASE_URL not set — using JSON files in ${env.dataDir}`);
    return;
  }
  try {
    pool = new pg.Pool({ connectionString: env.databaseUrl, max: 5, connectionTimeoutMillis: 5000 });
    pool.on('error', (error) => logger.error('PostgreSQL pool error:', error.message));
    await pool.query('SELECT 1');
    await createSchema();
    ready = true;
    logger.info('PostgreSQL connected');
  } catch (error) {
    logger.error(`PostgreSQL unavailable (${error.message}) — falling back to JSON files.`);
    pool = null;
    ready = false;
  }
};

export const getStorageMode = () => (ready ? 'postgres' : 'file');
