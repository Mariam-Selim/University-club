import prisma from '../config/database.js';
import { hashPassword, sanitizeEmail, paginate } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';
import cacheService from '../services/cacheService.js';

// Get all students (admin only)
export const getAllStudents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { skip, take } = paginate(page, limit);

  const cacheKey = `students:${page}:${limit}`;
  const cached = await cacheService.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      skip,
      take,
      select: {
        id: true,
        email: true,
        name: true,
        level: true,
        phone: true,
        isVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.student.count(),
  ]);

  const response = {
    data: students,
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

// Get student by ID
export const getStudentById = async (req, res) => {
  const { id } = req.params;

  // التحقق من أن الطالب يمكنه رؤية ملفه فقط
  if (req.user?.type === 'student' && req.user.id !== id) {
    throw new AppError('You can only view your own profile', 403);
  }

  // إذا كان admin يمكنه رؤية أي ملف
  const student = await prisma.student.findUnique({
    where: { id },
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
    throw new AppError('Student not found', 404);
  }

  res.json({ data: student });
};

// Create student (admin only)
export const createStudent = async (req, res) => {
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

  // Invalidate cache
  await cacheService.invalidatePattern('students:');

  res.status(201).json({
    message: 'Student created successfully',
    student,
  });
};

// Get student's announcements
export const getStudentAnnouncements = async (req, res) => {
  const { id } = req.params;

  // Students can only view their own announcements
  // هذا التأكيد مهم لأن الطالب لا يمكنه رؤية إعلانات طالب آخر
  if (req.user?.type === 'student' && req.user.id !== id) {
    throw new AppError('You can only view your own announcements', 403);
  }

  // إذا كان admin يمكنه رؤية إعلانات أي طالب
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      announcements: {
        include: {
          announcement: {
            include: {
              admin: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          joinedAt: 'desc',
        },
      },
    },
  });

  if (!student) {
    throw new AppError('Student not found', 404);
  }

  const announcements = student.announcements.map((sa) => ({
    ...sa.announcement,
    joinedAt: sa.joinedAt,
  }));

  res.json({ data: announcements });
};