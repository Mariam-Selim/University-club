<<<<<<< HEAD
# University Club Management System - Backend

This is the backend API for the University Club Management System built with Node.js, Express, TypeScript, Prisma, PostgreSQL, and Redis.

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Set up database:
```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

4. Start Redis (if not using Docker):
```bash
redis-server
```

5. Start development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Documentation

See the main README.md for complete API documentation.

## Testing

Use the provided Postman collection (`postman_collection.json`) to test the API.

Default test credentials (after seeding):
- **Super Admin**: admin@university.edu / password123
- **Admin**: admin2@university.edu / password123
- **Student**: student@university.edu / password123
=======
HEAD

# University Project – Proposal & Team
 The name: the loop


## Project Overview

A web platform for students and staff to access university info:

- Announcements & events  

- Lost & found items  

- Student activities & updates  



## Team & Roles

- **Mariam Ahmed / Team Manager**: Backend development + team coordination  

- **Renada Ahmed**: Backend development  

- **Eman Gaber || Ahmed Saad**: Frontend development  

- **Muhammed Abo ALhaggag**: Database management  

- **Mostafa Mahmoud**: Marketing, promotion & data collection


# University Club Management System - Backend API

A comprehensive backend API for managing a university club website with admin and student roles, built with Express.js, Prisma, Passport.js, and Redis.
>>>>>>> 29f34cdfe23d59f5482a77dd4d226f529d92cec7

## Project Structure

```
backend/
├── src/
HEAD
│   ├── config/          # Configuration files
│   ├── middleware/      # Express middleware
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding
└── uploads/             # Uploaded files
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data
- `npm run prisma:studio` - Open Prisma Studio

## Environment Variables

See `.env.example` for all required environment variables.

## Features

- ✅ JWT + Session authentication
- ✅ Google OAuth 2.0
- ✅ Role-based access control
- ✅ Redis caching
- ✅ File upload with image processing
- ✅ Email notifications
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling
- ✅ Logging

## License

MIT


│   ├── config/
│   │   ├── database.js      # Prisma client configuration
│   │   ├── redis.js         # Redis client configuration
│   │   ├── passport.js      # Passport strategies (Local & Google)
│   │   ├── rateLimit.js     # Rate limiting configuration
│   │   └── security.js      # Security headers and CORS
│   ├── middleware/
│   │   ├── auth.js          # Authentication middleware
│   │   ├── validation.js    # Validation rules and middleware
│   │   ├── errorHandler.js  # Error handling middleware
│   │   ├── xss.js           # XSS sanitization middleware
│   │   └── cache.js         # Cache middleware
│   ├── models/
│   │   └── index.js         # Database models (Prisma exports)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── studentController.js
│   │   ├── eventController.js
│   │   ├── announcementController.js
│   │   └── lostFoundController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── student.js
│   │   ├── event.js
│   │   ├── announcement.js
│   │   └── lostFound.js
│   ├── services/
│   │   ├── redisService.js  # Redis operations
│   │   ├── emailService.js  # Email service (placeholder)
│   │   └── cacheService.js  # Cache management
│   ├── utils/
│   │   ├── validators.js    # Validation rules re-export
│   │   ├── helpers.js       # Helper functions
│   │   └── logger.js        # Logging utility
│   ├── prisma/
│   │   └── schema.prisma    # Prisma schema definition
│   ├── app.js               # Express app configuration
│   └── server.js            # Server entry point
├── prisma/
│   └── seed.js              # Database seed script
├── .env
├── .env.example
├── package.json
└── README.md
```

## Features

-  **Authentication & Authorization**
  - Local authentication (Admin & Student)
  - Google OAuth2 authentication for students
  - Session-based authentication with Redis store
  - Role-based access control (Admin & Student)

-  **Security**
  - XSS protection with input sanitization
  - Rate limiting (general & authentication endpoints)
  - Helmet.js for security headers
  - CORS configuration
  - Password hashing with bcrypt

-  **Performance**
  - Redis caching for frequently accessed data
  - Optimized database queries with Prisma
  - Response caching middleware

-  **Database**
  - PostgreSQL database with Prisma ORM
  - Relationships: Admin → Events, Announcements, LostAndFound
  - Many-to-Many: Student ↔ Announcements

-  **API Endpoints**
  - Authentication (Register, Login, Logout, Google OAuth)
  - Admin CRUD operations
  - Student CRUD operations
  - Event CRUD operations
  - Announcement CRUD + Join/Leave functionality
  - Lost & Found CRUD operations

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Redis server
- Google OAuth2 credentials (for Google login)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd university-club-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/university_club?schema=public"

   # Server
   NODE_ENV=development
   PORT=5000
   SESSION_SECRET=your-super-secret-session-key-change-this-in-production

   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client (with schema path)
   npm run prisma:generate

   # Run database migrations
   npm run prisma:migrate
   ```

5. **Start Redis server**
   ```bash
   # On Windows (if using Redis for Windows)
   redis-server

   # On Linux/Mac
   sudo service redis-server start
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## Architecture

This project follows a **Model-View-Controller (MVC)** architecture pattern:

- **Models** (`src/models/`): Database access layer using Prisma
- **Controllers** (`src/controllers/`): Business logic and request handling
- **Routes** (`src/routes/`): Route definitions that use controllers
- **Services** (`src/services/`): Reusable business logic (cache, email, etc.)
- **Middleware** (`src/middleware/`): Request processing (auth, validation, etc.)
- **Config** (`src/config/`): Configuration files (database, Redis, Passport, etc.)
- **Utils** (`src/utils/`): Helper functions and utilities

## API Endpoints

### Authentication

- `POST /api/auth/admin/register` - Register a new admin (creates pending request, requires approval)
- `POST /api/auth/admin/login` - Admin login (only approved admins can login)
- `POST /api/auth/student/register` - Register a new student
- `POST /api/auth/student/login` - Student login
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Admins

- `GET /api/admins` - Get all admins (Admin only)
- `GET /api/admins/:id` - Get admin by ID (Admin only)
- `POST /api/admins` - Create admin (Admin only) - Creates approved admin directly
- `PUT /api/admins/:id` - Update admin (Admin only)
- `DELETE /api/admins/:id` - Delete admin (Admin only)
- `GET /api/admins/requests/pending` - Get all pending admin requests (Admin only)
- `POST /api/admins/requests/:requestId/approve` - Approve admin request (Admin only)
- `POST /api/admins/requests/:requestId/reject` - Reject admin request (Admin only)

### Students

- `GET /api/students` - Get all students (Admin only)
- `GET /api/students/:id` - Get student by ID (Authenticated)
- `POST /api/students` - Create student (Admin only)
- `PUT /api/students/:id` - Update student (Self or Admin)
- `DELETE /api/students/:id` - Delete student (Admin only)

### Events

- `GET /api/events` - Get all events (Public)
- `GET /api/events/:id` - Get event by ID (Public)
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Announcements

- `GET /api/announcements` - Get all announcements (Public)
- `GET /api/announcements/:id` - Get announcement by ID (Public)
- `POST /api/announcements` - Create announcement (Admin only)
- `PUT /api/announcements/:id` - Update announcement (Admin only)
- `DELETE /api/announcements/:id` - Delete announcement (Admin only)
- `POST /api/announcements/:id/join` - Join announcement (Student only)
- `DELETE /api/announcements/:id/leave` - Leave announcement (Student only)
- `GET /api/announcements/student/my-announcements` - Get student's announcements (Student only)

### Lost & Found

- `GET /api/lost-and-found` - Get all items (Public)
- `GET /api/lost-and-found/:id` - Get item by ID (Public)
- `POST /api/lost-and-found` - Create item (Admin only)
- `PUT /api/lost-and-found/:id` - Update item (Admin only)
- `DELETE /api/lost-and-found/:id` - Delete item (Admin only)

## Security Features

1. **XSS Protection**: All user inputs are sanitized before processing
2. **Rate Limiting**: 
   - General endpoints: 100 requests per 15 minutes
   - Authentication endpoints: 5 requests per 15 minutes
3. **Session Management**: Secure sessions stored in Redis with HTTP-only cookies
4. **Password Hashing**: Bcrypt with salt rounds
5. **Input Validation**: Express-validator for all inputs
6. **CORS**: Configurable CORS for frontend integration
7. **Security Headers**: Helmet.js for additional security headers

## Caching Strategy

- Events, Announcements, Lost & Found: Cached for 10 minutes
- User profiles: Cached for 5 minutes
- Cache invalidation on create/update/delete operations

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Generate Prisma Client (with schema path)
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Seed database
npm run prisma:seed
```

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a strong `SESSION_SECRET`
3. Configure proper CORS origins
4. Set up HTTPS
5. Use environment variables for all sensitive data
6. Enable Redis persistence
7. Set up proper logging and monitoring

## License

ISC
backend-renada
29f34cdfe23d59f5482a77dd4d226f529d92cec7
