/* 
    Global Error Handler Middleware
    Catches all errrors and formats them consistently

*/

import{env} from "../config/env.js";

export const errorHandler = (err, req, res, next) => {
    let error = { ...err};
    error.message = err.message;
    console.error("Error:", err);

    //Mongoose bad ObjectId
    if (err.name == 'CastError'){
        error.message = 'Resource not found';
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }

    //Mongoose duplicate key
    if (err.code === 11000){
        const field = Object.keys(err.keyValue)[0];
        error.message = 'Duplicate key found';
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    //Mongoose validate error
    if (err.name === 'ValidationError'){
        const messages = Object.values(err.errors).map(val => val.message);
        error.message = messages.join(', ');
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    //JWT errors
    if (err.name === 'JSONWebTokenError'){
        return res.status(401).json({
            success: false,
            message: 'Invalid Exception',
        });
    }

    if (err.name === 'TokenExpiredError'){
        return res.status(401).json({
            success: false,
            message: 'Token Expired',
        });
    }

    //Default error response
    res.status (err.statusCode || 500).json({
        success: false,
        message: error.message || 'Server error',
        ...(env.nodeEnv === 'development' && {stack: err.stack}),
    });
}; 