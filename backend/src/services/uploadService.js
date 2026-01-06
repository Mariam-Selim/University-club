import fs from 'fs';
import path from 'path';
import logger from '../utils/logger.js';

class UploadService {
  constructor() {
    this.uploadDir = process.env.UPLOAD_PATH || './uploads';
    this.ensureDirectoryExists();
  }

  ensureDirectoryExists() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  getFilePath(filename) {
    return path.join(this.uploadDir, filename);
  }

  getFileUrl(filename) {
    return `/uploads/${filename}`;
  }

  async deleteFile(filename) {
    try {
      const filePath = this.getFilePath(filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        logger.info(`File deleted: ${filename}`);
        return true;
      }
      return false;
    } catch (error) {
      logger.error(`Error deleting file ${filename}:`, error);
      return false;
    }
  }

  async fileExists(filename) {
    const filePath = this.getFilePath(filename);
    return fs.existsSync(filePath);
  }

  getFileSize(filename) {
    try {
      const filePath = this.getFilePath(filename);
      if (fs.existsSync(filePath)) {
        return fs.statSync(filePath).size;
      }
      return 0;
    } catch (error) {
      logger.error(`Error getting file size for ${filename}:`, error);
      return 0;
    }
  }
}

export default new UploadService();

