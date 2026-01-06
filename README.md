# University Club Management System

A comprehensive backend system for managing university clubs with features including event management, announcements, photo gallery, team management, contact messages, and lost & found items.

## 🚀 Features

- **Authentication System**
  - JWT + Session-based authentication
  - Google OAuth 2.0 for students
  - Role-based access control (Admin, Student, Public)
  - Redis for sessions and caching

- **Core Features**
  - Event management with categories
  - Announcement system with student subscriptions
  - Photo gallery with categories
  - Team member management
  - Contact message system
  - Lost & Found items with status tracking
  - File upload for images
  - Email notifications

- **Technical Features**
  - Redis caching with smart invalidation
  - Express with comprehensive middleware
  - Input validation with express-validator
  - Error handling middleware
  - Logging with Winston
  - Rate limiting and security headers
  - Docker support

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Redis (v6 or higher)
- Docker and Docker Compose (optional)

## 🛠️ Installation

### Option 1: Docker Setup (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd university-club-system
```

2. Copy environment file:
```bash
cp backend/.env.example backend/.env
```

3. Update `backend/.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/clubdb"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

4. Start services:
```bash
docker-compose up -d
```

5. Run migrations and seed:
```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
```

6. Start the server:
```bash
npm run dev
```

### Option 2: Manual Setup

1. **Install PostgreSQL and Redis**
   - PostgreSQL: https://www.postgresql.org/download/
   - Redis: https://redis.io/download/

2. **Setup Database**
```bash
createdb club_management
```

3. **Install Dependencies**
```bash
cd backend
npm install
```

4. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your settings
```

5. **Setup Prisma**
```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

6. **Start Redis**
```bash
redis-server
```

7. **Run Development Server**
```bash
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/club_management?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:5000/api/auth/google/callback"

# Session
SESSION_SECRET="your-session-secret-key"

# Email (Nodemailer)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="noreply@university-club.com"

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:5173"
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/student/register` - Register a new student
- `POST /api/auth/admin/register` - Request admin access
- `POST /api/auth/student/login` - Student login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Admin Endpoints (Require Admin Auth)

- `GET /api/admins` - Get all admins
- `POST /api/admins` - Create admin (super admin only)
- `GET /api/admins/requests/pending` - Get pending admin requests
- `POST /api/admins/requests/:id/approve` - Approve admin request
- `POST /api/admins/requests/:id/reject` - Reject admin request

### Student Endpoints

- `GET /api/students` - Get all students (admin only)
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student (admin only)
- `GET /api/students/:id/announcements` - Get student's announcements

### Event Endpoints

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Announcement Endpoints

- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get announcement by ID
- `POST /api/announcements` - Create announcement (admin only)
- `PUT /api/announcements/:id` - Update announcement (admin only)
- `DELETE /api/announcements/:id` - Delete announcement (admin only)
- `POST /api/announcements/:id/join` - Join announcement (student)
- `POST /api/announcements/:id/leave` - Leave announcement (student)

### Gallery Endpoints

- `GET /api/gallery` - Get all gallery photos
- `GET /api/gallery/:id` - Get photo by ID
- `POST /api/gallery` - Upload photo (admin only)
- `DELETE /api/gallery/:id` - Delete photo (admin only)

### Team Endpoints

- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get team member by ID
- `POST /api/team` - Add team member (admin only)
- `PUT /api/team/:id` - Update team member (admin only)
- `DELETE /api/team/:id` - Delete team member (admin only)

### Contact Endpoints

- `GET /api/contact` - Get all messages (admin only)
- `GET /api/contact/:id` - Get message by ID (admin only)
- `POST /api/contact` - Send contact message (public)
- `DELETE /api/contact/:id` - Delete message (admin only)

### Lost & Found Endpoints

- `GET /api/lost-found` - Get all items
- `GET /api/lost-found/:id` - Get item by ID
- `POST /api/lost-found` - Create item (admin only)
- `PUT /api/lost-found/:id` - Update item (admin only)
- `DELETE /api/lost-found/:id` - Delete item (admin only)

## 🧪 Testing

### Default Test Credentials

After seeding:
- **Admin**: admin@university.edu / password123
- **Student**: student@university.edu / password123

### Using Postman

Import the `postman_collection.json` file into Postman for API testing.

## 📁 Project Structure

```
backend/
├── src/
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
├── uploads/             # Uploaded files
└── docker/              # Docker configuration
```

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Helmet security headers
- Input validation
- XSS protection
- SQL injection prevention (Prisma)

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@university-club.com or create an issue in the repository.

