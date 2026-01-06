import { Router } from 'express';
import {
  getAllTeamMembers,
  getTeamMemberById,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController.js';
import { requireAdmin, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { createTeamValidator, updateTeamValidator, idParamValidator } from '../utils/validators.js';
import { cacheMiddleware, cacheConfigs } from '../middleware/cache.js';
import { uploadSingle, processImage } from '../middleware/upload.js';

const router = Router();

// Public routes
router.get('/', optionalAuth, cacheMiddleware(cacheConfigs.team), getAllTeamMembers);
router.get('/:id', optionalAuth, validate(idParamValidator), getTeamMemberById);

// Admin only routes
router.post('/', requireAdmin, uploadSingle, processImage, validate(createTeamValidator), addTeamMember);
router.put('/:id', requireAdmin, uploadSingle, processImage, validate(updateTeamValidator), updateTeamMember);
router.delete('/:id', requireAdmin, validate(idParamValidator), deleteTeamMember);

export default router;

