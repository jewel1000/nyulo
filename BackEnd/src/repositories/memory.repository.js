import { randomUUID } from 'node:crypto';

/**
 * In-memory repository with the same interface as MongoRepository.
 * Used automatically when MongoDB is unreachable so the API (and the
 * frontend) keeps working with seeded demo data. Writes are volatile.
 */
export default class MemoryRepository {
  constructor(seedItems = []) {
    this.items = seedItems.map((item, index) => ({
      _id: `mem-${index + 1}`,
      createdAt: item.createdAt || new Date(Date.now() - index * 86400000),
      ...item,
    }));
  }

  #matches(item, filter = {}) {
    return Object.entries(filter).every(([key, expected]) => item[key] === expected);
  }

  #sort(items, sort) {
    if (!sort) return items;
    const desc = sort.startsWith('-');
    const field = desc ? sort.slice(1) : sort;
    return [...items].sort((a, b) => {
      const av = a[field] ?? 0;
      const bv = b[field] ?? 0;
      if (av < bv) return desc ? 1 : -1;
      if (av > bv) return desc ? -1 : 1;
      return 0;
    });
  }

  async find({ filter = {}, sort = '-createdAt', skip = 0, limit = 0 } = {}) {
    let result = this.#sort(this.items.filter((item) => this.#matches(item, filter)), sort);
    if (skip) result = result.slice(skip);
    if (limit) result = result.slice(0, limit);
    return result;
  }

  async findOne(filter = {}) {
    return this.items.find((item) => this.#matches(item, filter)) || null;
  }

  async findById(id) {
    return this.items.find((item) => item._id === id) || null;
  }

  async count(filter = {}) {
    return this.items.filter((item) => this.#matches(item, filter)).length;
  }

  async create(data) {
    const doc = { _id: randomUUID(), createdAt: new Date(), ...data };
    this.items.unshift(doc);
    return doc;
  }

  async updateById(id, data) {
    const index = this.items.findIndex((item) => item._id === id);
    if (index === -1) return null;
    this.items[index] = { ...this.items[index], ...data, updatedAt: new Date() };
    return this.items[index];
  }

  async deleteById(id) {
    const index = this.items.findIndex((item) => item._id === id);
    if (index === -1) return null;
    const [removed] = this.items.splice(index, 1);
    return removed;
  }
}
