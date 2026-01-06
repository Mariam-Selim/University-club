import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import RedisStore from 'connect-redis';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
import './config/passport.js';
import redisClient from './config/redis.js';
import { securityMiddleware } from './config/security.js';
import { apiLimiter } from './config/rateLimit.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';
import { transporter } from './config/email.js';

// Import routes
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import studentRoutes from './routes/student.js';
import eventRoutes from './routes/event.js';
import announcementRoutes from './routes/announcement.js';
import galleryRoutes from './routes/gallery.js';
import teamRoutes from './routes/team.js';
import contactRoutes from './routes/contact.js';
import lostFoundRoutes from './routes/lostFound.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security middleware
app.use(securityMiddleware);

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration
app.use(
  session({
    store: redisClient.isOpen
      ? new RedisStore({
          client: redisClient,
          prefix: 'session:',
        })
      : undefined,
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Rate limiting
app.use('/api', apiLimiter);

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/lost-found', lostFoundRoutes);

app.get("/api/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_NOTIFICATION_EMAIL,
      subject: "Test Email",
      html: "<h1>Email service is working 🎉</h1>",
    });
    res.json({ message: "Test email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "club-backend",
    timestamp: new Date(),
  });
});


// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);


export default app;

