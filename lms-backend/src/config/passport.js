/**
 * Passport Configuration for Google OAuth
 * 
 * Implements OAuth2 client flow
 */

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from './env.js';
import User from '../models/User.js';

export const configurePassport = () => {
  if (!env.google.clientId) {
    console.log('Google OAuth not configured');
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.google.clientId,
        clientSecret: env.google.clientSecret,
        callbackURL: env.google.callbackUrl,
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          
          let user = await User.findOne({ email });
          
          if (user) {
            if (!user.googleId) {
              user.googleId = profile.id;
              await user.save();
            }
            return done(null, user);
          }
          
          user = await User.create({
            googleId: profile.id,
            email,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            avatar: profile.photos[0]?.value,
            emailVerified: true,
            password: Math.random().toString(36).slice(-16),
          });
          
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};
