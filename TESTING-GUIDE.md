# JITConnect - Complete Testing Guide

## 🎉 Database Seeded Successfully!

Your MongoDB Atlas database now has:
- ✅ 10 sample users (Principal, Faculty, Students, Alumni, Departments)
- ✅ 8 sample posts from different users
- ✅ All JIT-specific content

## 🔐 Sample Login Credentials

Use any of these accounts to test:

### Faculty & Administration
```
Email: principal@jyothyit.ac.in
Password: jit2024
Role: Faculty (Principal)
```

```
Email: rajesh.kumar@jyothyit.ac.in
Password: jit2024
Role: Faculty (Professor & HOD, CSE)
```

```
Email: sunita.rao@jyothyit.ac.in
Password: jit2024
Role: Faculty (Associate Professor, ECE)
```

### Departments
```
Email: placement@jyothyit.ac.in
Password: jit2024
Role: Department (Training & Placement Cell)
```

```
Email: aic@jyothyit.ac.in
Password: jit2024
Role: Department (AIC-JIT Foundation)
```

### Students
```
Email: priya.sharma@jit.ac.in
Password: jit2024
Role: Student (4th Year CSE)
```

```
Email: karthik.menon@jit.ac.in
Password: jit2024
Role: Student (3rd Year CSE)
```

### Alumni
```
Email: arjun.reddy@alumni.jit.ac.in
Password: jit2024
Role: Alumni (Google - Senior Software Engineer)
```

```
Email: ananya.iyer@alumni.jit.ac.in
Password: jit2024
Role: Alumni (Amazon - SDE II)
```

```
Email: vikram.singh@alumni.jit.ac.in
Password: jit2024
Role: Alumni (Microsoft - Senior Product Manager)
```

## 🧪 Complete Feature Testing

### Test 1: Login & Authentication ✅

1. Go to http://localhost:5174
2. Login with: `priya.sharma@jit.ac.in` / `jit2024`
3. You should be redirected to Dashboard
4. Check MongoDB Atlas → users collection → You'll see Priya's data

**Expected Result**: Successful login, JWT token stored, redirected to dashboard

### Test 2: View Sample Posts ✅

1. After login, you're on the Dashboard
2. You should see 8 posts:
   - Placement announcement from Training & Placement Cell
   - Research paper acceptance from Dr. Rajesh Kumar
   - Internship selection from Priya Sharma
   - Startup launch from AIC-JIT
   - Alumni success stories from Arjun, Ananya, Vikram
   - NIRF ranking announcement from Principal

**Expected Result**: All 8 posts visible with proper formatting, role badges, and timestamps

### Test 3: Create a New Post ✅

1. In the "SHARE YOUR ACHIEVEMENT" section
2. Type: "Just completed my final year project on AI-based chatbot! 🤖"
3. Select category: "General"
4. Click "POST"
5. Your post should appear at the top of the feed
6. Check MongoDB Atlas → posts collection → New post added!

**Expected Result**: Post created successfully, appears in feed, saved to database

### Test 4: Like a Post ✅

1. Click the ❤️ button on any post
2. The like count should increase
3. Click again to unlike
4. Check MongoDB Atlas → posts collection → likes array updated

**Expected Result**: Like count increases/decreases, data saved to database

### Test 5: Add a Comment ✅

1. Click the 💬 button on any post
2. Enter: "Congratulations! Well deserved! 🎉"
3. Click OK
4. Comment count should increase
5. Check MongoDB Atlas → posts collection → comments array has your comment

**Expected Result**: Comment added successfully, count increases, saved to database

### Test 6: Edit Profile ✅

1. Click "Profile" in sidebar
2. Click "EDIT PROFILE" button
3. Update your bio: "Passionate about Full Stack Development and AI/ML. Looking for opportunities in tech!"
4. Update other fields (branch, year, etc.)
5. Click "SAVE CHANGES"
6. Profile should update
7. Check MongoDB Atlas → users collection → Your data updated!

**Expected Result**: Profile updated successfully, changes reflected immediately

### Test 7: Upload Profile Picture ✅

1. On Profile page, click "EDIT PROFILE"
2. Click the 📷 camera icon
3. Select an image from your computer
4. Image should appear as preview
5. Click "SAVE CHANGES"
6. Profile picture should update
7. Check MongoDB Atlas → users collection → profilePic field has base64 image data

**Expected Result**: Profile picture uploaded and displayed

### Test 8: Search Users ✅

1. Click "Explore" in sidebar
2. In search box, type: "alumni"
3. You should see all alumni (Arjun, Ananya, Vikram)
4. Try searching: "google" → Shows Arjun Reddy
5. Try searching: "cse" → Shows CSE students and faculty

**Expected Result**: Search filters users correctly by name, role, company, branch

### Test 9: Send Connection Request ✅

1. On Explore page
2. Click "CONNECT" on Arjun Reddy (Google alumni)
3. Alert: "Connection request sent successfully!"
4. Check MongoDB Atlas → users collection → Arjun's connectionRequests array has your ID

**Expected Result**: Connection request sent, saved to database

### Test 10: View Connections ✅

1. Click "Connections" in sidebar
2. You should see your connections list
3. (Initially empty until you accept requests)
4. Click "MESSAGE" on any connection

**Expected Result**: Connections list displayed, message button works

### Test 11: Send Messages ✅

1. Click "Messages" in sidebar
2. Select a conversation (or it will be empty initially)
3. Type: "Hi! I'd love to connect and learn about your experience at Google!"
4. Click "SEND" or press Enter
5. Message should appear in chat
6. Check MongoDB Atlas → messages collection → New message saved!

**Expected Result**: Message sent successfully, appears in chat, saved to database

### Test 12: Delete Your Post ✅

1. Go to "Profile" page
2. Find one of your posts
3. Click "🗑️ DELETE" button
4. Confirm deletion
5. Post should disappear
6. Check MongoDB Atlas → posts collection → Post removed!

**Expected Result**: Post deleted successfully, removed from database

### Test 13: Logout ✅

1. Click "LOGOUT" in sidebar
2. You should be redirected to login page
3. Try accessing /dashboard directly → Redirected to login

**Expected Result**: Logged out successfully, session cleared, protected routes work

### Test 14: Multi-User Interaction ✅

1. Open a new incognito/private window
2. Login as: `arjun.reddy@alumni.jit.ac.in` / `jit2024`
3. Go to Explore
4. Find Priya Sharma
5. Click "CONNECT"
6. Go back to your original window (logged in as Priya)
7. Refresh the page
8. Check MongoDB → Priya's connectionRequests should have Arjun's ID

**Expected Result**: Multi-user interactions work correctly

### Test 15: View Different User Profiles ✅

1. Login as different users and see their specific data:
   - **Student**: Shows USN, Branch, Year
   - **Faculty**: Shows Department, Designation, Experience
   - **Alumni**: Shows Batch, Branch, Company, Designation
   - **Department**: Shows Department Name

**Expected Result**: Role-specific fields displayed correctly

## 📊 Verify in MongoDB Atlas

After testing, check your MongoDB Atlas dashboard:

### Users Collection
- Should have 10+ users (10 sample + any you created)
- Each user has proper role-specific fields
- connectionRequests and connections arrays

### Posts Collection
- Should have 8+ posts (8 sample + any you created)
- Each post has:
  - user reference
  - content
  - category
  - likes array
  - comments array with user references
  - timestamps

### Messages Collection
- Should have messages you sent
- Each message has:
  - sender reference
  - receiver reference
  - message content
  - timestamps

## 🎯 All Buttons Working

✅ **POST** - Creates post in database
✅ **❤️ LIKE** - Adds/removes like in database
✅ **💬 COMMENT** - Adds comment to database
✅ **CONNECT** - Sends connection request to database
✅ **MESSAGE** - Opens message interface
✅ **SEND** - Sends message to database
✅ **EDIT PROFILE** - Opens edit form
✅ **SAVE CHANGES** - Updates profile in database
✅ **📷 Upload** - Uploads profile picture
✅ **DELETE** - Deletes post from database
✅ **LOGOUT** - Clears session
✅ **All Navigation** - Routes work correctly

## 🎨 UI Features Working

✅ Ferrari-inspired design with JIT branding
✅ Light theme with clear campus backgrounds
✅ Different backgrounds for each page
✅ JIT logo on sidebar
✅ NIRF and NBA badges in achievements banner
✅ Role-based color badges
✅ Smooth animations and transitions
✅ Loading states on buttons
✅ Error messages
✅ Success notifications

## 🔄 Real-Time Features

✅ Posts appear immediately after creation
✅ Likes update instantly
✅ Comments show immediately
✅ Profile changes reflect right away
✅ Messages appear in chat instantly
✅ Search filters in real-time

## 📱 Test on Different Devices

1. **Desktop**: Full 3-column layout
2. **Tablet**: 2-column layout (right panel hidden)
3. **Mobile**: Single column, stacked layout

## 🎓 Sample User Scenarios

### Scenario 1: New Student
1. Register as a new student
2. Complete profile with USN, branch, year
3. Upload profile picture
4. Create first post about joining JIT
5. Explore and connect with seniors
6. Message alumni for career guidance

### Scenario 2: Faculty Member
1. Login as faculty
2. Create post about research paper
3. Connect with other faculty
4. View student posts
5. Like and comment on student achievements

### Scenario 3: Alumni
1. Login as alumni
2. Update profile with current company
3. Create post about career journey
4. Connect with current students
5. Offer mentorship through messages

### Scenario 4: Department
1. Login as department account
2. Post official announcements
3. Share placement statistics
4. Post about upcoming events

## ✅ Success Checklist

- [ ] Can login with sample credentials
- [ ] Dashboard shows 8 sample posts
- [ ] Can create new posts
- [ ] Like button works and updates database
- [ ] Comment button works and updates database
- [ ] Can edit profile
- [ ] Can upload profile picture
- [ ] Search functionality works
- [ ] Connect button sends requests
- [ ] Can send messages
- [ ] Can delete own posts
- [ ] Logout works correctly
- [ ] All data visible in MongoDB Atlas
- [ ] Multi-user interactions work
- [ ] All role-specific fields display correctly

## 🐛 If Something Doesn't Work

1. **Check backend is running**: Terminal should show "MongoDB Connected"
2. **Check frontend is running**: http://localhost:5174 should be accessible
3. **Check browser console**: Press F12 to see any errors
4. **Check MongoDB Atlas**: Verify data is being saved
5. **Clear browser cache**: Ctrl+Shift+Delete
6. **Try different browser**: Chrome, Firefox, Edge

## 🎉 Congratulations!

If all tests pass, you have a fully functional social networking platform with:
- ✅ Complete authentication system
- ✅ Real-time post interactions
- ✅ Profile management with image upload
- ✅ Connection system
- ✅ Messaging system
- ✅ Search functionality
- ✅ MongoDB Atlas integration
- ✅ All buttons working
- ✅ Professional UI/UX

---

**Ready to show off your project! 🚀**
