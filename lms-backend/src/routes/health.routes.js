/**
 * Health Check Routes
 */

import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

router.get('/detailed', async (req, res) => {
  const checks = {
    database: { status: 'unknown' },
    memory: { status: 'unknown' },
  };

  let overallStatus = 'OK';

  try {
    const dbState = mongoose.connection.readyState;
    checks.database.status = dbState === 1 ? 'OK' : 'ERROR';
    checks.database.state = dbState;
  } catch (error) {
    checks.database.status = 'ERROR';
    checks.database.error = error.message;
    overallStatus = 'ERROR';
  }

  const usedMemory = process.memoryUsage();
  const memoryThreshold = 500 * 1024 * 1024;
  checks.memory.status = usedMemory.heapUsed < memoryThreshold ? 'OK' : 'WARNING';
  checks.memory.used = Math.round(usedMemory.heapUsed / 1024 / 1024) + 'MB';

  const statusCode = overallStatus === 'OK' ? 200 : 503;

  res.status(statusCode).json({
    status: overallStatus,
    timestamp: new Date().toISOString(),
    checks,
  });
});

export default router;
