import { Router } from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  getStudentAnnouncements,
} from '../controllers/studentController.js';
import { verifyToken, requireAdmin, requireStudent, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import {
  createStudentValidator,
  idParamValidator,
  paginationValidator,
} from '../utils/validators.js';
import { cacheMiddleware, cacheConfigs } from '../middleware/cache.js';

const router = Router();

// Get all students (admin only)
router.get('/', verifyToken, requireAdmin, validate(paginationValidator), getAllStudents);

// Get student by ID (owner or admin)
router.get('/:id', optionalAuth, validate(idParamValidator), getStudentById);

// Create student (admin only)
router.post('/', verifyToken, requireAdmin, validate(createStudentValidator), createStudent);

// Get student's announcements (student access only - verifyToken + requireStudent)
router.get(
  '/:id/announcements',
  verifyToken,
  requireStudent,
  validate(idParamValidator),
  getStudentAnnouncements
);

export default router;
