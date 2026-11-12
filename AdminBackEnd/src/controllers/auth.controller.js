import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as authService from '../services/auth.service.js';

export const status = asyncHandler(async (_req, res) => {
  ApiResponse.send(res, 200, { needsSetup: await authService.needsSetup() }, 'OK');
});

export const setup = asyncHandler(async (req, res) => {
  ApiResponse.send(res, 201, await authService.setup(req.body || {}), 'Admin account created');
});

export const login = asyncHandler(async (req, res) => {
  ApiResponse.send(res, 200, await authService.login(req.body || {}), 'Signed in');
});

export const me = asyncHandler(async (req, res) => {
  ApiResponse.send(res, 200, await authService.getProfile(req.admin.id), 'OK');
});

export const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.admin.id, req.body || {});
  ApiResponse.send(res, 200, null, 'Password changed');
});
