import { body, param, query } from 'express-validator';

// Auth validators
export const registerStudentValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('level').optional().isIn(['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']).withMessage('Invalid level'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
];

export const registerAdminValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
  body('message').optional().trim().isLength({ max: 500 }).withMessage('Message must be less than 500 characters'),
];

export const loginValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Event validators
export const createEventValidator = [
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
  body('category').optional().trim().isLength({ max: 50 }).withMessage('Category must be less than 50 characters'),
];

export const updateEventValidator = [
  param('id').notEmpty().withMessage('Event ID is required'),
  body('title').optional().trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
  body('date').optional().isISO8601().withMessage('Valid date is required'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
  body('category').optional().trim().isLength({ max: 50 }).withMessage('Category must be less than 50 characters'),
];

// Announcement validators
export const createAnnouncementValidator = [
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('content').trim().isLength({ min: 10, max: 5000 }).withMessage('Content must be between 10 and 5000 characters'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
  body('category').optional().trim().isLength({ max: 50 }).withMessage('Category must be less than 50 characters'),
];

export const updateAnnouncementValidator = [
  param('id').notEmpty().withMessage('Announcement ID is required'),
  body('title').optional().trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('content').optional().trim().isLength({ min: 10, max: 5000 }).withMessage('Content must be between 10 and 5000 characters'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
  body('category').optional().trim().isLength({ max: 50 }).withMessage('Category must be less than 50 characters'),
];

// Gallery validators
export const createGalleryValidator = [
  body('title').optional().trim().isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  body('category').optional().trim().isLength({ max: 50 }).withMessage('Category must be less than 50 characters'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
];

// Team validators
export const createTeamValidator = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('role').trim().isLength({ min: 2, max: 100 }).withMessage('Role must be between 2 and 100 characters'),
  body('bio').optional().trim().isLength({ max: 1000 }).withMessage('Bio must be less than 1000 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
];

export const updateTeamValidator = [
  param('id').notEmpty().withMessage('Team member ID is required'),
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('role').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Role must be between 2 and 100 characters'),
  body('bio').optional().trim().isLength({ max: 1000 }).withMessage('Bio must be less than 1000 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
];

// Contact validators
export const createContactValidator = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 3, max: 200 }).withMessage('Subject must be between 3 and 200 characters'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
];

// Lost & Found validators
export const createLostFoundValidator = [
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
  body('status').optional().isIn(['lost', 'found', 'claimed']).withMessage('Status must be lost, found, or claimed'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
  body('contactInfo').optional().trim().isLength({ max: 200 }).withMessage('Contact info must be less than 200 characters'),
];

export const updateLostFoundValidator = [
  param('id').notEmpty().withMessage('Lost & Found item ID is required'),
  body('title').optional().trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
  body('status').optional().isIn(['lost', 'found', 'claimed']).withMessage('Status must be lost, found, or claimed'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
  body('contactInfo').optional().trim().isLength({ max: 200 }).withMessage('Contact info must be less than 200 characters'),
];

// Student validators
export const createStudentValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('level').isIn(['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']).withMessage('Invalid level'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
];

export const updateStudentValidator = [
  param('id').notEmpty().withMessage('Student ID is required'),
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('level').optional().isIn(['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']).withMessage('Invalid level'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
];

// Admin validators
export const createAdminValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
  body('isSuperAdmin').optional().isBoolean().withMessage('isSuperAdmin must be a boolean'),
];

// Query validators
export const paginationValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
];

export const idParamValidator = [
  param('id').notEmpty().withMessage('ID is required'),
];

