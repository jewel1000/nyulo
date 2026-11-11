import { Router } from 'express';
import * as controller from '../controllers/contact.controller.js';
import { requireApiKey } from '../middlewares/apiKey.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { contactSchema } from '../validations/index.js';

const router = Router();

router.post('/', validateBody(contactSchema), controller.createContact);

// Admin
router.get('/', requireApiKey, controller.getContacts);

export default router;
