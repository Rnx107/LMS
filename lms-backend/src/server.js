/**
 * Express Server Entry Point
 * 
 * Configures Express with:
 * - Security middleware (Helmet, Rate Limiting)
 * - CORS for frontend communication
 * - Request logging
 * - Error handling
 * - API routes
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import path from 'path';
//import materialRoutes from './routes/material.routes.js';

import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { connectRedis } from './config/redis.js';
//import { configureCloudinary } from './config/cloudinary.js';
import { configurePassport } from './config/passport.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
//import courseRoutes from './routes/course.routes.js';
//import enrollmentRoutes from './routes/enrollment.routes.js';
//import uploadRoutes from './routes/upload.routes.js';
import healthRoutes from './routes/health.routes.js';

// Initialize Express app
const app = express();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

//
app.use(cors({
  origin: env.nodeEnv === 'production' 
    ? [env.frontend.url] 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://localhost', 'http://localhost:80'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.nodeEnv === 'production' ? 100 : 1000,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => env.nodeEnv !== 'production', // Skip rate limiting in development
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  skipSuccessfulRequests: true,
  skip: (req) => env.nodeEnv !== 'production', // Skip rate limiting in development
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

// Passport initialization
app.use(passport.initialize());
configurePassport();

// Health check endpoint
app.use('/health', healthRoutes);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
//app.use('/api/courses', courseRoutes);
//app.use('/api/enrollments', enrollmentRoutes);
//app.use('/api/upload', uploadRoutes);
//app.use('/api/uploads', materialRoutes);

// Serve uploaded files statically
//app.use('/uploads', express.static(path.join(process.cwd(), 'uploads', 'materials'))); 

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDatabase();
    await connectRedis();
    //configureCloudinary();
    
    app.listen(env.port, () => {
      console.log(`
========================================
🚀 Server running on port ${env.port}
📊 Environment: ${env.nodeEnv}
🔗 API URL: http://localhost:${env.port}/api
========================================
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
