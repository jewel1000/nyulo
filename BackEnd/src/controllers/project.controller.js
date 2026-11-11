import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { parsePagination } from '../utils/pagination.js';
import * as projectService from '../services/project.service.js';

export const getProjects = asyncHandler(async (req, res) => {
  const { page, limit, skip } = parsePagination(req.query);
  const { category, featured } = req.query;
  const { items, meta } = await projectService.listProjects({ category, featured, page, limit, skip });
  ApiResponse.send(res, 200, items, 'Projects fetched', meta);
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectBySlug(req.params.slug);
  ApiResponse.send(res, 200, project, 'Project fetched');
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body);
  ApiResponse.send(res, 201, project, 'Project created');
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  ApiResponse.send(res, 200, project, 'Project updated');
});

export const deleteProject = asyncHandler(async (req, res) => {
  await projectService.deleteProject(req.params.id);
  ApiResponse.send(res, 200, null, 'Project deleted');
});
