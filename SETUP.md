# Quick Setup Guide

## 🚀 Quick Start (Docker)

1. **Clone/Navigate to project:**
```bash
cd university-club-system
```

2. **Copy environment file:**
```bash
cp backend/.env.example backend/.env
```

3. **Edit `backend/.env`** with your settings (at minimum, update JWT_SECRET and SESSION_SECRET)

4. **Start services:**
```bash
docker-compose up -d
```

5. **Setup database:**
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

6. **Start server:**
```bash
npm run dev
```

Server will be running on `http://localhost:5000`

## 📝 Manual Setup

### 1. Install PostgreSQL and Redis

**PostgreSQL:**
- Download from https://www.postgresql.org/download/
- Create database: `createdb club_management`

**Redis:**
- Download from https://redis.io/download/
- Start: `redis-server`

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database and Redis URLs
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### 3. Environment Variables

Minimum required in `backend/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/club_management"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key-here"
SESSION_SECRET="your-session-secret-here"
```

For full features, also configure:
- Google OAuth (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
- Email service (EMAIL_HOST, EMAIL_USER, EMAIL_PASS)

## 🧪 Testing

1. **Import Postman Collection:**
   - Open Postman
   - Import `backend/postman_collection.json`

2. **Test Authentication:**
   - Use "Student Login" or "Admin Login"
   - Tokens will be automatically saved to collection variables

3. **Default Credentials (after seeding):**
   - Super Admin: `admin@university.edu` / `password123`
   - Admin: `admin2@university.edu` / `password123`
   - Student: `student@university.edu` / `password123`

## 📚 API Documentation

See `README.md` for complete API documentation.

## 🐛 Troubleshooting

**Database connection error:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env

**Redis connection error:**
- Ensure Redis is running
- Check REDIS_URL in .env
- System will continue with memory cache fallback

**Port already in use:**
- Change PORT in .env
- Or stop the service using port 5000

**Prisma errors:**
- Run `npx prisma generate` after schema changes
- Run `npx prisma migrate dev` to apply migrations

## 📦 Project Structure

```
university-club-system/
├── backend/              # Backend API
│   ├── src/             # Source code
│   ├── prisma/          # Database schema & migrations
│   ├── uploads/         # Uploaded files
│   └── docker/          # Docker configuration
├── docker-compose.yml   # Docker services
└── README.md            # Full documentation
```

## ✅ Next Steps

1. Configure Google OAuth (optional)
2. Configure email service (optional)
3. Customize database seed data
4. Deploy to production

## 📧 Support

For issues or questions, check the main README.md or create an issue in the repository.

