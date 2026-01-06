# API Documentation for Frontend

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Or as a cookie:
```
Cookie: token=<token>
```

---

## 📋 Table of Contents

1. [Authentication Endpoints](#authentication-endpoints)
2. [Admin Endpoints](#admin-endpoints)
3. [Student Endpoints](#student-endpoints)
4. [Event Endpoints](#event-endpoints)
5. [Announcement Endpoints](#announcement-endpoints)
6. [Gallery Endpoints](#gallery-endpoints)
7. [Team Endpoints](#team-endpoints)
8. [Contact Endpoints](#contact-endpoints)
9. [Lost & Found Endpoints](#lost--found-endpoints)
10. [Error Responses](#error-responses)

---

## Authentication Endpoints

### 1. Student Registration
**POST** `/auth/student/register`

**Public Endpoint**

**Request Body:**
```json
{
  "email": "student@university.edu",
  "name": "John Doe",
  "password": "password123",
  "level": "Sophomore",
  "phone": "+1234567890"
}
```

**Response (201):**
```json
{
  "message": "Student registered successfully",
  "student": {
    "id": "clx123...",
    "email": "student@university.edu",
    "name": "John Doe",
    "level": "Sophomore",
    "phone": "+1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Admin Registration Request
**POST** `/auth/admin/register`

**Public Endpoint**

**Request Body:**
```json
{
  "email": "newadmin@university.edu",
  "name": "New Admin",
  "phone": "+1234567890",
  "message": "I would like to become an admin"
}
```

**Response (201):**
```json
{
  "message": "Admin access request submitted successfully",
  "request": {
    "id": "clx123...",
    "email": "newadmin@university.edu",
    "name": "New Admin",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 3. Student Login
**POST** `/auth/student/login`

**Public Endpoint**

**Request Body:**
```json
{
  "email": "student@university.edu",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "student": {
    "id": "clx123...",
    "email": "student@university.edu",
    "name": "John Doe",
    "level": "Sophomore"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 4. Admin Login
**POST** `/auth/admin/login`

**Public Endpoint**

**Request Body:**
```json
{
  "email": "admin@university.edu",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "admin": {
    "id": "clx123...",
    "email": "admin@university.edu",
    "name": "Super Admin",
    "isSuperAdmin": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 5. Google OAuth
**GET** `/auth/google`

**Public Endpoint**

Redirects to Google OAuth consent screen.

**Callback URL:** `/auth/google/callback`

After successful authentication, redirects to:
```
{FRONTEND_URL}/auth/callback?token={jwt_token}
```

---

### 6. Get Current User
**GET** `/auth/me`

**Protected Endpoint** (Requires token)

**Response (200):**
```json
{
  "user": {
    "id": "clx123...",
    "email": "student@university.edu",
    "name": "John Doe",
    "level": "Sophomore",
    "phone": "+1234567890",
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "type": "student"
}
```

---

### 7. Logout
**POST** `/auth/logout`

**Public Endpoint**

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

**Note:** In JWT-based systems, logout is handled client-side by removing the token.

---

## Admin Endpoints

### 1. Get All Admins
**GET** `/admins?page=1&limit=10`

**Protected Endpoint** (Admin only)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx123...",
      "email": "admin@university.edu",
      "name": "Super Admin",
      "phone": "+1234567890",
      "isSuperAdmin": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

---

### 2. Get Pending Admin Requests
**GET** `/admins/requests/pending`

**Protected Endpoint** (Admin only)

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx123...",
      "email": "newadmin@university.edu",
      "name": "New Admin",
      "status": "pending",
      "requestedBy": {
        "id": "clx456...",
        "name": "Super Admin",
        "email": "admin@university.edu"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 3. Approve Admin Request
**POST** `/admins/requests/:id/approve`

**Protected Endpoint** (Super Admin only)

**Response (200):**
```json
{
  "message": "Admin request approved successfully",
  "admin": {
    "id": "clx789...",
    "email": "newadmin@university.edu",
    "name": "New Admin"
  },
  "tempPassword": "randompassword123"
}
```

---

### 4. Reject Admin Request
**POST** `/admins/requests/:id/reject`

**Protected Endpoint** (Super Admin only)

**Response (200):**
```json
{
  "message": "Admin request rejected successfully"
}
```

---

### 5. Create Admin
**POST** `/admins`

**Protected Endpoint** (Super Admin only)

**Request Body:**
```json
{
  "email": "newadmin@university.edu",
  "name": "New Admin",
  "password": "password123",
  "phone": "+1234567890",
  "isSuperAdmin": false
}
```

**Response (201):**
```json
{
  "message": "Admin created successfully",
  "admin": {
    "id": "clx123...",
    "email": "newadmin@university.edu",
    "name": "New Admin",
    "isSuperAdmin": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Student Endpoints

### 1. Get All Students
**GET** `/students?page=1&limit=10`

**Protected Endpoint** (Admin only)

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx123...",
      "email": "student@university.edu",
      "name": "John Doe",
      "level": "Sophomore",
      "phone": "+1234567890",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

### 2. Get Student by ID
**GET** `/students/:id`

**Protected Endpoint** (Student can view own profile, Admin can view any)

**Response (200):**
```json
{
  "data": {
    "id": "clx123...",
    "email": "student@university.edu",
    "name": "John Doe",
    "level": "Sophomore",
    "phone": "+1234567890",
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 3. Create Student
**POST** `/students`

**Protected Endpoint** (Admin only)

**Request Body:**
```json
{
  "email": "newstudent@university.edu",
  "name": "Jane Smith",
  "password": "password123",
  "level": "Freshman",
  "phone": "+1234567890"
}
```

**Response (201):**
```json
{
  "message": "Student created successfully",
  "student": {
    "id": "clx123...",
    "email": "newstudent@university.edu",
    "name": "Jane Smith",
    "level": "Freshman",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 4. Get Student's Announcements
**GET** `/students/:id/announcements`

**Protected Endpoint** (Student can view own, Admin can view any)

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx456...",
      "title": "Club Meeting",
      "content": "Meeting this Friday",
      "joinedAt": "2024-01-01T00:00:00.000Z",
      "admin": {
        "id": "clx789...",
        "name": "Admin Name",
        "email": "admin@university.edu"
      }
    }
  ]
}
```

---

## Event Endpoints

### 1. Get All Events
**GET** `/events?page=1&limit=10&category=Social`

**Public Endpoint**

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `category` (optional): Filter by category

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx123...",
      "title": "Welcome Back Party",
      "description": "Join us for a fun party!",
      "date": "2024-02-15T18:00:00.000Z",
      "location": "Student Center",
      "category": "Social",
      "imageUrl": "/uploads/image-123.jpg",
      "admin": {
        "id": "clx456...",
        "name": "Admin Name",
        "email": "admin@university.edu"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

### 2. Get Event by ID
**GET** `/events/:id`

**Public Endpoint**

**Response (200):**
```json
{
  "data": {
    "id": "clx123...",
    "title": "Welcome Back Party",
    "description": "Join us for a fun party!",
    "date": "2024-02-15T18:00:00.000Z",
    "location": "Student Center",
    "category": "Social",
    "imageUrl": "/uploads/image-123.jpg",
    "admin": {
      "id": "clx456...",
      "name": "Admin Name",
      "email": "admin@university.edu"
    }
  }
}
```

---

### 3. Create Event
**POST** `/events`

**Protected Endpoint** (Admin only)

**Request:** `multipart/form-data`

**Form Data:**
- `title`: "New Event"
- `description`: "Event description"
- `date`: "2024-12-31T18:00:00Z"
- `location`: "Main Hall"
- `category`: "Social"
- `image`: (file) - Image file

**Response (201):**
```json
{
  "message": "Event created successfully",
  "data": {
    "id": "clx123...",
    "title": "New Event",
    "description": "Event description",
    "date": "2024-12-31T18:00:00.000Z",
    "location": "Main Hall",
    "category": "Social",
    "imageUrl": "/uploads/image-123.jpg",
    "admin": {
      "id": "clx456...",
      "name": "Admin Name",
      "email": "admin@university.edu"
    }
  }
}
```

---

### 4. Update Event
**PUT** `/events/:id`

**Protected Endpoint** (Admin only)

**Request:** `multipart/form-data` or `application/json`

**Form Data (optional):**
- `title`: "Updated Title"
- `description`: "Updated description"
- `date`: "2024-12-31T18:00:00Z"
- `location`: "New Location"
- `category`: "Workshop"
- `image`: (file) - New image file

**Response (200):**
```json
{
  "message": "Event updated successfully",
  "data": {
    "id": "clx123...",
    "title": "Updated Title",
    "description": "Updated description",
    "date": "2024-12-31T18:00:00.000Z",
    "location": "New Location",
    "category": "Workshop",
    "imageUrl": "/uploads/image-456.jpg"
  }
}
```

---

### 5. Delete Event
**DELETE** `/events/:id`

**Protected Endpoint** (Admin only)

**Response (200):**
```json
{
  "message": "Event deleted successfully"
}
```

---

## Announcement Endpoints

### 1. Get All Announcements
**GET** `/announcements?page=1&limit=10&category=General`

**Public Endpoint**

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `category` (optional): Filter by category

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx123...",
      "title": "Club Meeting",
      "content": "Meeting this Friday at 3 PM",
      "imageUrl": "/uploads/image-123.jpg",
      "location": "Room 205",
      "category": "General",
      "date": "2024-01-01T00:00:00.000Z",
      "admin": {
        "id": "clx456...",
        "name": "Admin Name",
        "email": "admin@university.edu"
      },
      "_count": {
        "students": 15
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 30,
    "totalPages": 3
  }
}
```

---

### 2. Get Announcement by ID
**GET** `/announcements/:id`

**Public Endpoint**

**Response (200):**
```json
{
  "data": {
    "id": "clx123...",
    "title": "Club Meeting",
    "content": "Meeting this Friday at 3 PM",
    "imageUrl": "/uploads/image-123.jpg",
    "location": "Room 205",
    "category": "General",
    "date": "2024-01-01T00:00:00.000Z",
    "admin": {
      "id": "clx456...",
      "name": "Admin Name",
      "email": "admin@university.edu"
    },
    "students": [
      {
        "student": {
          "id": "clx789...",
          "name": "John Doe",
          "email": "student@university.edu"
        }
      }
    ]
  }
}
```

---

### 3. Create Announcement
**POST** `/announcements`

**Protected Endpoint** (Admin only)

**Request:** `multipart/form-data`

**Form Data:**
- `title`: "New Announcement"
- `content`: "Announcement content here"
- `location`: "Room 205"
- `category`: "General"
- `image`: (file) - Image file (optional)

**Response (201):**
```json
{
  "message": "Announcement created successfully",
  "data": {
    "id": "clx123...",
    "title": "New Announcement",
    "content": "Announcement content here",
    "location": "Room 205",
    "category": "General",
    "imageUrl": "/uploads/image-123.jpg",
    "admin": {
      "id": "clx456...",
      "name": "Admin Name",
      "email": "admin@university.edu"
    }
  }
}
```

---

### 4. Update Announcement
**PUT** `/announcements/:id`

**Protected Endpoint** (Admin only)

**Request:** `multipart/form-data` or `application/json`

**Response (200):**
```json
{
  "message": "Announcement updated successfully",
  "data": {
    "id": "clx123...",
    "title": "Updated Announcement",
    "content": "Updated content"
  }
}
```

---

### 5. Delete Announcement
**DELETE** `/announcements/:id`

**Protected Endpoint** (Admin only)

**Response (200):**
```json
{
  "message": "Announcement deleted successfully"
}
```

---

### 6. Join Announcement
**POST** `/announcements/:id/join`

**Protected Endpoint** (Student only)

**Response (200):**
```json
{
  "message": "Successfully joined announcement"
}
```

---

### 7. Leave Announcement
**POST** `/announcements/:id/leave`

**Protected Endpoint** (Student only)

**Response (200):**
```json
{
  "message": "Successfully left announcement"
}
```

---

## Gallery Endpoints

### 1. Get All Gallery Photos
**GET** `/gallery?page=1&limit=10&category=Events`

**Public Endpoint**

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `category` (optional): Filter by category

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx123...",
      "imageUrl": "/uploads/photo-123.jpg",
      "title": "Club Meeting Photo",
      "category": "Events",
      "description": "Photo from our recent meeting",
      "admin": {
        "id": "clx456...",
        "name": "Admin Name",
        "email": "admin@university.edu"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

### 2. Get Gallery Photo by ID
**GET** `/gallery/:id`

**Public Endpoint**

**Response (200):**
```json
{
  "data": {
    "id": "clx123...",
    "imageUrl": "/uploads/photo-123.jpg",
    "title": "Club Meeting Photo",
    "category": "Events",
    "description": "Photo from our recent meeting",
    "admin": {
      "id": "clx456...",
      "name": "Admin Name",
      "email": "admin@university.edu"
    }
  }
}
```

---

### 3. Upload Gallery Photo
**POST** `/gallery`

**Protected Endpoint** (Admin only)

**Request:** `multipart/form-data`

**Form Data:**
- `title`: "Photo Title" (optional)
- `category`: "Events" (optional)
- `description`: "Photo description" (optional)
- `image`: (file) - Image file (required)

**Response (201):**
```json
{
  "message": "Photo uploaded successfully",
  "data": {
    "id": "clx123...",
    "imageUrl": "/uploads/photo-123.jpg",
    "title": "Photo Title",
    "category": "Events",
    "description": "Photo description",
    "admin": {
      "id": "clx456...",
      "name": "Admin Name",
      "email": "admin@university.edu"
    }
  }
}
```

---

### 4. Delete Gallery Photo
**DELETE** `/gallery/:id`

**Protected Endpoint** (Admin only)

**Response (200):**
```json
{
  "message": "Photo deleted successfully"
}
```

---

## Team Endpoints

### 1. Get All Team Members
**GET** `/team`

**Public Endpoint**

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx123...",
      "name": "Alice Williams",
      "role": "President",
      "photoUrl": "/uploads/photo-123.jpg",
      "bio": "Senior student majoring in Computer Science",
      "email": "alice@university.edu",
      "phone": "+1234567890",
      "order": 1,
      "admin": {
        "id": "clx456...",
        "name": "Admin Name",
        "email": "admin@university.edu"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Team Member by ID
**GET** `/team/:id`

**Public Endpoint**

**Response (200):**
```json
{
  "data": {
    "id": "clx123...",
    "name": "Alice Williams",
    "role": "President",
    "photoUrl": "/uploads/photo-123.jpg",
    "bio": "Senior student majoring in Computer Science",
    "email": "alice@university.edu",
    "phone": "+1234567890",
    "order": 1
  }
}
```

---

### 3. Add Team Member
**POST** `/team`

**Protected Endpoint** (Admin only)

**Request:** `multipart/form-data`

**Form Data:**
- `name`: "Team Member Name"
- `role`: "Member"
- `bio`: "Team member bio" (optional)
- `email`: "member@university.edu" (optional)
- `phone`: "+1234567890" (optional)
- `order`: "1" (optional)
- `photo`: (file) - Photo file (optional)

**Response (201):**
```json
{
  "message": "Team member added successfully",
  "data": {
    "id": "clx123...",
    "name": "Team Member Name",
    "role": "Member",
    "photoUrl": "/uploads/photo-123.jpg",
    "bio": "Team member bio",
    "order": 1
  }
}
```

---

### 4. Update Team Member
**PUT** `/team/:id`

**Protected Endpoint** (Admin only)

**Request:** `multipart/form-data` or `application/json`

**Response (200):**
```json
{
  "message": "Team member updated successfully",
  "data": {
    "id": "clx123...",
    "name": "Updated Name",
    "role": "Updated Role"
  }
}
```

---

### 5. Delete Team Member
**DELETE** `/team/:id`

**Protected Endpoint** (Admin only)

**Response (200):**
```json
{
  "message": "Team member deleted successfully"
}
```

---

## Contact Endpoints

### 1. Send Contact Message
**POST** `/contact`

**Public Endpoint**

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about membership",
  "message": "I would like to know more about joining the club."
}
```

**Response (201):**
```json
{
  "message": "Contact message sent successfully",
  "data": {
    "id": "clx123...",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Question about membership",
    "message": "I would like to know more about joining the club.",
    "isRead": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Note:** Rate limited to 3 requests per hour per IP.

---

### 2. Get All Contact Messages
**GET** `/contact?page=1&limit=10&isRead=false`

**Protected Endpoint** (Admin only)

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `isRead` (optional): Filter by read status (true/false)

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx123...",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Question about membership",
      "message": "I would like to know more...",
      "isRead": false,
      "admin": {
        "id": "clx456...",
        "name": "Admin Name",
        "email": "admin@university.edu"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 20,
    "totalPages": 2
  }
}
```

---

### 3. Get Contact Message by ID
**GET** `/contact/:id`

**Protected Endpoint** (Admin only)

**Response (200):**
```json
{
  "data": {
    "id": "clx123...",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Question about membership",
    "message": "I would like to know more...",
    "isRead": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Note:** Automatically marks message as read when viewed.

---

### 4. Delete Contact Message
**DELETE** `/contact/:id`

**Protected Endpoint** (Admin only)

**Response (200):**
```json
{
  "message": "Contact message deleted successfully"
}
```

---

## Lost & Found Endpoints

### 1. Get All Lost & Found Items
**GET** `/lost-found?page=1&limit=10&status=lost`

**Public Endpoint**

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status (lost/found/claimed)

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx123...",
      "title": "Lost: Blue Backpack",
      "description": "Blue backpack with laptop inside",
      "status": "lost",
      "location": "Main Library",
      "contactInfo": "contact@university.edu",
      "imageUrl": "/uploads/image-123.jpg",
      "admin": {
        "id": "clx456...",
        "name": "Admin Name",
        "email": "admin@university.edu"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

---

### 2. Get Lost & Found Item by ID
**GET** `/lost-found/:id`

**Public Endpoint**

**Response (200):**
```json
{
  "data": {
    "id": "clx123...",
    "title": "Lost: Blue Backpack",
    "description": "Blue backpack with laptop inside",
    "status": "lost",
    "location": "Main Library",
    "contactInfo": "contact@university.edu",
    "imageUrl": "/uploads/image-123.jpg",
    "admin": {
      "id": "clx456...",
      "name": "Admin Name",
      "email": "admin@university.edu"
    }
  }
}
```

---

### 3. Create Lost & Found Item
**POST** `/lost-found`

**Protected Endpoint** (Admin only)

**Request:** `multipart/form-data`

**Form Data:**
- `title`: "Lost: Blue Backpack"
- `description`: "Blue backpack with laptop inside" (optional)
- `status`: "lost" (optional, default: "lost")
- `location`: "Main Library" (optional)
- `contactInfo`: "contact@university.edu" (optional)
- `image`: (file) - Image file (optional)

**Response (201):**
```json
{
  "message": "Lost & Found item created successfully",
  "data": {
    "id": "clx123...",
    "title": "Lost: Blue Backpack",
    "description": "Blue backpack with laptop inside",
    "status": "lost",
    "location": "Main Library",
    "contactInfo": "contact@university.edu",
    "imageUrl": "/uploads/image-123.jpg"
  }
}
```

---

### 4. Update Lost & Found Item
**PUT** `/lost-found/:id`

**Protected Endpoint** (Admin only)

**Request:** `multipart/form-data` or `application/json`

**Response (200):**
```json
{
  "message": "Lost & Found item updated successfully",
  "data": {
    "id": "clx123...",
    "title": "Found: Blue Backpack",
    "status": "found"
  }
}
```

---

### 5. Delete Lost & Found Item
**DELETE** `/lost-found/:id`

**Protected Endpoint** (Admin only)

**Response (200):**
```json
{
  "message": "Lost & Found item deleted successfully"
}
```

---

## Error Responses

### Standard Error Format

All errors follow this format:

```json
{
  "error": "Error message here"
}
```

### HTTP Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request (validation errors)
- **401** - Unauthorized (missing/invalid token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **409** - Conflict (duplicate entry)
- **429** - Too Many Requests (rate limit exceeded)
- **500** - Internal Server Error

### Validation Error Format

When validation fails (400):

```json
{
  "error": "Validation failed",
  "errors": [
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Rate Limit Error (429)

```json
{
  "error": "Too many requests from this IP, please try again later."
}
```

---

## File Upload

### Supported File Types
- JPEG/JPG
- PNG
- GIF
- WebP

### File Size Limit
- Maximum: 5MB (configurable via `MAX_FILE_SIZE` env variable)

### Upload Endpoints
- Events: `POST /events` (form field: `image`)
- Announcements: `POST /announcements` (form field: `image`)
- Gallery: `POST /gallery` (form field: `image`)
- Team: `POST /team` (form field: `photo`)
- Lost & Found: `POST /lost-found` (form field: `image`)

### Example Upload (JavaScript/Fetch)

```javascript
const formData = new FormData();
formData.append('title', 'Event Title');
formData.append('description', 'Event Description');
formData.append('date', '2024-12-31T18:00:00Z');
formData.append('image', fileInput.files[0]);

fetch('http://localhost:5000/api/events', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

---

## Pagination

All list endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response Format:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## CORS Configuration

The API is configured to accept requests from:
- Default: `http://localhost:5173`
- Configurable via `FRONTEND_URL` environment variable

---

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP
- **Contact Form**: 3 requests per hour per IP

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset time (Unix timestamp)

---

## Health Check

**GET** `/health`

**Public Endpoint**

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600.5
}
```

---

## Notes for Frontend Developers

1. **Token Storage**: Store JWT token in localStorage or httpOnly cookie
2. **Token Refresh**: Tokens expire in 7 days (configurable)
3. **Image URLs**: Use full URL when displaying images: `http://localhost:5000/uploads/filename.jpg`
4. **Error Handling**: Always check response status and handle errors appropriately
5. **File Uploads**: Use `multipart/form-data` for file uploads
6. **Pagination**: Implement pagination UI using the `pagination` object in responses
7. **Caching**: Some endpoints are cached - data may not update immediately after mutations

---

## Example Frontend Integration

### Axios Setup

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Usage Example

```javascript
// Login
const login = async (email, password) => {
  const response = await api.post('/auth/student/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data.student;
};

// Get Events
const getEvents = async (page = 1, limit = 10) => {
  const response = await api.get(`/events?page=${page}&limit=${limit}`);
  return response.data;
};

// Create Event (with file upload)
const createEvent = async (eventData, imageFile) => {
  const formData = new FormData();
  Object.keys(eventData).forEach(key => {
    formData.append(key, eventData[key]);
  });
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  const response = await api.post('/events', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
```

---

## Support

For API issues or questions, refer to:
- Main README: `README.md`
- Setup Guide: `SETUP.md`
- Postman Collection: `postman_collection.json`

---

**Last Updated:** 2024-01-01
**API Version:** 1.0.0

