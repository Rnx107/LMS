/**
 * Redis Client Configuration
 * 
 * Redis provides:
 * - In-memory data store
 * - Caching layer
 * - Session storage
 */

import { createClient } from 'redis';
import { env } from './env.js';

const client = createClient({
  url: env.redis.url,
});

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

client.on('connect', () => {
  console.log('Redis client connected');
});

/**
 * Connect to Redis
 */
export const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Redis connected successfully');
  } catch (error) {
    console.error('Redis connection failed:', error.message);
  }
};

/**
 * Disconnect from Redis
 */
export const disconnectRedis = async () => {
  try {
    await client.disconnect();
    console.log('Redis disconnected');
  } catch (error) {
    console.error('Error disconnecting Redis:', error);
  }
};

/**
 * Get value from cache
 */
export const getCache = async (key) => {
  try {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
};

/**
 * Set value in cache
 */
export const setCache = async (key, value, ttl = 3600) => {
  try {
    await client.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error('Cache set error:', error);
  }
};

/**
 * Delete value from cache
 */
export const deleteCache = async (key) => {
  try {
    await client.del(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
};

/**
 * Delete multiple keys by pattern
 */
export const deleteCachePattern = async (pattern) => {
  try {
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(keys);
    }
  } catch (error) {
    console.error('Cache pattern delete error:', error);
  }
};

/**
 * Check if cache is connected
 */
export const isCacheConnected = () => {
  return client.isReady;
};

export default client;
