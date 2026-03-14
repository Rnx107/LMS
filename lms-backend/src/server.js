/* 
Express Server Entry Point
Configure Express with
    -Security middle(Helmet, Rate Limitting
    -CORS for front end communication
    -Request logging
    -Error handling
    -API routes
    ) */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import passport from "passport";

import { env } from "./config/env.js";
import {connectDatabase} from "./config/database.js";
import {configureCloudinary} from "./config/cloudinary.js";
import {configurePassport} from "./config/passport.js";
import {errorHandler} from "./middleware/errorHandler.js";

//import routes
import apiRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import updateRoutes from "./routes/update.routes.js";

//initialize express app
const app=express();

//security middleware
app.use(helmet({
    contentSecurityPolicy:{
        directives: {
        defaultSrc:["'self'"],
        styleSrc:["self", "'unsafe-inline'"],
        scriptSrc:["self"],
        imgSrc:["self", "data:", "https:"],}
    },
}));

//CORS- Allow frontend to communicate with API
app.use(cors({
    origin: env.nodeEnv === "production" ? ["https://yourdomain.com"] :
    ["http://localhost:5173", "http://localhost:3000"],
    credentials:true,
    methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders:['Content-Type', 'Authorization'],
}));

//Rate Limiting - Prevents brute force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //Limit each IP to 100 requests per window
    message:'Too many requests from this IP, please try again later.',
    standardHeaders:true,
    legacyHeaders:false,

});

app.use('/api/', limiter);

//rate limiter for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 5, //5 attempts per 15 minutes
    skipSuccessfulRequests:true,
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

//Request parsing
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true, limit:'10mb'}));

//Request logging
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

//Passpert initialization
app.use(passport.initialize());
configurePassport();

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'success',
        timestamp: new Date().toISOString(),
        environment: env.nodeEnv,
    });
});

//API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/upload', uploadRoutes);

//404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

//Global Error Handler
app.use(errorHandler);


//Start Server
const startServer= async() =>{
    try {
        //Connect to database
        await connectDatabase();
        //Configure cloudinary
        configureCloudinary();
        //Start listening
        app.listen(env.port, () => {
            console.log(`Server running on port ${env.port}/api`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
export default app;