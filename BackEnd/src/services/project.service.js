import { getRepository } from '../repositories/index.js';
import ApiError from '../utils/ApiError.js';
import slugify from '../utils/slugify.js';
import { buildPaginationMeta } from '../utils/pagination.js';

const repo = () => getRepository('project');

export const listProjects = async ({ category, featured, page, limit, skip }) => {
  const filter = {};
  if (category) filter.category = category;
  if (featured !== undefined) filter.featured = featured === 'true' || featured === true;

  const [items, total] = await Promise.all([
    repo().find({ filter, sort: '-year', skip, limit }),
    repo().count(filter),
  ]);
  return { items, meta: buildPaginationMeta({ page, limit, total }) };
};

export const getProjectBySlug = async (slug) => {
  const project = await repo().findOne({ slug });
  if (!project) throw ApiError.notFound('Project not found');
  return project;
};

export const createProject = async (data) => repo().create({ ...data, slug: slugify(data.title) });

export const updateProject = async (id, data) => {
  const payload = data.title ? { ...data, slug: slugify(data.title) } : data;
  const updated = await repo().updateById(id, payload);
  if (!updated) throw ApiError.notFound('Project not found');
  return updated;
};

export const deleteProject = async (id) => {
  const removed = await repo().deleteById(id);
  if (!removed) throw ApiError.notFound('Project not found');
  return removed;
};
