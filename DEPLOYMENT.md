# Deployment Guide

This guide will help you deploy your Healthcare Management System to Netlify (frontend) and various backend hosting services.

## 🚀 Frontend Deployment (Netlify)

### Prerequisites
- GitHub account
- Netlify account (free tier available)

### Step 1: Prepare Your Repository
1. Make sure all your code is committed and pushed to GitHub
2. Ensure your `netlify.toml` file is in the root directory
3. Verify the `_redirects` file is in the `frontend/` directory

### Step 2: Deploy to Netlify

#### Option A: Using Netlify Dashboard (Recommended)
1. **Login to Netlify**: Go to [netlify.com](https://netlify.com) and sign in
2. **New Site from Git**: Click "New site from Git"
3. **Choose GitHub**: Select GitHub as your Git provider
4. **Select Repository**: Choose your healthcare management repository
5. **Configure Build Settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
6. **Environment Variables**: Add environment variables in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend-url.com/api`
7. **Deploy**: Click "Deploy site"

#### Option B: Using Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build your frontend
cd frontend && npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Step 3: Configure Custom Domain (Optional)
1. In Netlify dashboard, go to Site settings → Domain management
2. Add your custom domain
3. Configure DNS settings as instructed

---

## 🔧 Backend Deployment Options

### Option 1: Railway (Recommended)
Railway offers easy MySQL database hosting and application deployment.

1. **Sign up**: Go to [railway.app](https://railway.app)
2. **Create New Project**: Click "New Project"
3. **Deploy from GitHub**: Connect your repository
4. **Add MySQL Database**: Add a MySQL service to your project
5. **Environment Variables**: Set the following in Railway:
   ```
   DATABASE_URL=mysql://username:password@host:port/database
   PORT=3000
   NODE_ENV=production
   CORS_ORIGIN=https://your-netlify-site.netlify.app
   ```
6. **Deploy**: Railway will automatically deploy your backend

### Option 2: Heroku
1. **Install Heroku CLI**: Download from [heroku.com](https://heroku.com)
2. **Login**: `heroku login`
3. **Create App**: `heroku create your-app-name`
4. **Add MySQL**: `heroku addons:create jawsdb:kitefin`
5. **Set Environment Variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN=https://your-netlify-site.netlify.app
   ```
6. **Deploy**: 
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Option 3: DigitalOcean App Platform
1. **Create Account**: Sign up at [digitalocean.com](https://digitalocean.com)
2. **Create App**: Use the App Platform
3. **Connect Repository**: Link your GitHub repository
4. **Configure Build**: Set source directory to `backend`
5. **Add Database**: Create a managed MySQL database
6. **Environment Variables**: Configure in the dashboard
7. **Deploy**: DigitalOcean will build and deploy automatically

### Option 4: Render
1. **Sign up**: Go to [render.com](https://render.com)
2. **New Web Service**: Create from your GitHub repository
3. **Configure**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Add Database**: Create a PostgreSQL database (you'll need to modify your code)
5. **Environment Variables**: Set in Render dashboard
6. **Deploy**: Render will automatically deploy

---

## 🗄️ Database Setup

### For MySQL-compatible services:
1. **Import Schema**: Run the SQL files in your hosting service:
   ```sql
   -- Run backend/sql/schema.sql first
   -- Then run backend/sql/sample_data.sql
   ```

2. **Update Connection**: Make sure your environment variables match your database:
   ```env
   DATABASE_URL=mysql://username:password@host:port/database_name
   ```

### For PostgreSQL (if using Render/Heroku):
You'll need to convert your MySQL schema to PostgreSQL syntax.

---

## 🔄 Automatic Deployments

### GitHub Actions (Already Configured)
Your repository includes a GitHub Actions workflow that:
- Automatically builds your frontend when you push to main
- Deploys to Netlify using secrets

### Required GitHub Secrets
Add these secrets in your GitHub repository settings:
1. `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
2. `NETLIFY_SITE_ID`: Your Netlify site ID
3. `VITE_API_BASE_URL`: Your backend API URL

---

## 🌐 Environment Variables Summary

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

### Backend (.env)
```env
# Database
DATABASE_URL=mysql://username:password@host:port/database
# OR individual variables:
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name

# Server
PORT=3000
NODE_ENV=production

# CORS
CORS_ORIGIN=https://your-netlify-site.netlify.app
```

---

## 🧪 Testing Your Deployment

1. **Frontend**: Visit your Netlify URL
2. **Backend**: Test API endpoints at your backend URL
3. **Integration**: Ensure frontend can communicate with backend
4. **Database**: Verify data persistence and retrieval

---

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Ensure `CORS_ORIGIN` matches your Netlify URL exactly
   - Include both `http://` and `https://` if needed

2. **API Not Found**:
   - Check `VITE_API_BASE_URL` is correct
   - Verify backend is running and accessible

3. **Database Connection Issues**:
   - Verify `DATABASE_URL` format
   - Check database server is running
   - Ensure firewall allows connections

4. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Review build logs for specific errors

---

## 📞 Support

If you encounter issues:
1. Check the logs in your hosting service dashboard
2. Verify all environment variables are set correctly
3. Test locally first with production-like settings
4. Consult hosting service documentation

Remember to update your `frontend/_redirects` file with your actual backend URL before deploying!
