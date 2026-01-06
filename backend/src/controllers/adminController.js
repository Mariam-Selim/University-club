import prisma from '../config/database.js';
import { hashPassword, sanitizeEmail, paginate } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';
import emailService from '../services/emailService.js';
import cacheService from '../services/cacheService.js';
import logger from '../utils/logger.js';

// Get all admins
export const getAllAdmins = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { skip, take } = paginate(page, limit);

  const cacheKey = `admins:${page}:${limit}`;
  const cached = await cacheService.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const [admins, total] = await Promise.all([
    prisma.admin.findMany({
      skip,
      take,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        isSuperAdmin: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.admin.count(),
  ]);

  const response = {
    data: admins,
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

// Create admin (super admin only)
export const createAdmin = async (req, res) => {
  const { email, name, password, phone, isSuperAdmin } = req.body;

  if (!req.admin?.isSuperAdmin) {
    throw new AppError('Only super admins can create admins', 403);
  }

  const sanitizedEmail = sanitizeEmail(email);

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: sanitizedEmail },
  });

  if (existingAdmin) {
    throw new AppError('Admin with this email already exists', 409);
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create admin
  const admin = await prisma.admin.create({
    data: {
      email: sanitizedEmail,
      name,
      password: hashedPassword,
      phone,
      isSuperAdmin: isSuperAdmin || false,
    },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      isSuperAdmin: true,
      createdAt: true,
    },
  });

  // Invalidate cache
  await cacheService.invalidatePattern('admins:');

  res.status(201).json({
    message: 'Admin created successfully',
    admin,
  });
};

// Get pending admin requests
export const getPendingRequests = async (req, res) => {
  const requests = await prisma.adminRequest.findMany({
    where: { status: 'pending' },
    include: {
      requestedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ data: requests });
};

// Approve admin request
export const approveAdminRequest = async (req, res) => {
  const { id } = req.params;

  if (!req.admin?.isSuperAdmin) {
    throw new AppError('Only super admins can approve requests', 403);
  }

  const request = await prisma.adminRequest.findUnique({
    where: { id },
  });

  if (!request) {
    throw new AppError('Admin request not found', 404);
  }

  if (request.status !== 'pending') {
    throw new AppError('Request is not pending', 400);
  }

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: request.email },
  });

  if (existingAdmin) {
    throw new AppError('Admin with this email already exists', 409);
  }

  // Generate temporary password
  const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
  const hashedPassword = await hashPassword(tempPassword);

  // Create admin
  const admin = await prisma.admin.create({
    data: {
      email: request.email,
      name: request.name,
      password: hashedPassword,
      phone: request.phone,
      isSuperAdmin: false,
    },
  });

  // Update request status
  await prisma.adminRequest.update({
    where: { id },
    data: {
      status: 'approved',
      approvedById: req.admin.id,
    },
  });

  // Send approval email with temporary password
  await emailService.sendAdminApprovalNotification(request.email, request.name, true);

  // Invalidate cache
  await cacheService.invalidatePattern('admins:');

  res.json({
    message: 'Admin request approved successfully',
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
    tempPassword, // In production, send this via email only
  });
};

// Reject admin request
export const rejectAdminRequest = async (req, res) => {
  const { id } = req.params;

  if (!req.admin?.isSuperAdmin) {
    throw new AppError('Only super admins can reject requests', 403);
  }

  const request = await prisma.adminRequest.findUnique({
    where: { id },
  });

  if (!request) {
    throw new AppError('Admin request not found', 404);
  }

  if (request.status !== 'pending') {
    throw new AppError('Request is not pending', 400);
  }

  // Update request status
  await prisma.adminRequest.update({
    where: { id },
    data: {
      status: 'rejected',
      approvedById: req.admin.id,
    },
  });

  // Send rejection email
  await emailService.sendAdminApprovalNotification(request.email, request.name, false);

  res.json({
    message: 'Admin request rejected successfully',
  });
};

