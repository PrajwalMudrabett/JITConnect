# JITConnect - Quick Reference Card

## 🚀 Start Servers

### Backend (Terminal 1)
```bash
cd server
npm start
```
Expected: `✅ MongoDB Connected` + `🚀 Server running on port 5000`

### Frontend (Terminal 2)
```bash
cd jitconnect-react
npm run dev
```
Expected: `➜  Local:   http://localhost:5174/`

## 🌐 URLs

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:5000
- **MongoDB Atlas**: https://cloud.mongodb.com

## 🔑 Test Credentials

Create your own by registering at http://localhost:5174

## 📡 API Endpoints Quick Reference

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `PUT /api/posts/:id/like` - Like/unlike
- `POST /api/posts/:id/comment` - Add comment

### Users
- `GET /api/users` - Get all users
- `GET /api/users/search?query=` - Search
- `POST /api/users/:id/connect` - Connect
- `GET /api/users/connections/list` - Get connections

### Messages
- `GET /api/messages/:userId` - Get messages
- `POST /api/messages` - Send message
- `GET /api/messages/conversations/list` - Get conversations

## 🗄️ MongoDB Collections

- **users** - All registered users
- **posts** - All posts with likes/comments
- **messages** - All messages

## 🎨 Pages

1. **Login** (`/login`) - Authentication
2. **Dashboard** (`/dashboard`) - Main feed
3. **Profile** (`/profile`) - User profile
4. **Explore** (`/explore`) - Discover users
5. **Messages** (`/messages`) - Chat
6. **Connections** (`/connections`) - Connections list

## 🔧 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## 🐛 Quick Troubleshooting

### Backend won't start
- Check MongoDB connection string in `server/.env`
- Verify IP is whitelisted in MongoDB Atlas
- Check if port 5000 is available

### Frontend won't start
- Check if port 5174 is available
- Run `npm install` in jitconnect-react folder

### Can't login/register
- Check if backend is running
- Check browser console for errors
- Verify API URL is correct

### Data not showing in MongoDB
- Check if backend is connected to MongoDB
- Verify you're looking at correct database ("jitconnect")
- Refresh the MongoDB Atlas page

## 📚 Documentation Files

- `SETUP-INSTRUCTIONS.md` - Complete setup guide
- `MONGODB-SETUP.md` - MongoDB Atlas setup
- `RUN-PROJECT.md` - Running the project
- `COMPLETE-SUMMARY.md` - Full project summary
- `DEPLOYMENT.md` - Deployment guide

## ✅ Quick Test

1. Register a user
2. Create a post
3. Like the post
4. Add a comment
5. Check MongoDB Atlas - all data should be there!

## 🎯 All Buttons That Work

- ✅ POST - Creates post in database
- ✅ ❤️ LIKE - Adds/removes like
- ✅ 💬 COMMENT - Adds comment
- ✅ CONNECT - Sends connection request
- ✅ SEND - Sends message
- ✅ All navigation links
- ✅ LOGOUT - Clears session

## 📊 Tech Stack

**Frontend**: React 19, Vite, React Router
**Backend**: Node.js, Express, JWT
**Database**: MongoDB Atlas
**Styling**: Custom CSS (Ferrari-inspired)

## 🎓 Resume Bullet Point

```
JITConnect - Full Stack Social Platform (MERN)
• Built role-based social network with 19 REST API endpoints
• Integrated MongoDB Atlas, JWT auth, real-time interactions
• React 19 frontend with Ferrari-inspired UI, Node.js backend
```

---

**Need detailed help?** Check `SETUP-INSTRUCTIONS.md`

**Ready to deploy?** Check `DEPLOYMENT.md`

**Everything working?** You're all set! 🎉
