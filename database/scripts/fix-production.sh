#!/bin/bash
# Production Database Fix Script
# Run this on your production server to fix common database issues

echo "=================================="
echo "  DARKSPACE DATABASE QUICK FIX"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "verify-database.js" ]; then
    echo "ERROR: Please run this from the database/scripts directory"
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    exit 1
fi

# Step 1: Diagnose
echo "Step 1: Diagnosing issues..."
node quick-fix-prod.js

echo ""
echo "-----------------------------------"
echo ""

# Ask for confirmation
read -p "Do you want to run migrations to fix these issues? (yes/no): " -r
echo ""

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "Aborted. No changes made."
    exit 0
fi

# Backup reminder
echo "⚠️  IMPORTANT: Make sure you have a database backup!"
read -p "Have you backed up the database? (yes/no): " -r
echo ""

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "Please backup first:"
    echo "  pg_dump $DB_NAME > backup_\$(date +%Y%m%d).sql"
    exit 0
fi

# Step 2: Run migrations
echo "Step 2: Running migrations..."
node migrate-database.js

# Step 3: Test
echo ""
echo "Step 3: Testing functionality..."
node quick-fix-prod.js --test-only

echo ""
echo "=================================="
echo "  DONE!"
echo "=================================="
echo ""
echo "If all tests passed, your production database is now fixed."
echo "If there are still issues, check the error messages above."
echo ""
