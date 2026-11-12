import { Router } from 'express';
import projectRoutes from './project.routes.js';
import serviceRoutes from './service.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import blogRoutes from './blog.routes.js';
import contactRoutes from './contact.routes.js';
import estimateRoutes from './estimate.routes.js';
import { getStorageMode } from '../config/db.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { getSiteSettings } from '../services/settings.service.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Nyulo Interior API is running',
    database: getStorageMode(),
    timestamp: new Date().toISOString(),
  });
});

// Site-wide content (company details, hero, stats, …) edited in the admin panel.
router.get(
  '/settings',
  asyncHandler(async (_req, res) => {
    ApiResponse.send(res, 200, await getSiteSettings(), 'Site settings fetched');
  })
);

router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/blogs', blogRoutes);
router.use('/contacts', contactRoutes);
router.use('/estimates', estimateRoutes);

export default router;
