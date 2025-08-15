#!/bin/bash

# Automated Invoice Generator Script
# This script helps automate the deployment process

set -e  # Exit on any error

echo "🏥 Automated InvoiceGenerator - Deployment Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is initialized
check_git() {
    if [ ! -d ".git" ]; then
        print_error "Git repository not initialized. Run: git init"
        exit 1
    fi
    print_success "Git repository found"
}

# Check if all necessary files exist
check_files() {
    local files=("netlify.toml" ".gitignore" "frontend/_redirects" "package.json")
    
    for file in "${files[@]}"; do
        if [ ! -f "$file" ]; then
            print_error "Required file missing: $file"
            exit 1
        fi
    done
    print_success "All required files present"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Root dependencies
    if [ -f "package.json" ]; then
        npm install
    fi
    
    # Backend dependencies
    if [ -d "backend" ] && [ -f "backend/package.json" ]; then
        cd backend
        npm install
        cd ..
    fi
    
    # Frontend dependencies
    if [ -d "frontend" ] && [ -f "frontend/package.json" ]; then
        cd frontend
        npm install
        cd ..
    fi
    
    print_success "Dependencies installed"
}

# Build frontend
build_frontend() {
    print_status "Building frontend..."
    
    if [ -d "frontend" ]; then
        cd frontend
        npm run build
        cd ..
        print_success "Frontend built successfully"
    else
        print_error "Frontend directory not found"
        exit 1
    fi
}

# Git operations
git_operations() {
    print_status "Preparing Git repository..."
    
    # Check if there are changes to commit
    if [ -n "$(git status --porcelain)" ]; then
        git add .
        
        # Get commit message from user or use default
        if [ -n "$1" ]; then
            COMMIT_MSG="$1"
        else
            echo -n "Enter commit message (or press Enter for default): "
            read COMMIT_MSG
            if [ -z "$COMMIT_MSG" ]; then
                COMMIT_MSG="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
            fi
        fi
        
        git commit -m "$COMMIT_MSG"
        print_success "Changes committed"
    else
        print_warning "No changes to commit"
    fi
    
    # Check if remote origin exists
    if git remote get-url origin > /dev/null 2>&1; then
        print_status "Pushing to GitHub..."
        git push origin main
        print_success "Pushed to GitHub"
    else
        print_warning "No remote origin found. Add your GitHub repository:"
        print_warning "git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
        print_warning "git push -u origin main"
    fi
}

# Check environment variables
check_env_vars() {
    print_status "Checking environment variables..."
    
    # Check frontend env
    if [ ! -f "frontend/.env" ]; then
        if [ -f "frontend/env.example" ]; then
            print_warning "Frontend .env file not found. Creating from example..."
            cp frontend/env.example frontend/.env
            print_warning "Please update frontend/.env with your backend URL"
        fi
    fi
    
    # Check backend env
    if [ ! -f "backend/.env" ]; then
        if [ -f "backend/env.example" ]; then
            print_warning "Backend .env file not found. Creating from example..."
            cp backend/env.example backend/.env
            print_warning "Please update backend/.env with your database credentials"
        fi
    fi
    
    print_success "Environment configuration checked"
}

# Display deployment information
show_deployment_info() {
    echo ""
    echo "🚀 Deployment Information"
    echo "========================"
    echo ""
    echo "Frontend Deployment (Netlify):"
    echo "  • Build directory: frontend/dist"
    echo "  • Build command: npm run build"
    echo "  • Deploy to: Netlify (manual or automatic via GitHub)"
    echo ""
    echo "Backend Deployment Options:"
    echo "  • Railway: https://railway.app"
    echo "  • Heroku: https://heroku.com"
    echo "  • DigitalOcean: https://digitalocean.com"
    echo "  • Render: https://render.com"
    echo ""
    echo "Next Steps:"
    echo "  1. Push your code to GitHub (if not done automatically)"
    echo "  2. Deploy frontend to Netlify"
    echo "  3. Deploy backend to your chosen service"
    echo "  4. Update environment variables with production URLs"
    echo ""
    echo "📚 For detailed instructions, see:"
    echo "  • DEPLOYMENT.md - Complete deployment guide"
    echo "  • GITHUB_SETUP.md - GitHub setup instructions"
    echo ""
}

# Main deployment function
main() {
    echo "Starting deployment preparation..."
    echo ""
    
    # Run checks and preparations
    check_git
    check_files
    check_env_vars
    install_dependencies
    build_frontend
    git_operations "$1"
    
    print_success "Deployment preparation complete!"
    show_deployment_info
}

# Help function
show_help() {
    echo "Healthcare Management System - Deployment Script"
    echo ""
    echo "Usage: $0 [OPTIONS] [COMMIT_MESSAGE]"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -b, --build    Only build the frontend"
    echo "  -c, --check    Only run checks"
    echo ""
    echo "Examples:"
    echo "  $0                           # Full deployment preparation"
    echo "  $0 \"Fix: Update UI components\" # With custom commit message"
    echo "  $0 --build                   # Only build frontend"
    echo "  $0 --check                   # Only run checks"
}

# Parse command line arguments
case "$1" in
    -h|--help)
        show_help
        exit 0
        ;;
    -b|--build)
        print_status "Building frontend only..."
        build_frontend
        print_success "Frontend build complete!"
        exit 0
        ;;
    -c|--check)
        print_status "Running checks only..."
        check_git
        check_files
        check_env_vars
        print_success "All checks passed!"
        exit 0
        ;;
    *)
        main "$1"
        ;;
esac
