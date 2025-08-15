@echo off
REM Automated Invoice Generator Deployment Script for Windows
REM This script helps automate the deployment process

echo 🏥 Automated InvoiceGenerator - Deployment Script
echo ==================================================

set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "NC=[0m"

echo %BLUE%[INFO]%NC% Starting deployment preparation...
echo.

REM Check if git is initialized
if not exist ".git" (
    echo %RED%[ERROR]%NC% Git repository not initialized. Run: git init
    exit /b 1
)
echo %GREEN%[SUCCESS]%NC% Git repository found

REM Check if required files exist
set "error=0"
if not exist "netlify.toml" (
    echo %RED%[ERROR]%NC% Required file missing: netlify.toml
    set "error=1"
)
if not exist ".gitignore" (
    echo %RED%[ERROR]%NC% Required file missing: .gitignore
    set "error=1"
)
if not exist "frontend\_redirects" (
    echo %RED%[ERROR]%NC% Required file missing: frontend\_redirects
    set "error=1"
)
if not exist "package.json" (
    echo %RED%[ERROR]%NC% Required file missing: package.json
    set "error=1"
)

if %error%==1 (
    exit /b 1
)
echo %GREEN%[SUCCESS]%NC% All required files present

REM Check environment variables
echo %BLUE%[INFO]%NC% Checking environment variables...

if not exist "frontend\.env" (
    if exist "frontend\env.example" (
        echo %YELLOW%[WARNING]%NC% Frontend .env file not found. Creating from example...
        copy "frontend\env.example" "frontend\.env" >nul
        echo %YELLOW%[WARNING]%NC% Please update frontend\.env with your backend URL
    )
)

if not exist "backend\.env" (
    if exist "backend\env.example" (
        echo %YELLOW%[WARNING]%NC% Backend .env file not found. Creating from example...
        copy "backend\env.example" "backend\.env" >nul
        echo %YELLOW%[WARNING]%NC% Please update backend\.env with your database credentials
    )
)

echo %GREEN%[SUCCESS]%NC% Environment configuration checked

REM Install dependencies
echo %BLUE%[INFO]%NC% Installing dependencies...

if exist "package.json" (
    call npm install
)

if exist "backend\package.json" (
    cd backend
    call npm install
    cd ..
)

if exist "frontend\package.json" (
    cd frontend
    call npm install
    cd ..
)

echo %GREEN%[SUCCESS]%NC% Dependencies installed

REM Build frontend
echo %BLUE%[INFO]%NC% Building frontend...

if exist "frontend" (
    cd frontend
    call npm run build
    if errorlevel 1 (
        echo %RED%[ERROR]%NC% Frontend build failed
        cd ..
        exit /b 1
    )
    cd ..
    echo %GREEN%[SUCCESS]%NC% Frontend built successfully
) else (
    echo %RED%[ERROR]%NC% Frontend directory not found
    exit /b 1
)

REM Git operations
echo %BLUE%[INFO]%NC% Preparing Git repository...

git status --porcelain >nul 2>&1
if not errorlevel 1 (
    for /f %%i in ('git status --porcelain') do set "changes=%%i"
    if defined changes (
        git add .
        
        if "%~1"=="" (
            set /p "commit_msg=Enter commit message (or press Enter for default): "
            if "!commit_msg!"=="" (
                for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set "date=%%c-%%a-%%b"
                for /f "tokens=1-2 delims=: " %%a in ('time /t') do set "time=%%a:%%b"
                set "commit_msg=Deploy: !date! !time!"
            )
        ) else (
            set "commit_msg=%~1"
        )
        
        git commit -m "%commit_msg%"
        echo %GREEN%[SUCCESS]%NC% Changes committed
    ) else (
        echo %YELLOW%[WARNING]%NC% No changes to commit
    )
    
    git remote get-url origin >nul 2>&1
    if not errorlevel 1 (
        echo %BLUE%[INFO]%NC% Pushing to GitHub...
        git push origin main
        echo %GREEN%[SUCCESS]%NC% Pushed to GitHub
    ) else (
        echo %YELLOW%[WARNING]%NC% No remote origin found. Add your GitHub repository:
        echo %YELLOW%[WARNING]%NC% git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
        echo %YELLOW%[WARNING]%NC% git push -u origin main
    )
)

echo %GREEN%[SUCCESS]%NC% Deployment preparation complete!
echo.

REM Display deployment information
echo 🚀 Deployment Information
echo ========================
echo.
echo Frontend Deployment (Netlify):
echo   • Build directory: frontend/dist
echo   • Build command: npm run build
echo   • Deploy to: Netlify (manual or automatic via GitHub)
echo.
echo Backend Deployment Options:
echo   • Railway: https://railway.app
echo   • Heroku: https://heroku.com
echo   • DigitalOcean: https://digitalocean.com
echo   • Render: https://render.com
echo.
echo Next Steps:
echo   1. Push your code to GitHub (if not done automatically)
echo   2. Deploy frontend to Netlify
echo   3. Deploy backend to your chosen service
echo   4. Update environment variables with production URLs
echo.
echo 📚 For detailed instructions, see:
echo   • DEPLOYMENT.md - Complete deployment guide
echo   • GITHUB_SETUP.md - GitHub setup instructions
echo.

pause
