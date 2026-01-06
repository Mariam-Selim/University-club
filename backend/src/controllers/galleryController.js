import prisma from '../config/database.js';
import { paginate } from '../utils/helpers.js'; // ✅ الإضافة الوحيدة
import { AppError } from '../middleware/errorHandler.js';
import cacheService from '../services/cacheService.js';
import uploadService from '../services/uploadService.js';

// Get all gallery photos
export const getAllGalleryPhotos = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const { category } = req.query;

  const { skip, take } = paginate(page, limit);

  const cacheKey = `gallery:${page}:${limit}:${category || 'all'}`;
  const cached = await cacheService.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const where = category ? { category } : {};

  const [photos, total] = await Promise.all([
    prisma.galleryPhoto.findMany({
      where,
      skip,
      take,
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.galleryPhoto.count({ where }),
  ]);

  const response = {
    data: photos,
    pagination: {
      page,
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };

  await cacheService.set(cacheKey, response, 1800);
  res.json(response);
};

// Get gallery photo by ID
export const getGalleryPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await prisma.galleryPhoto.findUnique({
    where: { id },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!photo) {
    throw new AppError('Gallery photo not found', 404);
  }

  res.json({ data: photo });
};

// Upload gallery photo (admin only)
export const uploadGalleryPhoto = async (req, res) => {
  if (!req.file) {
    throw new AppError('Image file is required', 400);
  }

  const { title, category, description } = req.body;
  const imageUrl = uploadService.getFileUrl(req.file.filename);

  const photo = await prisma.galleryPhoto.create({
    data: {
      imageUrl,
      title,
      category,
      description,
      adminId: req.admin.id,
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  await cacheService.invalidatePattern('gallery:');

  res.status(201).json({
    message: 'Photo uploaded successfully',
    data: photo,
  });
};

// Delete gallery photo (admin only)
export const deleteGalleryPhoto = async (req, res) => {
  const { id } = req.params;

  const photo = await prisma.galleryPhoto.findUnique({
    where: { id },
  });

  if (!photo) {
    throw new AppError('Gallery photo not found', 404);
  }

  if (photo.imageUrl) {
    const filename = photo.imageUrl.split('/').pop();
    if (filename) {
      await uploadService.deleteFile(filename);
    }
  }

  await prisma.galleryPhoto.delete({
    where: { id },
  });

  await cacheService.invalidatePattern('gallery:');

  res.json({
    message: 'Photo deleted successfully',
  });
};
