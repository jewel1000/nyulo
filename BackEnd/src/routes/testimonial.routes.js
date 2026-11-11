import { Router } from 'express';
import * as controller from '../controllers/testimonial.controller.js';
import { requireApiKey } from '../middlewares/apiKey.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { testimonialSchema } from '../validations/index.js';

const router = Router();

router.get('/', controller.getTestimonials);

// Admin
router.post('/', requireApiKey, validateBody(testimonialSchema), controller.createTestimonial);
router.delete('/:id', requireApiKey, controller.deleteTestimonial);

export default router;
