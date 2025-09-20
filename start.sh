#!/bin/bash

# OOZP.by Self-Hosting Startup Script
# This script automates the deployment process for self-hosting

set -e  # Exit on any error

echo "🚀 Starting OOZP.by Self-Hosting Deployment..."

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

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from .env.example if it exists..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_success "Created .env file from .env.example"
        print_warning "Please edit .env file with your actual configuration before running again."
        exit 1
    else
        print_error ".env file not found and no .env.example available."
        print_error "Please create a .env file with your environment variables."
        exit 1
    fi
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Build the application
print_status "Building the application..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Application built successfully"
else
    print_error "Failed to build application"
    exit 1
fi

# Verify build exists
if [ ! -d ".next" ]; then
    print_error ".next directory not found after build"
    exit 1
fi

if [ ! -f ".next/BUILD_ID" ]; then
    print_error "BUILD_ID file not found in .next directory"
    exit 1
fi

# Check if server.js exists
if [ ! -f "server.js" ]; then
    print_error "server.js file not found. Please ensure it exists."
    exit 1
fi

# Start the server
print_status "Starting the server..."
print_success "🎉 Deployment completed successfully!"
print_status "Server is starting on port ${PORT:-3000}..."
print_status "Access your application at: http://${HOSTNAME:-localhost}:${PORT:-3000}"

# Load environment variables and start server
export NODE_ENV=production
node server.js
