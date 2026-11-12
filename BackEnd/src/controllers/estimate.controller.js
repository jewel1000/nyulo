import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { parsePagination } from '../utils/pagination.js';
import * as estimateService from '../services/estimate.service.js';

export const getEstimatorConfig = asyncHandler(async (_req, res) => {
  ApiResponse.send(res, 200, await estimateService.getEstimatorConfig(), 'Estimator config fetched');
});

export const calculateEstimate = asyncHandler(async (req, res) => {
  const quote = await estimateService.calculateEstimate(req.body);
  ApiResponse.send(res, 200, quote, 'Estimate calculated');
});

export const saveEstimateLead = asyncHandler(async (req, res) => {
  const { lead, quote } = await estimateService.saveEstimateLead(req.body);
  ApiResponse.send(res, 201, { id: lead._id, quote }, 'Estimate saved. Our team will contact you shortly.');
});

export const getEstimates = asyncHandler(async (req, res) => {
  const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 20 });
  const { items, meta } = await estimateService.listEstimates({ page, limit, skip });
  ApiResponse.send(res, 200, items, 'Estimates fetched', meta);
});
