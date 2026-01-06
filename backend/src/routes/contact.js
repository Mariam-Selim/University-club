import { Router } from 'express';
import {
  getAllContactMessages,
  getContactMessageById,
  sendContactMessage,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { createContactValidator, idParamValidator, paginationValidator } from '../utils/validators.js';
import { contactLimiter } from '../config/rateLimit.js';

const router = Router();

// Public route
router.post('/', contactLimiter, validate(createContactValidator), sendContactMessage);

// Admin only routes
router.get('/', requireAdmin, validate(paginationValidator), getAllContactMessages);
router.get('/:id', requireAdmin, validate(idParamValidator), getContactMessageById);
router.delete('/:id', requireAdmin, validate(idParamValidator), deleteContactMessage);

export default router;

