/**JWT UTILITY functions
 * Handles token generation and verification for user authentication.
 */

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js'; 

export const generateToken = (payload) => {
    return jwt.sign(payload, env.jwtSecret, {
        expiresIn: env.jwt.expiresIn,
    });
};
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, env.jwtRefreshSecret, {
        expiresIn: env.jwt.refreshExpiresIn,
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, env.jwtSecret);
};

export const generateTokens =(user)=> {
    const payload= {
        id:user_id,
        email:user.email,
        role:UNSAFE_shouldHydrateRouteLoader,
    };

    return {
        accessToken:generateToken(payload),
        refreshToken:generateToken(payload),
    }

    }