import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { env } from '../config/index.js';
import { META } from '../validations/resources.js';
import * as settingsService from '../services/settings.service.js';
import * as statsService from '../services/stats.service.js';

export const dashboard = asyncHandler(async (_req, res) => {
  ApiResponse.send(res, 200, await statsService.getDashboard(), 'OK');
});

export const meta = asyncHandler(async (_req, res) => {
  ApiResponse.send(res, 200, META, 'OK');
});

export const updateSection = asyncHandler(async (req, res) => {
  const value = await settingsService.updateSection(req.params.section, req.body?.value);
  ApiResponse.send(res, 200, value, 'Saved');
});

export const resetSection = asyncHandler(async (req, res) => {
  await settingsService.resetSection(req.params.section);
  ApiResponse.send(res, 200, null, 'Reset to default');
});

export const upload = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest('Choose an image to upload');

  // Public address of the file: a configured base (e.g. a folder the web
  // server exposes directly) or this API's own /uploads route.
  const base = env.uploadPublicUrl || `${req.protocol}://${req.get('host')}${req.baseUrl}/uploads`;
  ApiResponse.send(
    res,
    201,
    { url: `${base}/${req.file.filename}`, size: req.file.size, type: req.file.mimetype },
    'Uploaded'
  );
});
