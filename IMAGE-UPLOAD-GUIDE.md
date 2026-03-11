# Image Upload Guide - JITConnect

## ✅ FIXED! Image Upload Now Works!

### 📷 How to Add Photos to Posts

1. **Go to Dashboard** (http://localhost:5174/dashboard)

2. **Type your post content** in the text area

3. **Click "📷 Photo" button**

4. **Select an image** from your computer
   - Supported formats: JPG, PNG, GIF, WebP
   - Maximum size: 5MB

5. **Preview appears** - You'll see your image below the text area

6. **Remove if needed** - Click "✕ REMOVE" button to change image

7. **Select category** - Choose from dropdown (General, Internship, Placement, Research, Event)

8. **Click "POST"** - Your post with image will be created!

9. **Check MongoDB Atlas** - Image is stored as base64 in the database

## 🖼️ How to Upload Profile Picture

1. **Go to Profile page**

2. **Click "EDIT PROFILE" button**

3. **Click the 📷 camera icon** on your profile picture

4. **Select an image** from your computer

5. **Preview appears** - You'll see your new profile picture

6. **Click "SAVE CHANGES"** - Profile picture is updated!

7. **Check MongoDB Atlas** - Image stored in profilePic field

## 📊 Where Images Are Stored

### In MongoDB Atlas:

**Posts Collection:**
```json
{
  "_id": "...",
  "user": "...",
  "content": "My post text",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",  // ← Image here!
  "category": "general",
  "likes": [],
  "comments": []
}
```

**Users Collection:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@jit.ac.in",
  "profilePic": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",  // ← Image here!
  "role": "student"
}
```

## 🎯 Test It Now!

### Test 1: Post with Image
```
1. Login: priya.sharma@jit.ac.in / jit2024
2. Go to Dashboard
3. Type: "Check out my project demo! 🚀"
4. Click "📷 Photo"
5. Select any image
6. Click "POST"
7. Image should appear in your post!
```

### Test 2: Profile Picture
```
1. Go to Profile page
2. Click "EDIT PROFILE"
3. Click 📷 icon on profile picture
4. Select your photo
5. Click "SAVE CHANGES"
6. Your profile picture updates!
```

## 🔍 Verify in MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Click your cluster
3. Click "Browse Collections"
4. Select "jitconnect" database
5. Click "posts" collection
6. Find your post
7. You'll see the "image" field with base64 data!

## 💡 Features

✅ **Image Preview** - See image before posting
✅ **Remove Option** - Change your mind? Remove it!
✅ **Size Limit** - 5MB maximum (prevents huge uploads)
✅ **Format Support** - JPG, PNG, GIF, WebP
✅ **Base64 Encoding** - Images stored directly in MongoDB
✅ **Instant Display** - Images show immediately after upload
✅ **Profile Pictures** - Upload and change anytime
✅ **Post Images** - Add images to any post

## 🎨 How It Looks

### Create Post with Image:
```
┌─────────────────────────────────────┐
│ SHARE YOUR ACHIEVEMENT              │
├─────────────────────────────────────┤
│ [Text area with your content]       │
│                                     │
│ ┌─────────────────────────────┐   │
│ │                             │   │
│ │    [Image Preview]          │   │
│ │                             │   │
│ │         [✕ REMOVE]          │   │
│ └─────────────────────────────┘   │
│                                     │
│ [📷 Photo] [Category ▼] [POST]    │
└─────────────────────────────────────┘
```

### Post with Image in Feed:
```
┌─────────────────────────────────────┐
│ 👤 Priya Sharma [STUDENT]          │
│ Just now                            │
├─────────────────────────────────────┤
│ Check out my project demo! 🚀       │
│                                     │
│ ┌─────────────────────────────┐   │
│ │                             │   │
│ │    [Your Image]             │   │
│ │                             │   │
│ └─────────────────────────────┘   │
│                                     │
│ ❤️ 0  💬 0  🔁 SHARE              │
└─────────────────────────────────────┘
```

## 🚀 Quick Test Commands

Open browser console (F12) and check:
```javascript
// After uploading image, check if it's stored
const posts = await fetch('http://localhost:5000/api/posts', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
}).then(r => r.json());

console.log(posts[0].image); // Should show base64 string
```

## ⚠️ Important Notes

1. **Image Size**: Keep images under 5MB for best performance
2. **Format**: Use JPG or PNG for best compatibility
3. **Storage**: Images stored as base64 in MongoDB (not separate files)
4. **Loading**: Large images may take a moment to upload
5. **Preview**: Always check preview before posting

## 🎉 Success!

Now you can:
- ✅ Add photos to your posts
- ✅ Upload profile pictures
- ✅ Preview images before posting
- ✅ Remove and change images
- ✅ See images in feed
- ✅ All images stored in MongoDB Atlas

---

**Go test it now! Upload some images! 📷🚀**
