import { Router } from 'express';
import * as controller from '../controllers/estimate.controller.js';
import { requireApiKey } from '../middlewares/apiKey.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { estimateCalcSchema, estimateLeadSchema } from '../validations/index.js';

const router = Router();

router.get('/config', controller.getEstimatorConfig);
router.post('/calculate', validateBody(estimateCalcSchema), controller.calculateEstimate);
router.post('/', validateBody(estimateLeadSchema), controller.saveEstimateLead);

// Admin
router.get('/', requireApiKey, controller.getEstimates);

export default router;
