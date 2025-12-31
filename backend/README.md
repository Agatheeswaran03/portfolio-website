# Portfolio Backend - MongoDB Integration

## 🎯 Overview

This is the backend API for the portfolio website, built with **Node.js**, **Express**, and **MongoDB**. It handles contact form submissions and stores messages in a MongoDB database.

---

## 📋 Prerequisites

Before running the backend, you need **ONE** of the following:

### Option 1: Local MongoDB (Recommended for Development)
- Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- MongoDB will run on `mongodb://127.0.0.1:27017` by default

### Option 2: MongoDB Atlas (Cloud - No Installation)
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
# For Local MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/portfolioDB
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**OR** for MongoDB Atlas (Cloud):

```bash
# For MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolioDB?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:5173
```

> 💡 **Tip**: Copy `.env.example` to `.env` and update with your values

### 3. Start the Server

```bash
npm start
```

You should see:
```
==================================================
🚀 Server running on port 5000
📍 Local: http://localhost:5000
🌐 Environment: development
==================================================

✅ MongoDB Connected Successfully
📊 Database: portfolioDB
```

---

## 📡 API Endpoints

### Health Check
```http
GET /
```
Returns server status and database connection state.

**Response:**
```json
{
  "status": "online",
  "message": "Portfolio Backend API is running! 🚀",
  "timestamp": "2025-12-23T17:50:00.000Z",
  "database": "connected"
}
```

### Send Message (Contact Form)
```http
POST /send-message
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello! I'd like to discuss a project."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message received successfully!",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "date": "2025-12-23T17:50:00.000Z"
  }
}
```

### Get All Messages
```http
GET /messages
```
Fetch all contact messages (sorted by newest first).

**Response:**
```json
{
  "success": true,
  "count": 5,
  "messages": [...]
}
```

### Get Single Message
```http
GET /messages/:id
```
Fetch a specific message by ID.

---

## 🧪 Testing the API

### Using curl (Command Line)

**Test Health Check:**
```bash
curl http://localhost:5000
```

**Send a Test Message:**
```bash
curl -X POST http://localhost:5000/send-message \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Test message\"}"
```

**Get All Messages:**
```bash
curl http://localhost:5000/messages
```

### Using Postman or Thunder Client
1. Import the endpoints above
2. Test each route
3. Verify responses

---

## 🗄️ Database Schema

**Message Model:**
```javascript
{
  name: String (required),
  email: String (required, lowercase),
  message: String (required),
  date: Date (auto-generated),
  read: Boolean (default: false)
}
```

---

## 🐛 Troubleshooting

### Error: "MongoDB Connection Error"
- **Local MongoDB**: Make sure MongoDB is running
  - Windows: Check services or run `mongod` command
  - Check if port 27017 is available
- **Atlas**: Verify your connection string and credentials
  - Check IP whitelist (allow 0.0.0.0/0 for testing)
  - Verify username/password

### Error: "Cannot connect to server"
- Make sure the backend is running on port 5000
- Check if another service is using port 5000
- Verify CORS settings in `.env` match your frontend URL

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

---

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

---

## 🔒 Security Notes

- Never commit `.env` file to version control (already in .gitignore)
- Use strong passwords for MongoDB Atlas
- In production, restrict CORS to your actual frontend domain
- Consider adding rate limiting for production

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/portfolioDB` |
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

---

## 🚢 Deployment

For deploying to production (e.g., Render, Heroku):

1. Set environment variables in your hosting platform
2. Update `MONGO_URI` to your MongoDB Atlas connection string
3. Update `FRONTEND_URL` to your deployed frontend URL
4. Deploy using `npm start` command

---

## 📞 Support

If you encounter any issues, check:
1. MongoDB is running (local) or accessible (Atlas)
2. Environment variables are set correctly
3. Dependencies are installed (`npm install`)
4. Port 5000 is available

---

**Made with ❤️ for Portfolio Project**
