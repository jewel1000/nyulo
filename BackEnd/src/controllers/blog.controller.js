import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { parsePagination } from '../utils/pagination.js';
import * as blogService from '../services/blog.service.js';

export const getBlogs = asyncHandler(async (req, res) => {
  const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 9 });
  const { items, meta } = await blogService.listBlogs({ tag: req.query.tag, page, limit, skip });
  ApiResponse.send(res, 200, items, 'Blog posts fetched', meta);
});

export const getBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.getBlogBySlug(req.params.slug);
  ApiResponse.send(res, 200, blog, 'Blog post fetched');
});

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.createBlog(req.body);
  ApiResponse.send(res, 201, blog, 'Blog post created');
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.updateBlog(req.params.id, req.body);
  ApiResponse.send(res, 200, blog, 'Blog post updated');
});

export const deleteBlog = asyncHandler(async (req, res) => {
  await blogService.deleteBlog(req.params.id);
  ApiResponse.send(res, 200, null, 'Blog post deleted');
});
