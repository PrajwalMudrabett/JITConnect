# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with your email or Google account

## Step 2: Create a Cluster

1. After logging in, click "Build a Database"
2. Choose "FREE" tier (M0 Sandbox)
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you
5. Name your cluster (e.g., "JITConnect")
6. Click "Create"

## Step 3: Create Database User

1. Click "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username (e.g., "jitconnect")
5. Click "Autogenerate Secure Password" or create your own
6. **IMPORTANT**: Copy and save this password!
7. Set user privileges to "Read and write to any database"
8. Click "Add User"

## Step 4: Whitelist IP Address

1. Click "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - This adds `0.0.0.0/0` to the whitelist
4. Click "Confirm"

## Step 5: Get Connection String

1. Click "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as driver and version "5.5 or later"
5. Copy the connection string

It will look like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Step 6: Update Backend Configuration

1. Open `server/.env` file
2. Replace the `MONGODB_URI` with your connection string
3. Replace `<username>` with your database username
4. Replace `<password>` with your database password
5. Add database name after `.net/`: `jitconnect`

Example:
```env
MONGODB_URI=mongodb+srv://jitconnect:YourPassword123@cluster0.xxxxx.mongodb.net/jitconnect?retryWrites=true&w=majority
```

## Step 7: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 8: Start Backend Server

```bash
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
📊 Database: jitconnect
🚀 Server running on port 5000
```

## Step 9: Test the Connection

Open your browser or Postman and test:
```
GET http://localhost:5000/
```

You should see:
```json
{
  "message": "JITConnect API is running..."
}
```

## Step 10: View Data in MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections"
3. You'll see your database "jitconnect"
4. Collections will appear as users register and create posts:
   - `users` - All registered users
   - `posts` - All posts
   - `messages` - All messages

## Troubleshooting

### Error: "MongoServerError: bad auth"
- Check your username and password in the connection string
- Make sure you copied the password correctly
- Try resetting the database user password

### Error: "MongooseServerSelectionError"
- Check if your IP is whitelisted
- Make sure you have internet connection
- Verify the connection string is correct

### Error: "ECONNREFUSED"
- Make sure MongoDB Atlas cluster is running
- Check if you're using the correct connection string
- Verify network access settings

## Security Best Practices

1. **Never commit `.env` file to Git**
   - Already added to `.gitignore`

2. **Use strong passwords**
   - At least 12 characters
   - Mix of letters, numbers, symbols

3. **Restrict IP access in production**
   - Don't use `0.0.0.0/0` in production
   - Add only your server's IP address

4. **Rotate credentials regularly**
   - Change database password every 3-6 months

## Viewing Your Data

### Using MongoDB Compass (Desktop App)

1. Download MongoDB Compass: [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)
2. Open Compass
3. Paste your connection string
4. Click "Connect"
5. Browse your collections visually

### Using MongoDB Atlas Web Interface

1. Go to your cluster
2. Click "Browse Collections"
3. View and edit data directly

## Sample Data Structure

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@jit.ac.in",
  "password": "hashed_password",
  "role": "student",
  "branch": "CSE",
  "year": "3rd",
  "connections": [],
  "createdAt": "2024-03-11T10:00:00.000Z"
}
```

### Posts Collection
```json
{
  "_id": "ObjectId",
  "user": "user_ObjectId",
  "content": "Got placed at Microsoft!",
  "category": "placement",
  "likes": ["user_id_1", "user_id_2"],
  "comments": [
    {
      "user": "user_ObjectId",
      "text": "Congratulations!",
      "createdAt": "2024-03-11T10:05:00.000Z"
    }
  ],
  "createdAt": "2024-03-11T10:00:00.000Z"
}
```

## Next Steps

1. Start the backend server: `cd server && npm start`
2. Start the React app: `cd jitconnect-react && npm run dev`
3. Register a new user
4. Create some posts
5. Check MongoDB Atlas to see your data!

---

**Your data is now stored in MongoDB Atlas! 🎉**
