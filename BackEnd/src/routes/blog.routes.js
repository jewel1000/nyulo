import { Router } from 'express';
import * as controller from '../controllers/blog.controller.js';
import { requireApiKey } from '../middlewares/apiKey.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { blogSchema } from '../validations/index.js';

const router = Router();

router.get('/', controller.getBlogs);
router.get('/:slug', controller.getBlog);

// Admin
router.post('/', requireApiKey, validateBody(blogSchema), controller.createBlog);
router.patch('/:id', requireApiKey, controller.updateBlog);
router.delete('/:id', requireApiKey, controller.deleteBlog);

export default router;
