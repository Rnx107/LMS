/**
 * JWT Utility Functions
 * 
 * Handles token generation and verification
 */

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateToken = (payload) => {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.refreshExpiresIn,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.jwt.secret);
};

export const generateTokens = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  return {
    accessToken: generateToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};
