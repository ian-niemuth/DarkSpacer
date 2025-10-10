#!/bin/bash
# Quick deployment script for Lightsail
# Run this on your Lightsail server after initial setup

set -e  # Exit on error

echo "🚀 Starting Darkspace deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Go to app directory
cd ~/darkspace-campaign || exit

echo -e "${YELLOW}📥 Pulling latest code...${NC}"
git pull

# Update backend
echo -e "${YELLOW}🔧 Updating backend...${NC}"
cd backend
npm install
echo -e "${GREEN}✅ Backend dependencies updated${NC}"

# Run migrations
echo -e "${YELLOW}🗄️  Running database migrations...${NC}"
if [ -f "src/scripts/runMigration.js" ]; then
    node src/scripts/runMigration.js
fi

# Rebuild frontend
echo -e "${YELLOW}🎨 Building frontend...${NC}"
cd ../frontend
npm install
npm run build
echo -e "${GREEN}✅ Frontend built${NC}"

# Restart backend
echo -e "${YELLOW}♻️  Restarting backend API...${NC}"
pm2 restart darkspace-api

# Check status
echo -e "${YELLOW}📊 Checking application status...${NC}"
pm2 status

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Backend logs: pm2 logs darkspace-api"
echo "Visit: https://darkspacer.com"
