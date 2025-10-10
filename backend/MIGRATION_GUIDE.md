# Database Migration Guide - Archetype Restrictions

## Problem
The production database was missing critical columns in the `gear_database` table:
- `weapon_type`
- `weapon_weight_class`
- `armor_type`
- `hands_required`
- `allows_dex_modifier`
- `ac_bonus`

This caused errors when:
1. Viewing character inventory (500 error: "column g.weapon_type does not exist")
2. Creating custom items as DM
3. Creating ships
4. Equipment restrictions weren't being enforced

## Solution
Run the migration script to add these columns and populate them with appropriate default values.

---

## LOCAL DEPLOYMENT (Development)

### Prerequisites
- Node.js installed
- PostgreSQL running locally
- Backend `.env` file configured

### Steps

1. **Navigate to backend directory:**
   ```bash
   cd C:\dev\darkspace-campaign\backend
   ```

2. **Run the migration:**
   ```bash
   node migrations/add-archetype-restriction-columns.js
   ```

   OR use the helper script:
   ```bash
   node run-migration.js
   ```

3. **Verify success:**
   You should see:
   ```
   ✅ Migration completed successfully!
   📊 Summary:
      - Weapons with type set: X
      - Armor with type set: X
      - Two-handed weapons: X
   ```

4. **Test the application:**
   - Start the backend: `npm start`
   - Try viewing character inventory
   - Try creating a custom item as DM
   - Verify no 500 errors

---

## PRODUCTION DEPLOYMENT (darkspacer.com)

### Prerequisites
- SSH access to production server
- Production database credentials
- Backup of production database (CRITICAL!)

### Steps

1. **Connect to production server via SSH:**
   ```bash
   ssh your-username@darkspacer.com
   # OR
   ssh your-username@your-server-ip
   ```

2. **Navigate to the application directory:**
   ```bash
   cd /var/www/darkspacer/backend
   ```

3. **BACKUP THE DATABASE (CRITICAL!):**
   ```bash
   pg_dump -U darkspace_app -h localhost darkspace_prod > backup_before_migration_$(date +%Y%m%d_%H%M%S).sql
   ```
   
   Enter the database password when prompted.

4. **Verify you have the migration file:**
   ```bash
   ls migrations/add-archetype-restriction-columns.js
   ```
   
   If the file doesn't exist, you need to upload it first:
   ```bash
   # From your local machine:
   scp C:\dev\darkspace-campaign\backend\migrations\add-archetype-restriction-columns.js your-username@darkspacer.com:/var/www/darkspacer/backend/migrations/
   ```

5. **Set production environment variables (if not already in .env):**
   ```bash
   nano .env
   ```
   
   Ensure these are set correctly:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=darkspace_app
   DB_PASSWORD=your_production_password
   DB_NAME=darkspace_prod
   ```

6. **Run the migration:**
   ```bash
   node migrations/add-archetype-restriction-columns.js
   ```

7. **Verify success:**
   Check for the success message and summary. The migration is idempotent - you can run it multiple times safely.

8. **Restart the application:**
   ```bash
   pm2 restart darkspace-backend
   # OR if using systemd:
   sudo systemctl restart darkspace-backend
   ```

9. **Test the application:**
   - Visit https://darkspacer.com
   - Log in as a DM
   - Test inventory viewing
   - Test custom item creation
   - Test ship creation

---

## Rollback (If Something Goes Wrong)

If the migration causes issues, you can roll back:

### 1. **Restore from backup:**
```bash
psql -U darkspace_app -h localhost darkspace_prod < backup_before_migration_TIMESTAMP.sql
```

### 2. **Manual column removal (if needed):**
```sql
-- Connect to database
psql -U darkspace_app -h localhost darkspace_prod

-- Remove columns one by one
ALTER TABLE gear_database DROP COLUMN IF EXISTS weapon_type;
ALTER TABLE gear_database DROP COLUMN IF EXISTS weapon_weight_class;
ALTER TABLE gear_database DROP COLUMN IF EXISTS armor_type;
ALTER TABLE gear_database DROP COLUMN IF EXISTS hands_required;
ALTER TABLE gear_database DROP COLUMN IF EXISTS allows_dex_modifier;
ALTER TABLE gear_database DROP COLUMN IF EXISTS ac_bonus;
```

---

## What the Migration Does

1. **Adds 6 new columns to `gear_database` table:**
   - `weapon_type` (VARCHAR) - 'melee' or 'ranged'
   - `weapon_weight_class` (VARCHAR) - 'light', NULL (standard), or 'heavy'
   - `armor_type` (VARCHAR) - 'light', 'medium', 'heavy', 'energy', 'helmet', 'shield'
   - `hands_required` (INTEGER, default 1) - 1 or 2 hands
   - `allows_dex_modifier` (BOOLEAN, default true) - for armor AC calculations
   - `ac_bonus` (INTEGER) - AC bonus provided by armor

2. **Populates existing items with intelligent defaults:**
   - Weapons: Categorized by subcategory (pistol/blaster → ranged, sword/blade → melee)
   - Weight classes: Based on name/subcategory containing 'light' or 'heavy'
   - Hands required: Based on properties containing '2H' or 'two-hand'
   - Armor: Categorized by subcategory and assigned appropriate AC bonuses
   - DEX modifier: Heavy/energy armor doesn't allow DEX, others do

3. **Safe and idempotent:**
   - Checks if columns exist before adding
   - Can be run multiple times without errors
   - Uses transactions for atomic operations

---

## Verification Queries

After migration, you can verify the changes:

```sql
-- Check that columns exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'gear_database'
AND column_name IN ('weapon_type', 'weapon_weight_class', 'armor_type', 'hands_required', 'allows_dex_modifier', 'ac_bonus');

-- Check weapon classifications
SELECT name, category, subcategory, weapon_type, weapon_weight_class, hands_required
FROM gear_database
WHERE category = 'weapon'
LIMIT 10;

-- Check armor classifications
SELECT name, category, subcategory, armor_type, ac_bonus, allows_dex_modifier
FROM gear_database
WHERE category = 'armor'
LIMIT 10;

-- Count items by weapon type
SELECT weapon_type, COUNT(*) as count
FROM gear_database
WHERE weapon_type IS NOT NULL
GROUP BY weapon_type;

-- Count two-handed weapons
SELECT COUNT(*) as two_handed_weapons
FROM gear_database
WHERE hands_required = 2;
```

---

## Troubleshooting

### Error: "relation gear_database does not exist"
- The gear_database table hasn't been created yet
- Check your database schema initialization scripts

### Error: "permission denied"
- Database user doesn't have ALTER TABLE permissions
- Connect as a superuser or grant permissions:
  ```sql
  GRANT ALL PRIVILEGES ON TABLE gear_database TO darkspace_app;
  ```

### Error: "column already exists"
- Migration has already been run
- This is safe to ignore - the migration will skip existing columns

### Connection timeout
- Check database credentials in .env
- Verify PostgreSQL is running
- Check firewall rules

---

## Post-Migration Testing Checklist

- [ ] Character inventory page loads without errors
- [ ] All equipment displays with proper restrictions
- [ ] Can create custom weapons (DM)
- [ ] Can create custom armor (DM)
- [ ] Archetype restrictions are enforced when equipping
- [ ] 2H weapons block off-hand slot
- [ ] AC calculations work correctly
- [ ] Energy cells can be loaded/unloaded
- [ ] Ship creation works
- [ ] No console errors in browser
- [ ] No 500 errors in backend logs

---

## Contact

If you encounter issues:
1. Check the backend logs: `pm2 logs darkspace-backend`
2. Check PostgreSQL logs: `sudo journalctl -u postgresql`
3. Review the migration output for any warning messages
4. Verify database connection in the application

---

## Files Included

- `migrations/add-archetype-restriction-columns.js` - The main migration script
- `run-migration.js` - Helper script to run migration
- `MIGRATION_GUIDE.md` - This guide

## Next Steps After Migration

1. **Update existing custom items:** Any custom items created before this migration may need manual review to ensure proper classifications
2. **Test archetype restrictions:** Verify each archetype can only equip appropriate gear
3. **Monitor error logs:** Watch for any related errors in the first few days
4. **Document changes:** Update your game documentation if needed
