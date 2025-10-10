#!/bin/bash
# Complete Database Migration Script
# Run from /var/www/darkspacer/backend directory

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Database credentials
DB_PASSWORD='0be6d45d0906e00de7b48bf0efc7583c6036b5f4c9ea25a6aa'
DB_USER='darkspace_prod'
DB_NAME='darkspace_production'
DB_HOST='127.0.0.1'

echo "🚀 DARKSPACE COMPLETE DATABASE MIGRATION"
echo "=========================================="
echo ""

# Function to run migration
run_migration() {
    local description=$1
    local file=$2
    local required=${3:-false}
    
    echo -e "${YELLOW}Running: $description${NC}"
    
    if [ ! -f "$file" ]; then
        echo -e "${RED}   ❌ File not found: $file${NC}"
        if [ "$required" = true ]; then
            echo -e "${RED}   ⚠️  This is a required migration. Exiting.${NC}"
            exit 1
        fi
        echo ""
        return 1
    fi
    
    PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -f "$file" 2>&1 | while IFS= read -r line; do
        if echo "$line" | grep -qi "error\|fatal"; then
            if echo "$line" | grep -qi "already exists"; then
                echo -e "${YELLOW}   ⏭️  Already exists, skipping...${NC}"
            else
                echo -e "${RED}   ⚠️  $line${NC}"
            fi
        fi
    done
    
    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        echo -e "${GREEN}   ✅ Success!${NC}"
    else
        if [ "$required" = true ]; then
            echo -e "${RED}   ❌ Failed!${NC}"
            exit 1
        else
            echo -e "${YELLOW}   ⏭️  Skipping (non-critical)${NC}"
        fi
    fi
    echo ""
}

# Check if we're in the right directory
if [ ! -d "../database" ]; then
    echo -e "${RED}❌ Error: Must be run from /var/www/darkspacer/backend directory${NC}"
    echo "Current directory: $(pwd)"
    echo "Please run: cd /var/www/darkspacer/backend"
    exit 1
fi

echo "📋 Starting migrations..."
echo ""

# 1. Base Schema (REQUIRED)
run_migration "Base schema (users, characters, inventory)" "../database/init.sql" true

# 2. Ship System (REQUIRED)
run_migration "Ship system tables" "../database/migrations/001_ships_system.sql" true

# 3. Gear Database (REQUIRED)
run_migration "Equipment database population" "../database/migrations/001_populate_gear_database.sql" true

# 4. Inventory Fixes
run_migration "Fix inventory weight system" "../database/migrations/002_fix_inventory_weight.sql" false

# 5. Space Exploration (Optional)
run_migration "Space exploration system" "../database/migrations/002_space_exploration.sql" false

# 6. Equipment System
run_migration "Equipment system" "../database/migrations/003_add_equip_system.sql" false

# 7. Equipment Enhancements
run_migration "Equipment system enhancements" "../database/migrations/003_equipment_system.sql" false

# 8. Energy Cell System
run_migration "Energy cell system" "../database/migrations/004_energy_cell_system.sql" false

# 9. Fix Duplicate Rations
run_migration "Fix duplicate rations" "../database/migrations/005_fix_duplicate_rations.sql" false

# 10. Equipment Restrictions
run_migration "Equipment restrictions" "../database/migrations/006_add_equipment_restrictions.sql" false

# 11. Fix Gear Database
run_migration "Fix gear database" "../database/migrations/007_fix_gear_database.sql" false

# 12. Triad System
run_migration "Triad system for Wise archetype" "../database/migrations/008_add_triad_system.sql" false

# 13. Fix Wise Character AC
run_migration "Fix Wise character AC calculation" "../database/migrations/008_fix_wise_character_ac.sql" false

# 14. Fix All Character AC
run_migration "Fix all character AC calculations" "../database/migrations/009_fix_all_character_ac.sql" false

# 15. Ability Tracking
run_migration "Ability tracking system" "../database/migrations/010_add_ability_tracking.sql" false

# 16. Ship Inventory
run_migration "Ship cargo/inventory system" "../database/migrations/010_add_ship_inventory.sql" false

# 17. Fix Ship Cargo Weight
run_migration "Fix ship cargo weight calculations" "../database/migrations/011_fix_ship_cargo_weight.sql" false

# 18. Add Cargo Capacity
run_migration "Add cargo capacity to ships" "../database/migrations/012_add_cargo_capacity_to_ships.sql" false

echo "=========================================="
echo -e "${GREEN}✅ MIGRATION COMPLETE!${NC}"
echo ""

# Verify database
echo "🔍 Verifying database..."
echo ""

echo "Tables created:"
PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -c "\dt" | grep -E "users|characters|ships|inventory"

echo ""
echo "Admin user exists:"
PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -c "SELECT username, is_admin FROM users WHERE is_admin = true;" 2>/dev/null

echo ""
echo "=========================================="
echo -e "${GREEN}🎮 Database is ready for production!${NC}"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Change the admin password!${NC}"
echo "   Default: admin / admin123"
echo ""
echo "Next steps:"
echo "1. pm2 restart darkspace-api"
echo "2. pm2 logs darkspace-api"
echo "3. Test registration at https://darkspacer.com"
echo ""
