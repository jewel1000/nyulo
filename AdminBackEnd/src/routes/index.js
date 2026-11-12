import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { env } from '../config/index.js';
import { getStorageMode } from '../config/postgres.js';
import { requireAdmin } from '../middlewares/auth.middleware.js';
import { uploadImage } from '../middlewares/upload.middleware.js';
import * as auth from '../controllers/auth.controller.js';
import * as resources from '../controllers/resource.controller.js';
import * as misc from '../controllers/misc.controller.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Nyulo Interior admin API is running', database: getStorageMode() });
});

// --- Uploaded images (public: the main site displays them) ------------------
router.use(
  '/uploads',
  express.static(env.uploadDir, {
    index: false,
    maxAge: '30d',
    setHeaders: (res) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('X-Content-Type-Options', 'nosniff');
    },
  })
);

// --- Authentication ---------------------------------------------------------
// Tight limit on credential endpoints to slow password guessing.
const credentialLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please wait 15 minutes and try again.' },
});

router.get('/auth/status', auth.status);
router.post('/auth/setup', credentialLimiter, auth.setup);
router.post('/auth/login', credentialLimiter, auth.login);
router.get('/auth/me', requireAdmin, auth.me);
router.post('/auth/password', requireAdmin, credentialLimiter, auth.changePassword);

// --- Everything below needs a signed-in admin -------------------------------
router.use(requireAdmin);

router.get('/dashboard', misc.dashboard);
router.get('/meta', misc.meta);
router.post('/uploads', uploadImage, misc.upload);

router.put('/settings/:section', misc.updateSection);
router.delete('/settings/:section', misc.resetSection);

router.get('/resources/:resource', resources.list);
router.post('/resources/:resource', resources.create);
router.get('/resources/:resource/:id', resources.get);
router.patch('/resources/:resource/:id', resources.update);
router.delete('/resources/:resource/:id', resources.remove);

export default router;
