# JITConnect - Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy React apps built with Vite.

### Method 1: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to React project
cd jitconnect-react

# Deploy
vercel
```

Follow the prompts:
1. Set up and deploy? **Y**
2. Which scope? Select your account
3. Link to existing project? **N**
4. Project name? **jitconnect** (or your choice)
5. Directory? **./jitconnect-react**
6. Override settings? **N**

Your app will be live at: `https://jitconnect.vercel.app` (or similar)

### Method 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: **Vite**
   - Root Directory: **jitconnect-react**
   - Build Command: **npm run build**
   - Output Directory: **dist**
6. Click "Deploy"

## 🌐 Deploy to Netlify

### Method 1: Drag and Drop

```bash
# Build the project
cd jitconnect-react
npm run build
```

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist/` folder
3. Your site is live!

### Method 2: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to React project
cd jitconnect-react

# Build
npm run build

# Deploy
netlify deploy --prod
```

### Method 3: Connect to Git

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. Configure:
   - Base directory: **jitconnect-react**
   - Build command: **npm run build**
   - Publish directory: **jitconnect-react/dist**
6. Click "Deploy site"

## 🔧 Environment Variables

If you add backend integration later, you'll need environment variables:

### Vercel
1. Go to Project Settings
2. Click "Environment Variables"
3. Add variables:
   - `VITE_API_URL`
   - `VITE_BACKEND_URL`

### Netlify
1. Go to Site Settings
2. Click "Environment Variables"
3. Add variables

### Local Development
Create `.env` file in `jitconnect-react/`:
```env
VITE_API_URL=http://localhost:5000
```

## 📱 Custom Domain

### Vercel
1. Go to Project Settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to Site Settings
2. Click "Domain Management"
3. Add custom domain
4. Update DNS records

## 🔒 HTTPS

Both Vercel and Netlify provide free HTTPS automatically!

## 🌍 Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Update vite.config.js:
export default defineConfig({
  base: '/JITConnect/',
  plugins: [react()],
})

# Deploy
npm run deploy
```

Your site will be at: `https://yourusername.github.io/JITConnect/`

## 🐳 Deploy with Docker

Create `Dockerfile` in `jitconnect-react/`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t jitconnect .
docker run -p 80:80 jitconnect
```

## ☁️ Deploy to AWS S3 + CloudFront

```bash
# Build
npm run build

# Install AWS CLI
# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Configure CloudFront distribution
# Point to S3 bucket
```

## 🔍 Pre-Deployment Checklist

- [ ] Test locally (`npm run dev`)
- [ ] Build successfully (`npm run build`)
- [ ] No console errors
- [ ] All images loading correctly
- [ ] All routes working
- [ ] Forms submitting correctly
- [ ] LocalStorage working
- [ ] Responsive on mobile
- [ ] Cross-browser testing

## 🐛 Common Deployment Issues

### Issue: Images not loading
**Solution**: Make sure images are in `public/assets/` and paths use `/assets/` prefix

### Issue: Routes not working (404 on refresh)
**Solution**: 
- Vercel: Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
- Netlify: Add `public/_redirects`:
```
/*    /index.html   200
```

### Issue: Build fails
**Solution**: 
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Issue: Environment variables not working
**Solution**: Make sure variables start with `VITE_` prefix

## 📊 Performance Optimization

### Before Deployment

1. **Optimize Images**
```bash
# Install image optimizer
npm install --save-dev vite-plugin-imagemin

# Add to vite.config.js
import viteImagemin from 'vite-plugin-imagemin'

plugins: [
  react(),
  viteImagemin({
    gifsicle: { optimizationLevel: 7 },
    optipng: { optimizationLevel: 7 },
    mozjpeg: { quality: 80 },
  })
]
```

2. **Code Splitting**
Already handled by Vite automatically!

3. **Lazy Loading**
```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<div>Loading...</div>}>
  <Dashboard />
</Suspense>
```

## 🎯 Post-Deployment

1. **Test the live site**
   - Check all pages
   - Test all features
   - Verify images load
   - Test on mobile

2. **Monitor Performance**
   - Use Lighthouse
   - Check PageSpeed Insights
   - Monitor Core Web Vitals

3. **Set up Analytics** (Optional)
   - Google Analytics
   - Vercel Analytics
   - Netlify Analytics

## 🔄 Continuous Deployment

Both Vercel and Netlify support automatic deployments:

1. Push to GitHub
2. Automatic build triggered
3. Site updated automatically

Configure in:
- Vercel: Project Settings → Git
- Netlify: Site Settings → Build & Deploy

## 📝 Deployment URLs

After deployment, you'll get URLs like:

- **Vercel**: `https://jitconnect.vercel.app`
- **Netlify**: `https://jitconnect.netlify.app`
- **GitHub Pages**: `https://yourusername.github.io/JITConnect/`

## 🎓 Add to Resume

Once deployed, add to your resume:

```
JITConnect - Social Networking Platform
• Deployed React application serving 1000+ potential users
• Live at: https://jitconnect.vercel.app
• Tech Stack: React, Vite, React Router, LocalStorage
```

---

**Ready to Deploy! 🚀**

Choose your platform and follow the steps above. Vercel is recommended for beginners!
