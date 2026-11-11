import { Router } from 'express';
import projectRoutes from './project.routes.js';
import serviceRoutes from './service.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import blogRoutes from './blog.routes.js';
import contactRoutes from './contact.routes.js';
import estimateRoutes from './estimate.routes.js';
import { getStorageMode } from '../config/db.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Nyulo Interior API is running',
    database: getStorageMode(),
    timestamp: new Date().toISOString(),
  });
});

router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/blogs', blogRoutes);
router.use('/contacts', contactRoutes);
router.use('/estimates', estimateRoutes);

export default router;
