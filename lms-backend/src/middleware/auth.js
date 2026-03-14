/**
 * Authentication & authorization middleware 
 */

import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Authorization denied, no token provided.',
            });
        }
        // Verify token
        const decoded = verifyToken(token);
        // GEt user from database
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found, authorization denied.',
            });
        }
        if (user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'User account is deactivated',
            });
        }
        // Attach user to request
        req.user = user;
        next();
    }catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token', 
        });
    }
};

/**
 * check if user has required role
 */
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.user.role} is not authorized to access this resource`,
            });
        }
        next();
    };
};

export const optionalAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (token)
        {
            const decoded = verifyToken(token);
            const user = await User.findById(decoded.id).select('password')
            if(user && user .isActive){
                req.user=user;
            }
        }
        next();
    } catch(error){
        next();
    }
};