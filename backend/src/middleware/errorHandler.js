import logger from '../utils/logger.js';

export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    logger.error(`AppError: ${err.message}`, { statusCode: err.statusCode, path: req.path });
    return res.status(err.statusCode).json({
      error: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err;
    if (prismaError.code === 'P2002') {
      logger.error('Duplicate entry error:', prismaError);
      return res.status(409).json({
        error: 'A record with this information already exists',
      });
    }
    if (prismaError.code === 'P2025') {
      logger.error('Record not found:', prismaError);
      return res.status(404).json({
        error: 'Record not found',
      });
    }
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    logger.error('JWT error:', err);
    return res.status(401).json({
      error: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    logger.error('JWT expired:', err);
    return res.status(401).json({
      error: 'Token expired',
    });
  }

  // Default error
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// 404 handler
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
  });
};

