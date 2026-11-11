import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import MemoryRepository from './memory.repository.js';
import logger from '../utils/logger.js';

const load = (filePath) => {
  if (!existsSync(filePath)) return [];
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
 * MemoryRepository that persists every write to a JSON file, so records
 * survive restarts when MongoDB is not configured. Suited to low-volume
 * data such as contact and estimate leads.
 */
export default class FileRepository extends MemoryRepository {
  constructor(filePath) {
    super(load(filePath));
    this.filePath = filePath;
    mkdirSync(dirname(filePath), { recursive: true });
  }

  #persist() {
    // Write-then-rename keeps the file intact if the process dies mid-write.
    const tmp = `${this.filePath}.tmp`;
    writeFileSync(tmp, JSON.stringify(this.items, null, 2));
    renameSync(tmp, this.filePath);
  }

  async create(data) {
    const doc = await super.create(data);
    this.#persist();
    return doc;
  }

  async updateById(id, data) {
    const doc = await super.updateById(id, data);
    if (doc) this.#persist();
    return doc;
  }

  async deleteById(id) {
    const doc = await super.deleteById(id);
    if (doc) this.#persist();
    return doc;
  }
}
