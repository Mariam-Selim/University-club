import redisService from './redisService.js';
import logger from '../utils/logger.js';

class CacheService {
  constructor() {
    this.memoryCache = new Map();
    // Clean expired entries every minute
    setInterval(() => {
      this.cleanMemoryCache();
    }, 60000);
  }

  cleanMemoryCache() {
    const now = Date.now();
    for (const [key, value] of this.memoryCache.entries()) {
      if (value.expires < now) {
        this.memoryCache.delete(key);
      }
    }
  }

  async get(key) {
    try {
      // Try Redis first
      const redisValue = await redisService.get(key);
      if (redisValue) {
        return JSON.parse(redisValue);
      }

      // Try memory cache
      const memoryValue = this.memoryCache.get(key);
      if (memoryValue && memoryValue.expires > Date.now()) {
        return memoryValue.data;
      }

      return null;
    } catch (error) {
      logger.error(`Cache GET error for key ${key}:`, error);
      return null;
    }
  }

  async set(key, value, ttl = 300) {
    try {
      const serialized = JSON.stringify(value);

      // Store in Redis
      await redisService.set(key, serialized, ttl);

      // Store in memory cache
      this.memoryCache.set(key, {
        data: value,
        expires: Date.now() + ttl * 1000,
      });

      return true;
    } catch (error) {
      logger.error(`Cache SET error for key ${key}:`, error);
      return false;
    }
  }

  async delete(key) {
    try {
      await redisService.del(key);
      this.memoryCache.delete(key);
      return true;
    } catch (error) {
      logger.error(`Cache DELETE error for key ${key}:`, error);
      return false;
    }
  }

  async invalidatePattern(pattern) {
    try {
      const count = await redisService.flushPattern(`cache:${pattern}*`);

      // Invalidate memory cache
      for (const key of this.memoryCache.keys()) {
        if (key.includes(pattern)) {
          this.memoryCache.delete(key);
        }
      }

      return count;
    } catch (error) {
      logger.error(`Cache INVALIDATE pattern error for ${pattern}:`, error);
      return 0;
    }
  }
}

export default new CacheService();

