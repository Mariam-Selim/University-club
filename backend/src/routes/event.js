import { Router } from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { requireAdmin, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import {
  createEventValidator,
  updateEventValidator,
  idParamValidator,
  paginationValidator,
} from '../utils/validators.js';
import { cacheMiddleware, cacheConfigs } from '../middleware/cache.js';
import { uploadSingle, processImage } from '../middleware/upload.js';

const router = Router();

// Public routes
router.get('/', optionalAuth, validate(paginationValidator), cacheMiddleware(cacheConfigs.events), getAllEvents);
router.get('/:id', optionalAuth, validate(idParamValidator), getEventById);

// Admin only routes
router.post('/', requireAdmin, uploadSingle, processImage, validate(createEventValidator), createEvent);
router.put('/:id', requireAdmin, uploadSingle, processImage, validate(updateEventValidator), updateEvent);
router.delete('/:id', requireAdmin, validate(idParamValidator), deleteEvent);

export default router;

