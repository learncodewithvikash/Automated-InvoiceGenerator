# 🚀 Quick Start Guide

Get your Automated InvoiceGenerator up and running in minutes!

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)
- [MySQL](https://mysql.com/) database
- [GitHub](https://github.com/) account
- [Netlify](https://netlify.com/) account (free)

## ⚡ Option 1: Automated Setup (Recommended)

### 1. Run Deployment Script

**Windows:**
```bash
scripts\deploy.bat
```

**Linux/Mac:**
```bash
./scripts/deploy.sh
```

This script will:
- ✅ Check all required files
- ✅ Install dependencies
- ✅ Create environment files
- ✅ Build the frontend
- ✅ Prepare Git repository

### 2. Push to GitHub

```bash
# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/Automated-InvoiceGenerator.git

# Push to GitHub
git push -u origin main
```

## 🔧 Option 2: Manual Setup

### 1. Install Dependencies

```bash
# Install all dependencies
npm run install:all

# Or manually:
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment Setup

**Backend** - Create `backend/.env`:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=healthcare_management
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Database Setup

```bash
# Create database and import schema
mysql -u your_username -p
CREATE DATABASE healthcare_management;
exit

# Import schema
mysql -u your_username -p healthcare_management < backend/sql/schema.sql
mysql -u your_username -p healthcare_management < backend/sql/sample_data.sql
```

### 4. Run Locally

```bash
# Option A: Run both frontend and backend
npm run dev

# Option B: Run separately
# Terminal 1 (Backend)
npm run dev:backend

# Terminal 2 (Frontend)
npm run dev:frontend
```

Access your app at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🌐 Deploy to Production

### 1. GitHub Setup

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### 2. Frontend Deployment (Netlify)

1. **Login to Netlify**: [netlify.com](https://netlify.com)
2. **New Site from Git**: Choose your GitHub repository
3. **Build Settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. **Environment Variables**:
   - `VITE_API_BASE_URL`: Your backend API URL
5. **Deploy!**

### 3. Backend Deployment (Railway - Recommended)

1. **Sign up**: [railway.app](https://railway.app)
2. **New Project**: Deploy from GitHub
3. **Add Database**: Add MySQL service
4. **Environment Variables**:
   ```
   DATABASE_URL=mysql://user:pass@host:port/db
   PORT=3000
   NODE_ENV=production
   CORS_ORIGIN=https://your-netlify-site.netlify.app
   ```
5. **Deploy!**

## 🎯 Quick Commands Reference

### Development
```bash
npm run dev              # Run both frontend & backend
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only
npm run build           # Build frontend for production
```

### Deployment
```bash
# Windows
scripts\deploy.bat

# Linux/Mac  
./scripts/deploy.sh

# Manual build
cd frontend && npm run build
```

### Git Workflow
```bash
git add .
git commit -m "Your message"
git push
```

## 🔍 Verify Everything Works

### ✅ Local Development Checklist
- [ ] Backend starts without errors
- [ ] Frontend loads at localhost:5173
- [ ] Can create clients
- [ ] Can create invoices
- [ ] Can download PDFs
- [ ] Database saves data

### ✅ Production Deployment Checklist
- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Netlify
- [ ] Backend deployed to Railway/Heroku
- [ ] Environment variables configured
- [ ] Database schema imported
- [ ] CORS configured correctly
- [ ] All features work in production

## 🆘 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution**: Run `npm install` in the correct directory

### Issue: Database connection fails
**Solution**: Check your database credentials in `.env`

### Issue: CORS errors in production
**Solution**: Update `CORS_ORIGIN` with your Netlify URL

### Issue: Frontend can't reach API
**Solution**: Update `VITE_API_BASE_URL` with your backend URL

### Issue: Build fails
**Solution**: Check Node.js version (requires v16+)

## 📚 Need More Help?

- 📖 **[Full README](README.md)** - Complete project documentation
- 🚀 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed deployment guide
- 🐙 **[GITHUB_SETUP.md](GITHUB_SETUP.md)** - GitHub setup instructions

## 🎉 That's It!

Your Healthcare Management System should now be running! 

🏥 **Happy Healthcare Managing!** 🏥
