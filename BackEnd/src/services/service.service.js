import { getRepository } from '../repositories/index.js';
import ApiError from '../utils/ApiError.js';
import slugify from '../utils/slugify.js';

const repo = () => getRepository('service');

export const listServices = async () => repo().find({ sort: 'order' });

export const getServiceBySlug = async (slug) => {
  const service = await repo().findOne({ slug });
  if (!service) throw ApiError.notFound('Service not found');
  return service;
};

export const createService = async (data) => repo().create({ ...data, slug: slugify(data.title) });

export const updateService = async (id, data) => {
  const payload = data.title ? { ...data, slug: slugify(data.title) } : data;
  const updated = await repo().updateById(id, payload);
  if (!updated) throw ApiError.notFound('Service not found');
  return updated;
};

export const deleteService = async (id) => {
  const removed = await repo().deleteById(id);
  if (!removed) throw ApiError.notFound('Service not found');
  return removed;
};
