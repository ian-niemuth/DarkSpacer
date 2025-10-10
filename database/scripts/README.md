# Database Management Scripts

These scripts help you manage, verify, and migrate your Darkspace Campaign database.

## Prerequisites

```bash
npm install pg dotenv
```

## Scripts Overview

### 1. `verify-database.js` - Check Database Structure

Verifies that your database has all required tables and columns.

```bash
# Basic verification
node verify-database.js

# Detailed output (shows all columns)
node verify-database.js --detailed
```

**What it checks:**
- All required tables exist
- All required columns exist
- Data population (row counts)
- Missing or extra columns

**Use this first** to understand what's wrong with your database.

---

### 2. `migrate-database.js` - Run Migrations

Applies all pending migrations to bring your database up to date.

```bash
# Run all pending migrations
node migrate-database.js

# Dry run (see what would happen)
node migrate-database.js --dry-run

# Force re-run all migrations
node migrate-database.js --force

# Run specific migration
node migrate-database.js --migration=001
```

**What it does:**
- Tracks completed migrations
- Runs migrations in order
- Stops on first error
- Shows progress and results

**Use this** after verifying to fix structural issues.

---

### 3. `compare-databases.js` - Compare Local vs Production

Compares your local database with production to see differences.

```bash
node compare-databases.js
```

**Requirements:**
- Create `backend/.env.production` with production database credentials:
  ```
  DB_HOST=your-prod-host
  DB_NAME=your-prod-database
  DB_USER=your-prod-user
  DB_PASSWORD=your-prod-password
  DB_PORT=5432
  ```

**What it shows:**
- Missing tables
- Missing columns
- Row count differences
- Side-by-side comparison

---

## Quick Troubleshooting Guide

### Issue: "Failed to fetch weapons" or "gear_database errors"

**Diagnosis:**
```bash
node verify-database.js
```

**Fix:**
```bash
node migrate-database.js
```

**What's happening:**
- Missing `gear_database` columns: `subcategory`, `is_custom`, `allows_dex_modifier`, `base_ac`
- Missing data population
- Run migration `001_populate_gear_database.sql`

---

### Issue: "Failed to create custom items"

**Diagnosis:**
```bash
node verify-database.js
```

**Fix:**
```bash
node migrate-database.js
```

**What's happening:**
- Missing `is_custom` column in `gear_database`
- Run migration `001_populate_gear_database.sql`

---

### Issue: "Failed to create ships" or "ship-related errors"

**Diagnosis:**
```bash
node verify-database.js
```

**Fix:**
```bash
node migrate-database.js
```

**What's happening:**
- Missing ship-related tables: `component_templates`, `ship_components`, etc.
- Missing columns in `ships` table
- Run migration `001_ships_system.sql` and related migrations

---

### Issue: "Production database doesn't match local"

**Diagnosis:**
```bash
node compare-databases.js
```

**Fix:**
1. Backup production database first!
2. Set environment to production (or SSH into production)
3. Run migrations:
   ```bash
   node migrate-database.js
   ```

---

## Production Deployment Workflow

### Step 1: Verify Local Database
```bash
cd database/scripts
node verify-database.js
```

Ensure local is perfect before comparing.

### Step 2: Compare with Production
```bash
node compare-databases.js
```

This shows you exactly what's different.

### Step 3: Run Migrations on Production

**Option A: SSH into production server**
```bash
ssh your-server
cd /path/to/darkspace-campaign/database/scripts
NODE_ENV=production node migrate-database.js
```

**Option B: Run remotely**
Create `backend/.env.production` locally with production credentials, then:
```bash
# This uses production database credentials from .env.production
node migrate-database.js
```

⚠️ **Important:** Always backup production database before running migrations!

### Step 4: Verify Production
```bash
# Set DATABASE_URL to production in your .env temporarily
node verify-database.js
```

---

## Environment Setup

### Local Development (.env)
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=darkspace
DB_USER=postgres
DB_PASSWORD=your_local_password
```

### Production (backend/.env.production)
```bash
DB_HOST=your-lightsail-instance.amazonaws.com
DB_PORT=5432
DB_NAME=darkspace_prod
DB_USER=darkspace_user
DB_PASSWORD=your_production_password
```

---

## Migration Best Practices

1. **Always backup before migrating production**
   ```bash
   pg_dump darkspace_prod > backup_$(date +%Y%m%d).sql
   ```

2. **Test migrations locally first**
   ```bash
   # Create a copy of production data
   pg_dump prod_db > prod_backup.sql
   psql local_test_db < prod_backup.sql
   
   # Test migration
   node migrate-database.js
   ```

3. **Use dry-run to preview**
   ```bash
   node migrate-database.js --dry-run
   ```

4. **Run migrations during low-traffic periods**

5. **Monitor logs after migration**
   ```bash
   pm2 logs darkspace-api
   ```

---

## Common Error Solutions

### Error: "relation 'gear_database' does not exist"
**Solution:** Run init.sql first, then migrations
```bash
psql darkspace < ../init.sql
node migrate-database.js
```

### Error: "column 'is_custom' does not exist"
**Solution:** Run migration 001
```bash
node migrate-database.js --migration=001
```

### Error: "cannot connect to database"
**Solution:** Check your .env credentials
```bash
# Test connection
psql -h $DB_HOST -U $DB_USER -d $DB_NAME
```

### Error: "migration failed halfway"
**Solution:** Migrations are not atomic. You may need to manually fix:
```bash
# Check what was completed
psql darkspace -c "SELECT * FROM schema_migrations;"

# Manually run remaining SQL
psql darkspace < ../migrations/XXX_migration.sql

# Mark as complete
psql darkspace -c "INSERT INTO schema_migrations (migration_name) VALUES ('XXX_migration.sql');"
```

---

## Support

If you encounter issues:

1. Check `verify-database.js` output
2. Review error messages carefully
3. Check PM2 logs: `pm2 logs darkspace-api`
4. Verify database credentials
5. Ensure PostgreSQL is running

For complex issues, share the output of:
```bash
node verify-database.js --detailed > debug_output.txt
```
