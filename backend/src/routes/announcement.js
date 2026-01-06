import express from 'express';
import multer from 'multer';
import {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  joinAnnouncement,
  leaveAnnouncement,
} from '../controllers/announcementController.js';

import { requireAdmin, requireStudent, optionalAuth } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ======= Public routes =======
router.get('/', optionalAuth, getAllAnnouncements);
router.get('/:id', optionalAuth, getAnnouncementById);

// ======= Admin routes =======
router.post('/', requireAdmin, upload.single('image'), createAnnouncement);
router.put('/:id', requireAdmin, upload.single('image'), updateAnnouncement);
router.delete('/:id', requireAdmin, deleteAnnouncement);

// ======= Student routes =======
router.post('/:id/join', requireStudent, joinAnnouncement);
router.post('/:id/leave', requireStudent, leaveAnnouncement);

export default router;

