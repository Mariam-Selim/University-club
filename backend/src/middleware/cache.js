import redisClient from '../config/redis.js';
import logger from '../utils/logger.js';

// In-memory cache fallback
const memoryCache = new Map();

// Clean expired entries from memory cache
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryCache.entries()) {
    if (value.expires < now) {
      memoryCache.delete(key);
    }
  }
}, 60000); // Clean every minute

export const cacheMiddleware = (options = {}) => {
  const { ttl = 300, keyGenerator } = options; // Default 5 minutes

  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const cacheKey = keyGenerator
      ? keyGenerator(req)
      : `cache:${req.originalUrl}:${JSON.stringify(req.query)}`;

    try {
      // Try Redis first
      if (redisClient.isOpen) {
        const cached = await redisClient.get(cacheKey);
        if (cached) {
          logger.debug(`Cache hit (Redis): ${cacheKey}`);
          return res.json(JSON.parse(cached));
        }
      }

      // Try memory cache
      const memoryCached = memoryCache.get(cacheKey);
      if (memoryCached && memoryCached.expires > Date.now()) {
        logger.debug(`Cache hit (Memory): ${cacheKey}`);
        return res.json(memoryCached.data);
      }

      // Cache miss - override res.json to cache the response
      const originalJson = res.json.bind(res);
      res.json = function (body) {
        const data = JSON.stringify(body);

        // Store in Redis
        if (redisClient.isOpen) {
          redisClient.setEx(cacheKey, ttl, data).catch((err) => {
            logger.error('Redis cache set error:', err);
          });
        }

        // Store in memory cache
        memoryCache.set(cacheKey, {
          data: body,
          expires: Date.now() + ttl * 1000,
        });

        return originalJson(body);
      };

      next();
    } catch (error) {
      logger.error('Cache middleware error:', error);
      next();
    }
  };
};

// Cache invalidation helper
export const invalidateCache = async (pattern) => {
  try {
    if (redisClient.isOpen) {
      const keys = await redisClient.keys(`cache:${pattern}*`);
      if (keys.length > 0) {
        await redisClient.del(keys);
        logger.debug(`Invalidated ${keys.length} cache keys matching: ${pattern}`);
      }
    }

    // Invalidate memory cache
    for (const key of memoryCache.keys()) {
      if (key.includes(pattern)) {
        memoryCache.delete(key);
      }
    }
  } catch (error) {
    logger.error('Cache invalidation error:', error);
  }
};

// Specific cache configurations
export const cacheConfigs = {
  events: { ttl: 600 }, // 10 minutes
  announcements: { ttl: 300 }, // 5 minutes
  gallery: { ttl: 1800 }, // 30 minutes
  team: { ttl: 3600 }, // 1 hour
  students: { ttl: 300 }, // 5 minutes
  lostFound: { ttl: 600 }, // 10 minutes
};

