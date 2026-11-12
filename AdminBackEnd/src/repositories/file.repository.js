import { existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import MemoryRepository from './memory.repository.js';
import logger from '../utils/logger.js';

const load = (filePath) => {
  try {
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch (error) {
    // Never start from an empty list over a file we could not parse:
    // keep the damaged file aside so nothing is silently overwritten.
    const aside = `${filePath}.corrupt-${Date.now()}`;
    renameSync(filePath, aside);
    logger.error(`Could not parse ${filePath} (${error.message}); moved to ${aside}`);
    return [];
  }
};

/**
 * MemoryRepository backed by a JSON file. Used when no database is
 * configured: records survive restarts, and because the file is re-read
 * whenever it changes on disk, the public API and the admin API can share
 * the same data directory during local development.
 */
export default class FileRepository extends MemoryRepository {
  #mtimeMs = 0;

  constructor(filePath, seedItems = []) {
    mkdirSync(dirname(filePath), { recursive: true });
    const existing = existsSync(filePath) ? load(filePath) : null;
    super(existing ?? seedItems);
    this.filePath = filePath;
    if (existing === null && seedItems.length) this.#persist();
    else this.#rememberMtime();
  }

  #rememberMtime() {
    try {
      this.#mtimeMs = statSync(this.filePath).mtimeMs;
    } catch {
      this.#mtimeMs = 0;
    }
  }

  /** Reload if another process has written the file since we last looked. */
  #sync() {
    let mtimeMs;
    try {
      mtimeMs = statSync(this.filePath).mtimeMs;
    } catch {
      return;
    }
    if (mtimeMs !== this.#mtimeMs) {
      this.items = load(this.filePath);
      this.#mtimeMs = mtimeMs;
    }
  }

  #persist() {
    // Write-then-rename keeps the file intact if the process dies mid-write.
    const tmp = `${this.filePath}.${process.pid}.tmp`;
    writeFileSync(tmp, JSON.stringify(this.items, null, 2));
    renameSync(tmp, this.filePath);
    this.#rememberMtime();
  }

  async find(options) {
    this.#sync();
    return super.find(options);
  }

  async findOne(filter) {
    this.#sync();
    return super.findOne(filter);
  }

  async findById(id) {
    this.#sync();
    return super.findById(id);
  }

  async count(filter) {
    this.#sync();
    return super.count(filter);
  }

  async create(data) {
    this.#sync();
    const doc = await super.create(data);
    this.#persist();
    return doc;
  }

  async updateById(id, data) {
    this.#sync();
    const doc = await super.updateById(id, data);
    if (doc) this.#persist();
    return doc;
  }

  async deleteById(id) {
    this.#sync();
    const doc = await super.deleteById(id);
    if (doc) this.#persist();
    return doc;
  }
}
