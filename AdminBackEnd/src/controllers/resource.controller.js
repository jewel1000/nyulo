import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as resourceService from '../services/resource.service.js';

export const list = asyncHandler(async (req, res) => {
  const items = await resourceService.list(req.params.resource);
  ApiResponse.send(res, 200, items, 'Fetched', { total: items.length });
});

export const get = asyncHandler(async (req, res) => {
  ApiResponse.send(res, 200, await resourceService.get(req.params.resource, req.params.id), 'Fetched');
});

export const create = asyncHandler(async (req, res) => {
  ApiResponse.send(res, 201, await resourceService.create(req.params.resource, req.body), 'Created');
});

export const update = asyncHandler(async (req, res) => {
  const record = await resourceService.update(req.params.resource, req.params.id, req.body);
  ApiResponse.send(res, 200, record, 'Saved');
});

export const remove = asyncHandler(async (req, res) => {
  await resourceService.remove(req.params.resource, req.params.id);
  ApiResponse.send(res, 200, null, 'Deleted');
});
