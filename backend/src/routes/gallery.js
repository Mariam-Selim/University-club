import { Router } from 'express';
import {
  getAllGalleryPhotos,
  getGalleryPhotoById,
  uploadGalleryPhoto,
  deleteGalleryPhoto,
} from '../controllers/galleryController.js';
import { requireAdmin, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { createGalleryValidator, idParamValidator, paginationValidator } from '../utils/validators.js';
import { cacheMiddleware, cacheConfigs } from '../middleware/cache.js';
import { uploadSingle, processImage } from '../middleware/upload.js';

const router = Router();

// Public routes
router.get('/', optionalAuth, validate(paginationValidator), cacheMiddleware(cacheConfigs.gallery), getAllGalleryPhotos);
router.get('/:id', optionalAuth, validate(idParamValidator), getGalleryPhotoById);

// Admin only routes
router.post('/', requireAdmin, uploadSingle, processImage, validate(createGalleryValidator), uploadGalleryPhoto);
router.delete('/:id', requireAdmin, validate(idParamValidator), deleteGalleryPhoto);

export default router;

