import passport from 'passport';
import prisma from '../config/database.js';
import { hashPassword, generateToken, sanitizeEmail } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';
import emailService from '../services/emailService.js';
import logger from '../utils/logger.js';

// Student Registration
export const registerStudent = async (req, res) => {
  const { email, name, password, level, phone } = req.body;

  const sanitizedEmail = sanitizeEmail(email);

  // Check if student already exists
  const existingStudent = await prisma.student.findUnique({
    where: { email: sanitizedEmail },
  });

  if (existingStudent) {
    throw new AppError('Student with this email already exists', 409);
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create student
  const student = await prisma.student.create({
    data: {
      email: sanitizedEmail,
      name,
      password: hashedPassword,
      level: level || 'Freshman',
      phone,
    },
    select: {
      id: true,
      email: true,
      name: true,
      level: true,
      phone: true,
      createdAt: true,
    },
  });

  // Generate token
  const token = generateToken({
    id: student.id,
    type: 'student',
    email: student.email,
  });

  res.status(201).json({
    message: 'Student registered successfully',
    student,
    token,
  });
};

// Admin Registration Request
export const requestAdminAccess = async (req, res) => {
  const { email, name, phone, message } = req.body;

  const sanitizedEmail = sanitizeEmail(email);

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: sanitizedEmail },
  });

  if (existingAdmin) {
    throw new AppError('Admin with this email already exists', 409);
  }

  // Check if request already exists
  const existingRequest = await prisma.adminRequest.findFirst({
    where: {
      email: sanitizedEmail,
      status: 'pending',
    },
  });

  if (existingRequest) {
    throw new AppError('A pending request already exists for this email', 409);
  }

  // Get a super admin to assign as requester
  const superAdmin = await prisma.admin.findFirst({
    where: { isSuperAdmin: true },
  });

  if (!superAdmin) {
    throw new AppError('No super admin found to process requests', 500);
  }

  // Create admin request
  const adminRequest = await prisma.adminRequest.create({
    data: {
      email: sanitizedEmail,
      name,
      phone,
      message,
      requestedById: superAdmin.id,
    },
  });

  // Send notification email
  await emailService.sendAdminRequestNotification(sanitizedEmail, name);

  res.status(201).json({
    message: 'Admin access request submitted successfully',
    request: adminRequest,
  });
};

// Student Login
export const loginStudent = (req, res, next) => {
  passport.authenticate('student-local', { session: false }, (err, student, info) => {
    if (err) {
      return next(err);
    }
    if (!student) {
      return res.status(401).json({ message: info?.message || 'Invalid credentials' });
    }

    const token = generateToken({
      id: student.id,
      type: 'student',
      email: student.email,
    });

    res.json({
      message: 'Login successful',
      student: {
        id: student.id,
        email: student.email,
        name: student.name,
        level: student.level,
      },
      token,
    });
  })(req, res, next);
};

// Admin Login
export const loginAdmin = (req, res, next) => {
  passport.authenticate('admin-local', { session: false }, (err, admin, info) => {
    if (err) return next(err);
    if (!admin) return res.status(401).json({ message: info?.message || 'Invalid credentials' });

    if (!admin.isSuperAdmin && admin.status !== 'approved') {
      return res.status(403).json({ message: 'Admin not approved yet' });
    }

    const token = generateToken({
      id: admin.id,
      type: 'admin',
      email: admin.email,
    });

    // ✅ response
    res.json({
      message: 'Login successful',
      data: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        isSuperAdmin: admin.isSuperAdmin,
        // status موجود فقط للـ admins العاديين
        ...(admin.isSuperAdmin ? {} : { status: admin.status }),
      },
      token,
    });
  })(req, res, next);
};

// Google OAuth
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// Google OAuth Callback
export const googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, student) => {
    if (err) {
      return next(err);
    }

    if (!student) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=auth_failed`);
    }

    const token = generateToken({
      id: student.id,
      type: 'student',
      email: student.email,
    });

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}`);
  })(req, res, next);
};

// Logout
export const logout = async (req, res) => {
  // In a JWT-based system, logout is handled client-side by removing the token
  // But we can invalidate the token in Redis if needed
  res.json({ message: 'Logout successful' });
};

// Get Current User
export const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    if (req.user.type === 'admin') {
      const admin = await prisma.admin.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          isSuperAdmin: true,
          createdAt: true,
        },
      });

      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      return res.json({ user: admin, type: 'admin' });
    } else {
      const student = await prisma.student.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          level: true,
          phone: true,
          isVerified: true,
          createdAt: true,
        },
      });

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      return res.json({ user: student, type: 'student' });
    }
  } catch (error) {
    logger.error('Get me error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

