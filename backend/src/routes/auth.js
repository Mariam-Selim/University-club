import { Router } from 'express';
import {
  registerStudent,
  requestAdminAccess,
  loginStudent,
  loginAdmin,
  googleAuth,
  googleCallback,
  logout,
  getMe,
} from '../controllers/authController.js';
import { validate } from '../middleware/validation.js';
import {
  registerStudentValidator,
  registerAdminValidator,
  loginValidator,
} from '../utils/validators.js';
import { verifyToken } from '../middleware/auth.js';
import { authLimiter } from '../config/rateLimit.js';

const router = Router();

// Public routes
router.post('/student/register', authLimiter, validate(registerStudentValidator), registerStudent);
router.post('/admin/register', authLimiter, validate(registerAdminValidator), requestAdminAccess);
router.post('/student/login', authLimiter, validate(loginValidator), loginStudent);
router.post('/admin/login', authLimiter, validate(loginValidator), loginAdmin);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.post('/logout', logout);
router.get('/me', verifyToken, getMe);

export default router;

