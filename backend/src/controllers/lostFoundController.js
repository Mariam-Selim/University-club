import prisma from '../config/database.js';
import { paginate } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';
import cacheService from '../services/cacheService.js';
import uploadService from '../services/uploadService.js';

// Get all lost & found items
export const getAllLostFound = async (req, res) => {
  const page = parseInt(req.query.page) || 1;   // تحويل لرقم
  const limit = parseInt(req.query.limit) || 10; // تحويل لرقم
  const { skip, take } = paginate(page, limit);

  const status = req.query.status;
  const cacheKey = `lost-found:${page}:${limit}:${status || 'all'}`;
  const cached = await cacheService.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const where = {};
  if (status) {
    where.status = status;
  }

  const [items, total] = await Promise.all([
    prisma.lostAndFound.findMany({
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
    prisma.lostAndFound.count({ where }),
  ]);

  const response = {
    data: items,
    pagination: {
      page,
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };

  await cacheService.set(cacheKey, response, 600);
  res.json(response);
};

// Get lost & found item by ID
export const getLostFoundById = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.lostAndFound.findUnique({
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

  if (!item) {
    throw new AppError('Lost & Found item not found', 404);
  }

  res.json({ data: item });
};

// Create lost & found item (admin only)
export const createLostFound = async (req, res) => {
  const { title, description, status, location, contactInfo } = req.body;
  const imageUrl = req.file ? uploadService.getFileUrl(req.file.filename) : null;

  const item = await prisma.lostAndFound.create({
    data: {
      title,
      description,
      status: status || 'lost',
      location,
      contactInfo,
      imageUrl,
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

  // Invalidate cache
  await cacheService.invalidatePattern('lost-found:');

  res.status(201).json({
    message: 'Lost & Found item created successfully',
    data: item,
  });
};

// Update lost & found item (admin only)
export const updateLostFound = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, location, contactInfo } = req.body;

  const item = await prisma.lostAndFound.findUnique({
    where: { id },
  });

  if (!item) {
    throw new AppError('Lost & Found item not found', 404);
  }

  // Delete old image if new one is uploaded
  let imageUrl = item.imageUrl;
  if (req.file) {
    if (item.imageUrl) {
      const oldFilename = item.imageUrl.split('/').pop();
      if (oldFilename) {
        await uploadService.deleteFile(oldFilename);
      }
    }
    imageUrl = uploadService.getFileUrl(req.file.filename);
  }

  const updatedItem = await prisma.lostAndFound.update({
    where: { id },
    data: {
      title: title || item.title,
      description: description !== undefined ? description : item.description,
      status: status || item.status,
      location: location !== undefined ? location : item.location,
      contactInfo: contactInfo !== undefined ? contactInfo : item.contactInfo,
      imageUrl,
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

  // Invalidate cache
  await cacheService.invalidatePattern('lost-found:');

  res.json({
    message: 'Lost & Found item updated successfully',
    data: updatedItem,
  });
};

// Delete lost & found item (admin only)
export const deleteLostFound = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.lostAndFound.findUnique({
    where: { id },
  });

  if (!item) {
    throw new AppError('Lost & Found item not found', 404);
  }

  // Delete associated image
  if (item.imageUrl) {
    const filename = item.imageUrl.split('/').pop();
    if (filename) {
      await uploadService.deleteFile(filename);
    }
  }

  await prisma.lostAndFound.delete({
    where: { id },
  });

  // Invalidate cache
  await cacheService.invalidatePattern('lost-found:');

  res.json({
    message: 'Lost & Found item deleted successfully',
  });
};
