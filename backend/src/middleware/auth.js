import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import logger from '../utils/logger.js';

// ================= VERIFY TOKEN =================
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, type }
    next();
  } catch (error) {
    logger.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ================= ADMIN ONLY =================
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.type !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: req.user.id },
    });

    if (!admin) {
      return res.status(403).json({ message: 'Admin not found' });
    }

    if (!admin.isSuperAdmin && admin.status !== 'approved') {
      return res.status(403).json({ message: 'Admin not approved yet' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    logger.error('Admin auth error:', error);
    return res.status(500).json({ message: 'Admin authentication failed' });
  }
};

// ================= STUDENT ONLY =================
export const requireStudent = async (req, res, next) => {
  try {
    if (!req.user || req.user.type !== 'student') {
      return res.status(403).json({ message: 'Student access required' });
    }

    const student = await prisma.student.findUnique({
      where: { id: req.user.id },
    });

    if (!student) {
      return res.status(403).json({ message: 'Student not found' });
    }

    req.student = student;
    next();
  } catch (error) {
    logger.error('Student auth error:', error);
    return res.status(500).json({ message: 'Student authentication failed' });
  }
};

// ================= OPTIONAL AUTH =================
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : req.cookies?.token;

    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.type === 'admin') {
      req.admin = await prisma.admin.findUnique({ where: { id: decoded.id } });
    }

    if (decoded.type === 'student') {
      req.student = await prisma.student.findUnique({ where: { id: decoded.id } });
    }

    next();
  } catch (error) {
    next();
  }
};

// ================= SUPER ADMIN ONLY =================
export const requireSuperAdmin = (req, res, next) => {
  if (!req.admin || !req.admin.isSuperAdmin) {
    return res.status(403).json({ message: 'Super admin access required' });
  }
  next();
};
