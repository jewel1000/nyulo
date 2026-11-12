import { getRepository } from '../repositories/index.js';
import { RESOURCES } from '../validations/resources.js';
import { validate } from '../utils/validate.js';
import ApiError from '../utils/ApiError.js';
import slugify from '../utils/slugify.js';

const resolve = (name) => {
  const resource = RESOURCES[name];
  if (!resource) throw ApiError.notFound(`Unknown collection '${name}'`);
  return { ...resource, store: getRepository(resource.repo) };
};

/** Slugs appear in public URLs, so two records must never share one. */
const uniqueSlug = async (store, text, ownId) => {
  const base = slugify(text) || 'item';
  let slug = base;
  for (let n = 2; ; n += 1) {
    const clash = await store.findOne({ slug });
    if (!clash || clash._id === ownId) return slug;
    slug = `${base}-${n}`;
  }
};

export const list = async (name) => {
  const { store, sort } = resolve(name);
  return store.find({ sort });
};

export const get = async (name, id) => {
  const record = await resolve(name).store.findById(id);
  if (!record) throw ApiError.notFound('Record not found');
  return record;
};

export const create = async (name, body) => {
  const { store, schema, slugFrom, readOnlyFields } = resolve(name);
  if (readOnlyFields) throw ApiError.badRequest('Leads are created from the public site only');

  const data = validate(schema, body);
  if (slugFrom) data.slug = await uniqueSlug(store, data[slugFrom]);
  if (name === 'blogs') data.publishedAt = normaliseDate(data.publishedAt) || new Date().toISOString();
  return store.create(data);
};

export const update = async (name, id, body) => {
  const { store, schema, slugFrom } = resolve(name);
  const data = validate(schema, body, { partial: true });
  if (Object.keys(data).length === 0) throw ApiError.badRequest('Nothing to update');

  if (slugFrom && data[slugFrom]) data.slug = await uniqueSlug(store, data[slugFrom], id);
  if (name === 'blogs' && data.publishedAt !== undefined) {
    data.publishedAt = normaliseDate(data.publishedAt) || new Date().toISOString();
  }

  const record = await store.updateById(id, data);
  if (!record) throw ApiError.notFound('Record not found');
  return record;
};

export const remove = async (name, id) => {
  const record = await resolve(name).store.deleteById(id);
  if (!record) throw ApiError.notFound('Record not found');
  return record;
};

const normaliseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw ApiError.unprocessable('Please fix the highlighted fields', ["'publishedAt' must be a valid date"]);
  return date.toISOString();
};
