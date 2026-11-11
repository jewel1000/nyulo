import { Router } from 'express';
import * as controller from '../controllers/project.controller.js';
import { requireApiKey } from '../middlewares/apiKey.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { projectSchema } from '../validations/index.js';

const router = Router();

router.get('/', controller.getProjects);
router.get('/:slug', controller.getProject);

// Admin
router.post('/', requireApiKey, validateBody(projectSchema), controller.createProject);
router.patch('/:id', requireApiKey, controller.updateProject);
router.delete('/:id', requireApiKey, controller.deleteProject);

export default router;
