import prisma from '../config/database.js';
import { paginate } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';
import emailService from '../services/emailService.js';
import cacheService from '../services/cacheService.js';

// Get all contact messages (admin only)
export const getAllContactMessages = async (req, res) => {
  const { page = 1, limit = 10, isRead } = req.query;
  const { skip, take } = paginate(page, limit);

  const where = {};
  if (isRead !== undefined) {
    where.isRead = isRead === 'true';
  }

  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({
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
    prisma.contactMessage.count({ where }),
  ]);

  res.json({
    data: messages,
    pagination: {
      page,
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  });
};

// Get contact message by ID (admin only)
export const getContactMessageById = async (req, res) => {
  const { id } = req.params;

  const message = await prisma.contactMessage.findUnique({
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

  if (!message) {
    throw new AppError('Contact message not found', 404);
  }

  // Mark as read if not already read
  if (!message.isRead) {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  res.json({ data: message });
};

// Send contact message (public)
export const sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Get a super admin to assign the message to
  const superAdmin = await prisma.admin.findFirst({
    where: { isSuperAdmin: true },
  });

  const contactMessage = await prisma.contactMessage.create({
    data: {
      name,
      email,
      subject,
      message,
      adminId: superAdmin?.id,
    },
  });

  // Send confirmation email
  await emailService.sendContactConfirmation(name, email, subject);

  res.status(201).json({
    message: 'Contact message sent successfully',
    data: contactMessage,
  });
};

// Delete contact message (admin only)
export const deleteContactMessage = async (req, res) => {
  const { id } = req.params;

  const message = await prisma.contactMessage.findUnique({
    where: { id },
  });

  if (!message) {
    throw new AppError('Contact message not found', 404);
  }

  await prisma.contactMessage.delete({
    where: { id },
  });

  res.json({
    message: 'Contact message deleted successfully',
  });
};

