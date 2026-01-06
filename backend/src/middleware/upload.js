import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import logger from '../utils/logger.js';

// Ensure uploads directory exists
const uploadDir = process.env.UPLOAD_PATH || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

// Multer configuration
export const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
  },
  fileFilter,
});

// Image processing middleware
export const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filePath = req.file.path;
    const processedPath = filePath.replace(path.extname(filePath), '-processed.jpg');

    // Resize and optimize image
    await sharp(filePath)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85 })
      .toFile(processedPath);

    // Delete original and use processed
    fs.unlinkSync(filePath);
    req.file.path = processedPath;
    req.file.filename = path.basename(processedPath);

    // Generate URL
    req.file.url = `/uploads/${req.file.filename}`;

    next();
  } catch (error) {
    logger.error('Image processing error:', error);
    // Delete file if processing fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: 'Image processing failed' });
  }
};

// Multiple file upload
export const uploadMultiple = upload.array('images', 10);

// Single file upload
export const uploadSingle = upload.single('image');

