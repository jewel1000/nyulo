import { getRepository } from '../repositories/index.js';
import ApiError from '../utils/ApiError.js';
import { buildPaginationMeta } from '../utils/pagination.js';

const repo = () => getRepository('testimonial');

export const listTestimonials = async ({ featured, page, limit, skip }) => {
  const filter = {};
  if (featured !== undefined) filter.featured = featured === 'true' || featured === true;

  const [items, total] = await Promise.all([
    repo().find({ filter, sort: '-createdAt', skip, limit }),
    repo().count(filter),
  ]);
  return { items, meta: buildPaginationMeta({ page, limit, total }) };
};

export const createTestimonial = async (data) => repo().create(data);

export const deleteTestimonial = async (id) => {
  const removed = await repo().deleteById(id);
  if (!removed) throw ApiError.notFound('Testimonial not found');
  return removed;
};
