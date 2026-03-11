# JITConnect - React Version

A premium social networking platform exclusively for Jyothy Institute of Technology members, built with React and featuring Ferrari-inspired design.

## 🚀 Quick Start

```bash
cd jitconnect-react
npm install
npm run dev
```

Open your browser to the URL shown (usually http://localhost:5173)

## ✨ Features

- Role-based authentication (Student/Faculty/Alumni/Department)
- Post creation with categories (Internship, Placement, Research, Event, General)
- Real-time feed with JIT-specific content
- Connection management
- Messaging system
- User profiles
- Search and explore
- JIT campus backgrounds on every page
- Ferrari-inspired premium UI

## 🎨 Design

- Light theme with clear JIT campus backgrounds
- Ferrari red (#DC0000) accents
- Montserrat font family
- Premium shadows and animations
- Glassmorphism effects on cards

## 🏗️ Tech Stack

- React 19
- React Router DOM 7
- Vite
- CSS3 (Ferrari-inspired custom styles)
- LocalStorage for data persistence

## 📁 Project Structure

```
jitconnect-react/
├── public/
│   └── assets/
│       └── jit-images/          # JIT campus images and logos
├── src/
│   ├── components/
│   │   └── Sidebar.jsx          # Navigation sidebar
│   ├── pages/
│   │   ├── Login.jsx            # Authentication
│   │   ├── Dashboard.jsx        # Main feed
│   │   ├── Profile.jsx          # User profile
│   │   ├── Explore.jsx          # Discover people
│   │   ├── Connections.jsx      # Connections list
│   │   └── Messages.jsx         # Messaging
│   ├── ferrari-styles.css       # Main styles
│   ├── achievements-banner.css  # Banner styles
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
└── package.json
```

## 🎯 Key Features

### Authentication
- Dynamic form fields based on role selection
- Student: USN, Branch, Year
- Faculty: Department, Designation, Experience
- Alumni: Batch, Branch, Company, Designation
- Department: Department Name, Description

### Dashboard
- Create posts with text and images
- Category selection for posts
- JIT achievements banner with NIRF ranking and NBA accreditation
- Suggested connections panel
- Trending topics

### Profile
- View user information
- Display user's posts
- Edit profile option

### Explore
- Search functionality
- Filter by name, role, or branch
- Connect with users

### Messages
- Conversation list
- Chat interface
- Send messages

### Connections
- View all connections
- Message connections directly

## 🖼️ Campus Backgrounds

Different JIT campus images for each page:
- Login: Main campus view
- Dashboard: Campus view 2
- Profile: Campus view 3
- Explore: Campus view 4
- Messages: Sringeri view
- Connections: Main campus view

## 📚 Documentation

- [MRD.md](MRD.md) - Market Requirements Document
- [Design.md](Design.md) - Design & UX Strategy
- [TechStack.md](TechStack.md) - Technical Stack Details
- [README-FRONTEND.md](README-FRONTEND.md) - Original Frontend Documentation

## 🎓 For Your Resume

This project demonstrates:
- Full-stack development skills
- Modern React development
- UI/UX design thinking
- State management
- Routing and navigation
- Responsive design
- Clean code architecture

## 🔮 Future Enhancements

- Backend integration with Node.js/Express
- MongoDB database
- Real-time messaging with Socket.io
- Image upload functionality
- Notifications system
- Advanced search filters
- Profile completion indicator
- Achievement badges

## 📝 License

Built for Jyothy Institute of Technology

---

**Built with ❤️ for JIT Community**
