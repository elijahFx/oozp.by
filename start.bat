@echo off
REM OOZP.by Self-Hosting Startup Script for Windows
REM This script automates the deployment process for self-hosting

echo 🚀 Starting OOZP.by Self-Hosting Deployment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [INFO] Node.js version: 
node --version
echo [INFO] npm version: 
npm --version

REM Check if .env file exists
if not exist ".env" (
    echo [WARNING] .env file not found. Creating from .env.example if it exists...
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo [SUCCESS] Created .env file from .env.example
        echo [WARNING] Please edit .env file with your actual configuration before running again.
        pause
        exit /b 1
    ) else (
        echo [ERROR] .env file not found and no .env.example available.
        echo [ERROR] Please create a .env file with your environment variables.
        pause
        exit /b 1
    )
)

REM Install dependencies
echo [INFO] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully

REM Build the application
echo [INFO] Building the application...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build application
    pause
    exit /b 1
)
echo [SUCCESS] Application built successfully

REM Verify build exists
if not exist ".next" (
    echo [ERROR] .next directory not found after build
    pause
    exit /b 1
)

if not exist ".next\BUILD_ID" (
    echo [ERROR] BUILD_ID file not found in .next directory
    pause
    exit /b 1
)

REM Check if server.js exists
if not exist "server.js" (
    echo [ERROR] server.js file not found. Please ensure it exists.
    pause
    exit /b 1
)

REM Start the server
echo [INFO] Starting the server...
echo [SUCCESS] 🎉 Deployment completed successfully!
echo [INFO] Server is starting on port %PORT% (default: 3000)...
echo [INFO] Access your application at: http://%HOSTNAME%:%PORT% (default: http://localhost:3000)

REM Set environment and start server
set NODE_ENV=production
node server.js
