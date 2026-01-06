import prisma from '../config/database.js';
import { paginate } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';
import cacheService from '../services/cacheService.js';
import uploadService from '../services/uploadService.js';

// Get all events
export const getAllEvents = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;
  const { skip, take } = paginate(Number(page), Number(limit)); 

  const cacheKey = `events:${page}:${limit}:${category || 'all'}`;
  const cached = await cacheService.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const where = category ? { category } : {};

  const [events, total] = await Promise.all([
    prisma.event.findMany({
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
      orderBy: { date: 'desc' },
    }),
    prisma.event.count({ where }),
  ]);

  const response = {
    data: events,
    pagination: {
      page: Number(page),
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };

  await cacheService.set(cacheKey, response, 600);
  res.json(response);
};

// Get event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;

  const event = await prisma.event.findUnique({
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

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  res.json({ data: event });
};

// Create event (admin only)
export const createEvent = async (req, res) => {
  const { title, description, date, location, category } = req.body;
  const imageUrl = req.file ? uploadService.getFileUrl(req.file.filename) : null;

  const event = await prisma.event.create({
    data: {
      title,
      description,
      date: new Date(date),
      location,
      category,
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
  await cacheService.invalidatePattern('events:');

  res.status(201).json({
    message: 'Event created successfully',
    data: event,
  });
};

// Update event (admin only)
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, category } = req.body;

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  // Delete old image if new one is uploaded
  let imageUrl = event.imageUrl;
  if (req.file) {
    if (event.imageUrl) {
      const oldFilename = event.imageUrl.split('/').pop();
      if (oldFilename) {
        await uploadService.deleteFile(oldFilename);
      }
    }
    imageUrl = uploadService.getFileUrl(req.file.filename);
  }

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: {
      title: title || event.title,
      description: description !== undefined ? description : event.description,
      date: date ? new Date(date) : event.date,
      location: location !== undefined ? location : event.location,
      category: category !== undefined ? category : event.category,
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
  await cacheService.invalidatePattern('events:');

  res.json({
    message: 'Event updated successfully',
    data: updatedEvent,
  });
};

// Delete event (admin only)
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  // Delete associated image
  if (event.imageUrl) {
    const filename = event.imageUrl.split('/').pop();
    if (filename) {
      await uploadService.deleteFile(filename);
    }
  }

  await prisma.event.delete({
    where: { id },
  });

  // Invalidate cache
  await cacheService.invalidatePattern('events:');

  res.json({
    message: 'Event deleted successfully',
  });
};
