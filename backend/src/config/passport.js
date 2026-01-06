import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import prisma from './database.js';
import logger from '../utils/logger.js';

// Local Strategy for Admin
passport.use(
  'admin-local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const admin = await prisma.admin.findUnique({
          where: { email },
        });

        if (!admin) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, admin);
      } catch (error) {
        logger.error('Admin login error:', error);
        return done(error);
      }
    }
  )
);

// Local Strategy for Student
passport.use(
  'student-local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const student = await prisma.student.findUnique({
          where: { email },
        });

        if (!student) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, student);
      } catch (error) {
        logger.error('Student login error:', error);
        return done(error);
      }
    }
  )
);

// Google OAuth Strategy for Students
passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, displayName, emails } = profile;
        const email = emails?.[0]?.value;

        if (!email) {
          return done(new Error('No email found in Google profile'));
        }

        // Find or create student
        let student = await prisma.student.findUnique({
          where: { googleId: id },
        });

        if (!student) {
          // Check if student exists with this email
          const existingStudent = await prisma.student.findUnique({
            where: { email },
          });

          if (existingStudent) {
            // Update existing student with Google ID
            student = await prisma.student.update({
              where: { email },
              data: { googleId: id, isVerified: true },
            });
          } else {
            // Create new student
            student = await prisma.student.create({
              data: {
                email,
                name: displayName,
                googleId: id,
                password: '', // No password for OAuth users
                level: 'Freshman', // Default, can be updated later
                isVerified: true,
              },
            });
          }
        }

        return done(null, student);
      } catch (error) {
        logger.error('Google OAuth error:', error);
        return done(error);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, { id: user.id, type: user.isSuperAdmin !== undefined ? 'admin' : 'student' });
});

// Deserialize user from session
passport.deserializeUser(async (serialized, done) => {
  try {
    if (serialized.type === 'admin') {
      const admin = await prisma.admin.findUnique({ where: { id: serialized.id } });
      done(null, admin);
    } else {
      const student = await prisma.student.findUnique({ where: { id: serialized.id } });
      done(null, student);
    }
  } catch (error) {
    done(error);
  }
});

export default passport;

