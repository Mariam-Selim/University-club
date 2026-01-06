import { Router } from 'express';
import {
  getAllAdmins,
  createAdmin,
  getPendingRequests,
  approveAdminRequest,
  rejectAdminRequest,
} from '../controllers/adminController.js';
import { verifyToken, requireAdmin, requireSuperAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { createAdminValidator, idParamValidator, paginationValidator } from '../utils/validators.js';

const router = Router();

router.use(verifyToken);
// All routes require admin authentication
router.use(requireAdmin);

router.get('/', paginationValidator, validate(paginationValidator), getAllAdmins);
router.get('/requests/pending', getPendingRequests);
router.post('/requests/:id/approve', validate(idParamValidator), requireSuperAdmin, approveAdminRequest);
router.post('/requests/:id/reject', validate(idParamValidator), requireSuperAdmin, rejectAdminRequest);
router.post('/', validate(createAdminValidator), requireSuperAdmin, createAdmin);

export default router;

