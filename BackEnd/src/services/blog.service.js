import { getRepository } from '../repositories/index.js';
import ApiError from '../utils/ApiError.js';
import slugify from '../utils/slugify.js';
import { buildPaginationMeta } from '../utils/pagination.js';

const repo = () => getRepository('blog');

export const listBlogs = async ({ tag, page, limit, skip }) => {
  const filter = {};
  if (tag) filter.tags = tag; // Mongo matches array membership; memory repo matches equality.

  const [items, total] = await Promise.all([
    repo().find({ filter, sort: '-publishedAt', skip, limit }),
    repo().count(filter),
  ]);
  return { items, meta: buildPaginationMeta({ page, limit, total }) };
};

export const getBlogBySlug = async (slug) => {
  const blog = await repo().findOne({ slug });
  if (!blog) throw ApiError.notFound('Blog post not found');
  return blog;
};

export const createBlog = async (data) => repo().create({ ...data, slug: slugify(data.title) });

export const updateBlog = async (id, data) => {
  const payload = data.title ? { ...data, slug: slugify(data.title) } : data;
  const updated = await repo().updateById(id, payload);
  if (!updated) throw ApiError.notFound('Blog post not found');
  return updated;
};

export const deleteBlog = async (id) => {
  const removed = await repo().deleteById(id);
  if (!removed) throw ApiError.notFound('Blog post not found');
  return removed;
};
