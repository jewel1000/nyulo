import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as serviceService from '../services/service.service.js';

export const getServices = asyncHandler(async (_req, res) => {
  const services = await serviceService.listServices();
  ApiResponse.send(res, 200, services, 'Services fetched');
});

export const getService = asyncHandler(async (req, res) => {
  const service = await serviceService.getServiceBySlug(req.params.slug);
  ApiResponse.send(res, 200, service, 'Service fetched');
});

export const createService = asyncHandler(async (req, res) => {
  const service = await serviceService.createService(req.body);
  ApiResponse.send(res, 201, service, 'Service created');
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await serviceService.updateService(req.params.id, req.body);
  ApiResponse.send(res, 200, service, 'Service updated');
});

export const deleteService = asyncHandler(async (req, res) => {
  await serviceService.deleteService(req.params.id);
  ApiResponse.send(res, 200, null, 'Service deleted');
});
