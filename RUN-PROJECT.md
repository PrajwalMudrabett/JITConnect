# How to Run JITConnect - Full Stack

## Prerequisites

- Node.js installed (v18 or higher)
- MongoDB Atlas account (free tier)
- Git (optional)

## Quick Start (3 Steps)

### Step 1: Setup MongoDB Atlas

Follow the guide in `MONGODB-SETUP.md` to:
1. Create MongoDB Atlas account
2. Create a cluster
3. Get your connection string
4. Update `server/.env` with your MongoDB URI

### Step 2: Start Backend Server

```bash
# Navigate to server folder
cd server

# Install dependencies (if not already done)
npm install

# Start the server
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📊 Database: jitconnect
🚀 Server running on port 5000
📍 API: http://localhost:5000
```

**Keep this terminal open!**

### Step 3: Start React Frontend

Open a NEW terminal window:

```bash
# Navigate to React folder
cd jitconnect-react

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

You should see:
```
VITE v7.3.1  ready in 371 ms
➜  Local:   http://localhost:5174/
```

## Access the Application

Open your browser and go to: **http://localhost:5174/**

## Testing the Full Stack

### 1. Register a New User

1. Click "SIGN UP"
2. Fill in your details:
   - Name: Your Name
   - Email: your.email@jit.ac.in
   - Password: yourpassword
   - Role: Student (or any role)
   - Fill role-specific fields
3. Click "CREATE ACCOUNT"

**Check MongoDB Atlas**: You should see a new user in the `users` collection!

### 2. Create a Post

1. After login, you'll be on the Dashboard
2. Type something in the "Share your achievement" box
3. Select a category
4. Click "POST"

**Check MongoDB Atlas**: You should see a new post in the `posts` collection!

### 3. Like a Post

1. Click the ❤️ button on any post
2. The like count should increase

**Check MongoDB Atlas**: The post's `likes` array should include your user ID!

### 4. Add a Comment

1. Click the 💬 button on any post
2. Enter your comment
3. Click OK

**Check MongoDB Atlas**: The post's `comments` array should have your comment!

### 5. Connect with Users

1. Go to "Explore" page
2. Click "CONNECT" on any user
3. Connection request sent!

**Check MongoDB Atlas**: The user's `connectionRequests` array should include your ID!

### 6. Send Messages

1. Go to "Messages" page
2. Select a conversation
3. Type a message
4. Click "SEND"

**Check MongoDB Atlas**: You should see a new message in the `messages` collection!

## Viewing Data in MongoDB Atlas

### Method 1: Web Interface

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click on your cluster
3. Click "Browse Collections"
4. Select "jitconnect" database
5. View collections:
   - `users` - All registered users
   - `posts` - All posts with likes and comments
   - `messages` - All messages

### Method 2: MongoDB Compass (Recommended)

1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Open Compass
3. Paste your connection string
4. Click "Connect"
5. Browse collections with a beautiful UI

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a post
- `PUT /api/posts/:id/like` - Like/unlike a post
- `POST /api/posts/:id/comment` - Add comment
- `DELETE /api/posts/:id` - Delete a post

### Users
- `GET /api/users` - Get all users
- `GET /api/users/search?query=` - Search users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update profile
- `POST /api/users/:id/connect` - Send connection request
- `PUT /api/users/connect/accept/:id` - Accept connection
- `GET /api/users/connections/list` - Get connections

### Messages
- `GET /api/messages/:userId` - Get messages with user
- `POST /api/messages` - Send a message
- `GET /api/messages/conversations/list` - Get all conversations

## Testing with Postman

### 1. Register a User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@jit.ac.in",
  "password": "password123",
  "role": "student",
  "branch": "CSE",
  "year": "3rd"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@jit.ac.in",
  "password": "password123"
}
```

Copy the `token` from the response!

### 3. Create a Post
```
POST http://localhost:5000/api/posts
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "content": "My first post!",
  "category": "general"
}
```

### 4. Get All Posts
```
GET http://localhost:5000/api/posts
Authorization: Bearer YOUR_TOKEN_HERE
```

## Troubleshooting

### Backend Issues

**Error: "Cannot connect to MongoDB"**
- Check your MongoDB URI in `server/.env`
- Make sure your IP is whitelisted in MongoDB Atlas
- Verify your username and password

**Error: "Port 5000 already in use"**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in server/.env
PORT=5001
```

### Frontend Issues

**Error: "Failed to fetch"**
- Make sure backend server is running on port 5000
- Check if `http://localhost:5000` is accessible
- Verify CORS is enabled in backend

**Error: "Port 5174 already in use"**
```bash
# Kill the process
npx kill-port 5174

# Or use different port
npm run dev -- --port 3000
```

### Database Issues

**No data showing in MongoDB Atlas**
- Make sure you're looking at the correct database ("jitconnect")
- Check if backend server is connected
- Try creating a new user/post

**Data not updating**
- Refresh the MongoDB Atlas page
- Check backend console for errors
- Verify API calls are successful (check browser console)

## Development Workflow

1. **Start Backend** (Terminal 1)
   ```bash
   cd server
   npm start
   ```

2. **Start Frontend** (Terminal 2)
   ```bash
   cd jitconnect-react
   npm run dev
   ```

3. **Make Changes**
   - Backend: Server auto-restarts with nodemon
   - Frontend: Hot reload with Vite

4. **View Data**
   - MongoDB Atlas web interface
   - MongoDB Compass
   - Backend console logs

## Production Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect to Render/Railway
3. Add environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect to Vercel/Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_API_URL=your-backend-url`
6. Deploy

## Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend (`.env` in jitconnect-react/)
```env
VITE_API_URL=http://localhost:5000/api
```

## Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Connection string updated in `server/.env`
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 5174)
- [ ] Can register a new user
- [ ] User appears in MongoDB Atlas
- [ ] Can create a post
- [ ] Post appears in MongoDB Atlas
- [ ] Can like posts
- [ ] Can add comments
- [ ] Can connect with users
- [ ] Can send messages

---

**Everything working? You're all set! 🎉**

Now you have a full-stack social networking platform with:
- React frontend
- Node.js/Express backend
- MongoDB Atlas database
- All data stored in the cloud!
