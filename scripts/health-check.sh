#!/bin/bash
# Health check script for Darkspace Campaign Manager
# Run this to verify all services are working correctly

echo "🏥 Darkspace Health Check"
echo "========================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for failed checks
FAILED=0

# Check 1: Backend Process
echo -n "🔍 Backend Process (PM2)... "
if pm2 list | grep -q "darkspace-api.*online"; then
    echo -e "${GREEN}✅ Running${NC}"
else
    echo -e "${RED}❌ Not running${NC}"
    FAILED=$((FAILED + 1))
fi

# Check 2: Backend API Health
echo -n "🔍 Backend API Health... "
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Responding${NC}"
else
    echo -e "${RED}❌ Not responding${NC}"
    FAILED=$((FAILED + 1))
fi

# Check 3: PostgreSQL
echo -n "🔍 PostgreSQL Service... "
if systemctl is-active --quiet postgresql; then
    echo -e "${GREEN}✅ Running${NC}"
else
    echo -e "${RED}❌ Not running${NC}"
    FAILED=$((FAILED + 1))
fi

# Check 4: Database Connection
echo -n "🔍 Database Connection... "
if PGPASSWORD=darkspace_password psql -U darkspace_app -d darkspace_prod -h localhost -c "SELECT 1" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Connected${NC}"
else
    echo -e "${YELLOW}⚠️  Could not verify (check password)${NC}"
fi

# Check 5: Nginx
echo -n "🔍 Nginx Service... "
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Running${NC}"
else
    echo -e "${RED}❌ Not running${NC}"
    FAILED=$((FAILED + 1))
fi

# Check 6: Frontend Files
echo -n "🔍 Frontend Build... "
if [ -d "/home/ubuntu/darkspace-campaign/frontend/dist" ]; then
    echo -e "${GREEN}✅ Found${NC}"
else
    echo -e "${RED}❌ Not found${NC}"
    FAILED=$((FAILED + 1))
fi

# Check 7: SSL Certificate
echo -n "🔍 SSL Certificate... "
if sudo certbot certificates 2>/dev/null | grep -q "darkspacer.com"; then
    echo -e "${GREEN}✅ Installed${NC}"
else
    echo -e "${YELLOW}⚠️  Not found or not checked${NC}"
fi

# Check 8: Disk Space
echo -n "🔍 Disk Space... "
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    echo -e "${GREEN}✅ ${DISK_USAGE}% used${NC}"
elif [ "$DISK_USAGE" -lt 90 ]; then
    echo -e "${YELLOW}⚠️  ${DISK_USAGE}% used${NC}"
else
    echo -e "${RED}❌ ${DISK_USAGE}% used - Low space!${NC}"
fi

# Check 9: Memory
echo -n "🔍 Memory Usage... "
MEM_USAGE=$(free | awk '/Mem:/ {printf "%.0f", $3/$2 * 100}')
if [ "$MEM_USAGE" -lt 80 ]; then
    echo -e "${GREEN}✅ ${MEM_USAGE}% used${NC}"
elif [ "$MEM_USAGE" -lt 90 ]; then
    echo -e "${YELLOW}⚠️  ${MEM_USAGE}% used${NC}"
else
    echo -e "${RED}❌ ${MEM_USAGE}% used - High memory!${NC}"
fi

echo ""
echo "========================="

# Summary
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All critical checks passed!${NC}"
    echo ""
    echo "Your Darkspace Campaign Manager is healthy! 🚀"
    exit 0
else
    echo -e "${RED}⚠️  $FAILED critical check(s) failed${NC}"
    echo ""
    echo "Please review the issues above."
    echo "Common fixes:"
    echo "  - Start backend: pm2 start ~/darkspace-campaign/backend/src/server.js --name darkspace-api"
    echo "  - Start nginx: sudo systemctl start nginx"
    echo "  - Start postgres: sudo systemctl start postgresql"
    echo "  - Check logs: pm2 logs darkspace-api"
    exit 1
fi
