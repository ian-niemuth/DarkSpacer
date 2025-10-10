#!/bin/bash
# Production Database Migration Script for Darkspace
# Syncs production database with development schema

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Production database credentials
export DB_USER="${DB_USER:-darkspace_prod}"
export DB_PASSWORD="${DB_PASSWORD:-0be6d45d0906e00de7b48bf0efc7583c6036b5f4c9ea25a6aa}"
export DB_HOST="${DB_HOST:-127.0.0.1}"
export DB_PORT="${DB_PORT:-5432}"
export DB_NAME="${DB_NAME:-darkspace_production}"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          🚀 DARKSPACE PRODUCTION MIGRATION              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${CYAN}Target Database:${NC} ${DB_NAME}@${DB_HOST}"
echo -e "${CYAN}User:${NC} ${DB_USER}"
echo ""

# Confirm before proceeding
read -p "Continue with production migration? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo -e "${YELLOW}Migration cancelled${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}Creating backup before migration...${NC}"

# Create backup
BACKUP_FILE="darkspace_backup_$(date +%Y%m%d_%H%M%S).sql"
PGPASSWORD="${DB_PASSWORD}" pg_dump \
    -U "${DB_USER}" \
    -h "${DB_HOST}" \
    -p "${DB_PORT}" \
    -d "${DB_NAME}" \
    -F c \
    -f "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backup created: ${BACKUP_FILE}${NC}"
else
    echo -e "${RED}✗ Backup failed! Aborting migration.${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Running migration consolidation script...${NC}"
echo ""

# Run the consolidation script
node consolidate-migrations.js run

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║              ✓ MIGRATION COMPLETED SUCCESSFULLY         ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}Backup location: ${BACKUP_FILE}${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "  1. Test your application thoroughly"
    echo "  2. Run: node consolidate-migrations.js report"
    echo "  3. If issues arise, restore with:"
    echo "     PGPASSWORD='${DB_PASSWORD}' pg_restore -U ${DB_USER} -h ${DB_HOST} -d ${DB_NAME} -c ${BACKUP_FILE}"
else
    echo ""
    echo -e "${RED}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║              ✗ MIGRATION FAILED                         ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}To restore backup:${NC}"
    echo "  PGPASSWORD='${DB_PASSWORD}' pg_restore -U ${DB_USER} -h ${DB_HOST} -d ${DB_NAME} -c ${BACKUP_FILE}"
    exit 1
fi
