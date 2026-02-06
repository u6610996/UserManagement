# User Management System

## Project Structure
- `backend/` - Next.js API backend
- `frontend/` - React frontend application

## Backend Setup (Next.js)

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies (if needed)
```bash
npm install
```

### 3. Configure environment variables
Edit `.env.local` file:
```
MONGODB_URI=your_mongodb_connection_string
ADMIN_SETUP_PASS=your_admin_password
```

### 4. Initialize database indexes
Visit: `http://localhost:3000/api/admin/initial?pass=your_admin_password`

### 5. Start backend server
```bash
npm run dev
```
Backend will run on: `http://localhost:3000`

## Frontend Setup (React)

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start frontend server
```bash
npm start
```
Frontend will run on: `http://localhost:3001`

## API Endpoints

### User APIs
- `GET /api/user` - Get all users
- `POST /api/user` - Create new user
- `GET /api/user/[id]` - Get user by ID
- `PATCH /api/user/[id]` - Update user (partial)
- `PUT /api/user/[id]` - Replace user (full)
- `DELETE /api/user/[id]` - Delete user

### User Data Structure
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "firstname": "string",
  "lastname": "string",
  "status": "ACTIVE|SUSPENDED|DELETED"
}
```

## Features
- ✅ Create new users with encrypted passwords
- ✅ List all users
- ✅ Update user information
- ✅ Delete users
- ✅ Unique username and email validation
- ✅ User status management
- ✅ Responsive UI design

## Notes
- Passwords are hashed using bcrypt
- Username and email are unique fields
- Backend runs on port 3000
- Frontend runs on port 3001 (or next available)
