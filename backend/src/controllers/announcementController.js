import prisma from '../config/database.js';
import { paginate } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';
import cacheService from '../services/cacheService.js';
import uploadService from '../services/uploadService.js';

// ====================== GET ALL ANNOUNCEMENTS ======================
export const getAllAnnouncements = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { skip, take } = paginate(page, limit);

  const cacheKey = `announcements:${page}:${limit}:${req.query.category || 'all'}`;
  const cached = await cacheService.get(cacheKey);
  if (cached) return res.json(cached);

  const where = req.query.category ? { category: req.query.category } : {};

  const [announcements, total] = await Promise.all([
    prisma.announcement.findMany({
      where,
      skip,
      take,
      include: {
        admin: { select: { id: true, name: true, email: true } },
        _count: { select: { students: true } },
      },
      orderBy: { date: 'desc' },
    }),
    prisma.announcement.count({ where }),
  ]);

  const response = {
    data: announcements,
    pagination: {
      page,
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };

  await cacheService.set(cacheKey, response, 300);
  res.json(response);
};

// ====================== GET ANNOUNCEMENT BY ID ======================
export const getAnnouncementById = async (req, res) => {
  const { id } = req.params;

  const announcement = await prisma.announcement.findUnique({
    where: { id },
    include: {
      admin: { select: { id: true, name: true, email: true } },
      students: { include: { student: { select: { id: true, name: true, email: true } } } },
    },
  });

  if (!announcement) throw new AppError('Announcement not found', 404);

  res.json({ data: announcement });
};

// ====================== CREATE ANNOUNCEMENT (ADMIN ONLY) ======================
export const createAnnouncement = async (req, res) => {
  const { title, content, location, category } = req.body;
  const imageUrl = req.file ? uploadService.getFileUrl(req.file.filename) : null;

  const announcement = await prisma.announcement.create({
    data: {
      title,
      content,
      location,
      category,
      imageUrl,
      adminId: req.admin.id,
    },
    include: { admin: { select: { id: true, name: true, email: true } } },
  });

  await cacheService.invalidatePattern('announcements:');

  res.status(201).json({ message: 'Announcement created successfully', data: announcement });
};

// ====================== UPDATE ANNOUNCEMENT (ADMIN ONLY) ======================
export const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, content, location, category } = req.body;

  const announcement = await prisma.announcement.findUnique({ where: { id } });
  if (!announcement) throw new AppError('Announcement not found', 404);

  let imageUrl = announcement.imageUrl;
  if (req.file) {
    if (announcement.imageUrl) {
      const oldFilename = announcement.imageUrl.split('/').pop();
      if (oldFilename) await uploadService.deleteFile(oldFilename);
    }
    imageUrl = uploadService.getFileUrl(req.file.filename);
  }

  const updatedAnnouncement = await prisma.announcement.update({
    where: { id },
    data: {
      title: title || announcement.title,
      content: content || announcement.content,
      location: location ?? announcement.location,
      category: category ?? announcement.category,
      imageUrl,
    },
    include: { admin: { select: { id: true, name: true, email: true } } },
  });

  await cacheService.invalidatePattern('announcements:');

  res.json({ message: 'Announcement updated successfully', data: updatedAnnouncement });
};

// ====================== DELETE ANNOUNCEMENT (ADMIN ONLY) ======================
export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  const announcement = await prisma.announcement.findUnique({ where: { id } });
  if (!announcement) throw new AppError('Announcement not found', 404);

  if (announcement.imageUrl) {
    const filename = announcement.imageUrl.split('/').pop();
    if (filename) await uploadService.deleteFile(filename);
  }

  await prisma.announcement.delete({ where: { id } });
  await cacheService.invalidatePattern('announcements:');

  res.json({ message: 'Announcement deleted successfully' });
};

// ====================== JOIN ANNOUNCEMENT (STUDENT ONLY) ======================
export const joinAnnouncement = async (req, res) => {
  const { id } = req.params;

  // ✅ هنا تم التأكد من req.student بواسطة middleware
  const studentId = req.student.id;

  const announcement = await prisma.announcement.findUnique({ where: { id } });
  if (!announcement) throw new AppError('Announcement not found', 404);

  const existing = await prisma.studentAnnouncement.findUnique({
    where: { studentId_announcementId: { studentId, announcementId: id } },
  });

  if (existing) throw new AppError('Already joined this announcement', 409);

  await prisma.studentAnnouncement.create({
    data: { studentId, announcementId: id },
  });

  await cacheService.invalidatePattern('announcements:');
  res.json({ message: 'Successfully joined announcement' });
};

// ====================== LEAVE ANNOUNCEMENT (STUDENT ONLY) ======================
export const leaveAnnouncement = async (req, res) => {
  const { id } = req.params;

  const studentId = req.student.id;

  const announcement = await prisma.announcement.findUnique({ where: { id } });
  if (!announcement) throw new AppError('Announcement not found', 404);

  await prisma.studentAnnouncement.delete({
    where: { studentId_announcementId: { studentId, announcementId: id } },
  }).catch(() => {
    throw new AppError('Not joined to this announcement', 404);
  });

  await cacheService.invalidatePattern('announcements:');
  res.json({ message: 'Successfully left announcement' });
};

