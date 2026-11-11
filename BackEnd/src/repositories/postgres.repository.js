import { randomUUID } from 'node:crypto';
import { getPool } from '../config/postgres.js';

const SAFE_FIELD = /^[A-Za-z_][A-Za-z0-9_]*$/;

const toDoc = (row) => ({ _id: row.id, ...row.data });

/**
 * PostgreSQL adapter exposing the shared repository interface over a
 * table of JSONB documents (see config/postgres.js).
 */
export default class PostgresRepository {
  constructor(table) {
    this.table = table;
  }

  /**
   * Equality filter on top-level fields. `data->key @> value` also matches
   * when the stored field is an array containing the value (e.g. blog tags).
   */
  #where(filter = {}) {
    const clauses = [];
    const values = [];
    for (const [key, value] of Object.entries(filter)) {
      if (!SAFE_FIELD.test(key)) throw new Error(`Invalid filter field: ${key}`);
      values.push(JSON.stringify(value));
      // `key` is safe to inline: it passed SAFE_FIELD above.
      clauses.push(`data->'${key}' @> $${values.length}::jsonb`);
    }
    return { sql: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', values };
  }

  #orderBy(sort) {
    if (!sort) return '';
    const desc = sort.startsWith('-');
    const field = desc ? sort.slice(1) : sort;
    if (!SAFE_FIELD.test(field)) throw new Error(`Invalid sort field: ${field}`);
    return `ORDER BY data->'${field}' ${desc ? 'DESC' : 'ASC'} NULLS LAST, created_at DESC`;
  }

  async find({ filter = {}, sort = '-createdAt', skip = 0, limit = 0 } = {}) {
    const { sql, values } = this.#where(filter);
    let query = `SELECT id, data FROM ${this.table} ${sql} ${this.#orderBy(sort)}`;
    if (limit) {
      values.push(limit);
      query += ' LIMIT $' + values.length;
    }
    if (skip) {
      values.push(skip);
      query += ' OFFSET $' + values.length;
    }
    const { rows } = await getPool().query(query, values);
    return rows.map(toDoc);
  }

  async findOne(filter = {}) {
    const [doc] = await this.find({ filter, sort: null, limit: 1 });
    return doc || null;
  }

  async findById(id) {
    const { rows } = await getPool().query(`SELECT id, data FROM ${this.table} WHERE id = $1`, [id]);
    return rows[0] ? toDoc(rows[0]) : null;
  }

  async count(filter = {}) {
    const { sql, values } = this.#where(filter);
    const { rows } = await getPool().query(`SELECT count(*)::int AS n FROM ${this.table} ${sql}`, values);
    return rows[0].n;
  }

  async create(data) {
    const id = randomUUID();
    const doc = JSON.parse(JSON.stringify({ createdAt: new Date().toISOString(), ...data }));
    await getPool().query(`INSERT INTO ${this.table} (id, data) VALUES ($1, $2::jsonb)`, [id, JSON.stringify(doc)]);
    return { _id: id, ...doc };
  }

  async updateById(id, data) {
    const patch = { ...data, updatedAt: new Date().toISOString() };
    const { rows } = await getPool().query(
      `UPDATE ${this.table} SET data = data || $2::jsonb WHERE id = $1 RETURNING id, data`,
      [id, JSON.stringify(patch)]
    );
    return rows[0] ? toDoc(rows[0]) : null;
  }

  async deleteById(id) {
    const { rows } = await getPool().query(`DELETE FROM ${this.table} WHERE id = $1 RETURNING id, data`, [id]);
    return rows[0] ? toDoc(rows[0]) : null;
  }
}
