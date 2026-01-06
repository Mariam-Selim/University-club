import redisClient from '../config/redis.js';
import logger from '../utils/logger.js';

class RedisService {
  async get(key) {
    try {
      if (!redisClient.isOpen) {
        return null;
      }
      return await redisClient.get(key);
    } catch (error) {
      logger.error(`Redis GET error for key ${key}:`, error);
      return null;
    }
  }

  async set(key, value, ttl) {
    try {
      if (!redisClient.isOpen) {
        return false;
      }
      if (ttl) {
        await redisClient.setEx(key, ttl, value);
      } else {
        await redisClient.set(key, value);
      }
      return true;
    } catch (error) {
      logger.error(`Redis SET error for key ${key}:`, error);
      return false;
    }
  }

  async del(key) {
    try {
      if (!redisClient.isOpen) {
        return false;
      }
      await redisClient.del(key);
      return true;
    } catch (error) {
      logger.error(`Redis DEL error for key ${key}:`, error);
      return false;
    }
  }

  async exists(key) {
    try {
      if (!redisClient.isOpen) {
        return false;
      }
      const result = await redisClient.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`Redis EXISTS error for key ${key}:`, error);
      return false;
    }
  }

  async keys(pattern) {
    try {
      if (!redisClient.isOpen) {
        return [];
      }
      return await redisClient.keys(pattern);
    } catch (error) {
      logger.error(`Redis KEYS error for pattern ${pattern}:`, error);
      return [];
    }
  }

  async flushPattern(pattern) {
    try {
      if (!redisClient.isOpen) {
        return 0;
      }
      const keys = await this.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
      return keys.length;
    } catch (error) {
      logger.error(`Redis FLUSH pattern error for ${pattern}:`, error);
      return 0;
    }
  }
}

export default new RedisService();

