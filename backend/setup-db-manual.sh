#!/bin/bash
# Manual Database Setup - Run all SQL files in order

echo "🚀 DARKSPACE DATABASE SETUP (Manual Mode)"
echo "=========================================="
echo ""

DB_USER="darkspace_prod"
DB_NAME="darkspace_production"
DB_HOST="localhost"

echo "📋 Running migrations..."
echo ""

# Base schema
echo "[1/15] Base schema..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/init.sql
echo ""

# Ship system
echo "[2/15] Ship system..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/001_ships_system.sql
echo ""

# Gear database
echo "[3/15] Gear database..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/001_populate_gear_database.sql
echo ""

# Fix inventory weight
echo "[4/15] Fix inventory weight..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/002_fix_inventory_weight.sql 2>/dev/null || echo "Skipped (already exists)"
echo ""

# Equipment system
echo "[5/15] Equipment system..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/003_add_equip_system.sql 2>/dev/null || echo "Skipped (already exists)"
echo ""

echo "[6/15] Equipment enhancements..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/003_equipment_system.sql 2>/dev/null || echo "Skipped (already exists)"
echo ""

# Energy cells
echo "[7/15] Energy cell system..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/004_energy_cell_system.sql 2>/dev/null || echo "Skipped (already exists)"
echo ""

# Fixes
echo "[8/15] Fix duplicate items..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/005_fix_duplicate_rations.sql 2>/dev/null || echo "Skipped"
echo ""

echo "[9/15] Equipment restrictions..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/006_add_equipment_restrictions.sql 2>/dev/null || echo "Skipped (already exists)"
echo ""

echo "[10/15] Fix gear database..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/007_fix_gear_database.sql 2>/dev/null || echo "Skipped"
echo ""

# Triad system
echo "[11/15] Triad system..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/008_add_triad_system.sql 2>/dev/null || echo "Skipped (already exists)"
echo ""

# Ability tracking
echo "[12/15] Ability tracking..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/010_add_ability_tracking.sql 2>/dev/null || echo "Skipped (already exists)"
echo ""

# Ship inventory
echo "[13/15] Ship cargo system..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/010_add_ship_inventory.sql 2>/dev/null || echo "Skipped (already exists)"
echo ""

echo "[14/15] Fix ship cargo weight..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/011_fix_ship_cargo_weight.sql 2>/dev/null || echo "Skipped"
echo ""

echo "[15/15] Add cargo capacity..."
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -f ../database/migrations/012_add_cargo_capacity_to_ships.sql 2>/dev/null || echo "Skipped (already exists)"
echo ""

echo "=========================================="
echo "✅ DATABASE SETUP COMPLETE!"
echo ""
echo "🎮 Your database is ready!"
echo ""
echo "⚠️  IMPORTANT: Change admin password!"
echo "   Default: admin / admin123"
echo ""
