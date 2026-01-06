import { Router } from 'express';
import {
  getAllLostFound,
  getLostFoundById,
  createLostFound,
  updateLostFound,
  deleteLostFound,
} from '../controllers/lostFoundController.js';
import { requireAdmin, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import {
  createLostFoundValidator,
  updateLostFoundValidator,
  idParamValidator,
  paginationValidator,
} from '../utils/validators.js';
import { cacheMiddleware, cacheConfigs } from '../middleware/cache.js';
import { uploadSingle, processImage } from '../middleware/upload.js';

const router = Router();

// Public routes
router.get('/', optionalAuth, validate(paginationValidator), cacheMiddleware(cacheConfigs.lostFound), getAllLostFound);
router.get('/:id', optionalAuth, validate(idParamValidator), getLostFoundById);

// Admin only routes
router.post('/', requireAdmin, uploadSingle, processImage, validate(createLostFoundValidator), createLostFound);
router.put('/:id', requireAdmin, uploadSingle, processImage, validate(updateLostFoundValidator), updateLostFound);
router.delete('/:id', requireAdmin, validate(idParamValidator), deleteLostFound);

export default router;

