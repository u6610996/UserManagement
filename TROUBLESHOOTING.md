# แก้ปัญหา "Failed to fetch users"

## ขั้นตอนการแก้ไข:

### 1. ตรวจสอบ Backend Server
```bash
cd backend
npm run dev
```
ต้องรันที่ port 3000

### 2. เช็ค .env.local
```bash
cd backend
cat .env.local
```
ต้องมี:
```
MONGODB_URI=mongodb+srv://...
ADMIN_SETUP_PASS=password
```

### 3. Initialize Database Indexes
เปิดเบราว์เซอร์:
```
http://localhost:3000/api/admin/initial?pass=password
```
(เปลี่ยน password เป็นของคุณ)

### 4. ทดสอบ API โดยตรง
เปิดเบราว์เซอร์:
```
http://localhost:3000/api/user
```
ควรได้ `[]` (array ว่าง) หรือ list ของ users

### 5. รัน Frontend
```bash
cd frontend
npm start
```

### 6. สร้าง User ตัวแรก
ใช้ Postman หรือ curl:
```bash
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@test.com",
    "password": "12345678",
    "firstname": "Admin",
    "lastname": "User"
  }'
```

## ปัญหาที่พบบ่อย:

### ❌ CORS Error
- ตรวจสอบว่า backend รันอยู่
- ลอง restart backend server

### ❌ MongoDB Connection Error  
- เช็ค MONGODB_URI ใน .env.local
- ตรวจสอบ IP Access List ใน MongoDB Atlas

### ❌ Port 3000 ถูกใช้แล้ว
Backend:
```bash
lsof -ti:3000 | xargs kill -9
```

Frontend (จะใช้ port 3001 อัตโนมัติ):
```bash
lsof -ti:3001 | xargs kill -9
```

## การทดสอบ API ทั้งหมด:

### 1. GET all users
```bash
curl http://localhost:3000/api/user
```

### 2. POST create user
```bash
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'
```

### 3. GET user by ID
```bash
curl http://localhost:3000/api/user/USER_ID
```

### 4. PATCH update user
```bash
curl -X PATCH http://localhost:3000/api/user/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"firstname":"Updated"}'
```

### 5. DELETE user
```bash
curl -X DELETE http://localhost:3000/api/user/USER_ID
```
