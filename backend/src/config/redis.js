import { createClient } from 'redis';
import logger from '../utils/logger.js';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  logger.info('Redis Client Connected');
});

// Connect to Redis
const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      logger.info('Redis connection established');
    }
  } catch (error) {
    logger.error('Redis connection error:', error);
    // Continue without Redis - fallback to memory cache
  }
};

// Initialize connection
connectRedis();

export default redisClient;

