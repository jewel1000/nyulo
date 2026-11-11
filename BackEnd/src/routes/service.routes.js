import { Router } from 'express';
import * as controller from '../controllers/service.controller.js';
import { requireApiKey } from '../middlewares/apiKey.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { serviceSchema } from '../validations/index.js';

const router = Router();

router.get('/', controller.getServices);
router.get('/:slug', controller.getService);

// Admin
router.post('/', requireApiKey, validateBody(serviceSchema), controller.createService);
router.patch('/:id', requireApiKey, controller.updateService);
router.delete('/:id', requireApiKey, controller.deleteService);

export default router;
