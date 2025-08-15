# GitHub Repository Setup Guide

Follow these steps to push your Healthcare Management System to GitHub and set up automatic deployments.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- Your project files ready

## 🚀 Step-by-Step GitHub Setup

### Step 1: Initialize Git Repository

Open your terminal in the project root directory and run:

```bash
# Navigate to your project directory
cd /path/to/HealthcareManagementSystem

# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Healthcare Management System with modern UI"
```

### Step 2: Create GitHub Repository

1. **Go to GitHub**: Visit [github.com](https://github.com) and sign in
2. **New Repository**: Click the "+" icon → "New repository"
3. **Repository Details**:
   - **Name**: `healthcare-management-system` (or your preferred name)
   - **Description**: `Modern healthcare management system with invoice generation`
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. **Create Repository**: Click "Create repository"

### Step 3: Connect Local Repository to GitHub

Copy the repository URL from GitHub, then run:

```bash
# Add GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/healthcare-management-system.git

# Verify remote was added
git remote -v

# Push to GitHub
git push -u origin main
```

> **Note**: Replace `YOUR_USERNAME` with your actual GitHub username

### Step 4: Set Up Branch Protection (Optional but Recommended)

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Branches** in the left sidebar
4. Click **Add rule**
5. Configure:
   - **Branch name pattern**: `main`
   - Check **Require pull request reviews before merging**
   - Check **Require status checks to pass before merging**

---

## 🔐 Setting Up Deployment Secrets

For automatic deployments to work, you need to add secrets to your GitHub repository:

### Step 1: Get Netlify Tokens

1. **Login to Netlify**: Go to [netlify.com](https://netlify.com)
2. **Personal Access Token**:
   - Go to User settings → Applications → Personal access tokens
   - Generate new token → Copy it
3. **Site ID**:
   - Deploy your site manually first (see DEPLOYMENT.md)
   - Go to Site settings → General → Site details
   - Copy the Site ID

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret** and add:

   ```
   Name: NETLIFY_AUTH_TOKEN
   Value: [Your Netlify personal access token]
   ```

   ```
   Name: NETLIFY_SITE_ID
   Value: [Your Netlify site ID]
   ```

   ```
   Name: VITE_API_BASE_URL
   Value: https://your-backend-api.com/api
   ```

---

## 📝 Useful Git Commands

### Daily Workflow
```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Branch Management
```bash
# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
git checkout feature-name

# Merge branch to main
git checkout main
git merge feature-name

# Delete branch
git branch -d feature-name
```

### Collaboration
```bash
# Pull latest changes
git pull origin main

# View commit history
git log --oneline

# View remote repositories
git remote -v
```

---

## 🔄 Automatic Deployment Workflow

Once set up, your workflow will be:

1. **Make Changes**: Edit your code locally
2. **Commit & Push**: 
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```
3. **Automatic Build**: GitHub Actions will automatically:
   - Build your frontend
   - Deploy to Netlify
   - Update your live site

---

## 📁 Repository Structure

Your GitHub repository will contain:

```
healthcare-management-system/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── backend/                    # Backend API code
├── frontend/                   # Frontend React code
├── .gitignore                  # Files to ignore
├── netlify.toml               # Netlify configuration
├── README.md                  # Project documentation
├── DEPLOYMENT.md              # Deployment instructions
├── GITHUB_SETUP.md           # This file
├── LICENSE                    # MIT License
└── package.json              # Root package.json
```

---

## 🛠️ Troubleshooting

### Common Issues:

**1. "Permission denied" error:**
```bash
# Check if you're authenticated
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Use HTTPS with token or set up SSH keys
```

**2. "Remote already exists" error:**
```bash
# Remove existing remote and add new one
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

**3. "Branch 'main' doesn't exist" error:**
```bash
# Create main branch
git branch -M main
git push -u origin main
```

**4. Merge conflicts:**
```bash
# Pull latest changes first
git pull origin main

# Resolve conflicts in your editor
# Then commit the resolution
git add .
git commit -m "Resolve merge conflicts"
git push
```

---

## 🎯 Next Steps

After pushing to GitHub:

1. **Deploy Frontend**: Follow the DEPLOYMENT.md guide to deploy to Netlify
2. **Deploy Backend**: Choose a backend hosting service and deploy
3. **Update API URLs**: Update environment variables with production URLs
4. **Test Everything**: Ensure the deployed application works correctly
5. **Custom Domain**: Set up a custom domain if desired

---

## 📚 Additional Resources

- [GitHub Documentation](https://docs.github.com/)
- [Git Cheat Sheet](https://git-scm.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Netlify Documentation](https://docs.netlify.com/)

Happy coding! 🎉
