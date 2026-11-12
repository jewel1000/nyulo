import pg from 'pg';
import { env } from './index.js';
import logger from '../utils/logger.js';

/** Collections stored in PostgreSQL, one table each. */
export const PG_TABLES = ['projects', 'services', 'testimonials', 'blogs', 'contacts', 'estimates', 'settings'];

let pool = null;
let ready = false;

export const getPool = () => pool;
export const isPostgresReady = () => ready;

/**
 * Each collection is a table of JSONB documents:
 *   id text primary key, data jsonb, created_at timestamptz
 * This keeps the document-shaped records (arrays, nested fields) intact and
 * lets one generic repository serve every collection.
 */
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

export const connectPostgres = async () => {
  if (!env.databaseUrl) return false;
  try {
    pool = new pg.Pool({ connectionString: env.databaseUrl, max: 5, connectionTimeoutMillis: 5000 });
    pool.on('error', (error) => logger.error('PostgreSQL pool error:', error.message));
    await pool.query('SELECT 1');
    await createSchema();
    ready = true;
    logger.info('PostgreSQL connected');
    return true;
  } catch (error) {
    logger.error(`PostgreSQL unavailable (${error.message}).`);
    pool = null;
    ready = false;
    return false;
  }
};
