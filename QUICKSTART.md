# JITConnect - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Navigate to React Project
```bash
cd jitconnect-react
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🎯 First Time Usage

### 1. Create an Account
- Click "SIGN UP" on the login page
- Fill in your details
- Select your role (Student/Faculty/Alumni/Department)
- Fill role-specific fields
- Click "CREATE ACCOUNT"

### 2. Login
- Enter your email and password
- Click "LOGIN"
- You'll be redirected to the dashboard

### 3. Explore Features
- **Dashboard**: View and create posts
- **Profile**: View your profile and posts
- **Explore**: Search and connect with people
- **Messages**: Chat with connections
- **Connections**: View your connections

## 🎨 What You'll See

### Ferrari-Inspired Design
- Bold red (#DC0000) accents
- Clean white cards with transparency
- JIT campus backgrounds on every page
- Smooth animations and transitions

### JIT Branding
- JIT logo on sidebar
- NIRF ranking badge
- NBA accreditation logo
- Campus photos as backgrounds

### Role-Based Features
- **Students**: Share internships, placements, achievements
- **Faculty**: Post research papers, conferences
- **Alumni**: Mentor students, share career insights
- **Departments**: Official announcements, newsletters

## 📱 Pages Overview

### Login Page
- Clean authentication interface
- Dynamic form fields based on role
- JIT logo and branding

### Dashboard (Home Feed)
- Achievements banner with JIT excellence
- Create post section
- Feed with sample posts from all roles
- Suggested connections panel
- Trending topics

### Profile Page
- User information display
- Role-specific details
- User's posts collection
- Edit profile option

### Explore Page
- Search bar for finding people
- Filter by name, role, or branch
- Connect with users

### Messages Page
- Conversation list on left
- Chat interface on right
- Send messages to connections

### Connections Page
- List of all your connections
- Quick message option

## 🔧 Customization

### Change Your Profile
1. Go to Profile page
2. Click "EDIT PROFILE"
3. Update your information
4. Save changes

### Create a Post
1. Go to Dashboard
2. Type your content in the text area
3. Select a category (Internship/Placement/Research/Event/General)
4. Click "POST"

### Connect with People
1. Go to Explore page
2. Search for people
3. Click "CONNECT" button
4. They'll appear in your Connections

### Send Messages
1. Go to Messages page
2. Click on a conversation
3. Type your message
4. Press Enter or click "SEND"

## 💡 Tips

- All data is stored in your browser's LocalStorage
- Refresh the page to see your data persist
- Clear browser data to reset the app
- Use Chrome DevTools to inspect the app

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill the process on port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Images Not Loading
- Make sure images are in `jitconnect-react/public/assets/jit-images/`
- Check browser console for 404 errors
- Verify image paths in CSS use `/assets/` prefix

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## 🚀 Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the dist/ folder to Netlify
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Need Help?

Check the documentation files:
- `MRD.md` - Project requirements
- `Design.md` - Design philosophy
- `TechStack.md` - Technical details
- `README.md` - Full documentation

---

**Happy Coding! 🚀**
