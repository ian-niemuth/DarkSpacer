# 🚀 Production Database Fix - COMPREHENSIVE CHECKLIST

## What's the Problem?
Your production site has database errors preventing:
- ❌ Viewing character inventory (500 error - missing gear_database columns)
- ❌ Creating custom items as DM (500 error - missing gear_database columns)  
- ❌ Creating ships (500 error - missing ships columns)

**Root Cause:** Missing columns in TWO tables:
1. `gear_database` table - missing 6 archetype restriction columns
2. `ships` table - missing 2 ownership columns

---

## ✅ The Fix (Step by Step)

### STEP 1: Test Locally FIRST ⚠️

Before touching production, test on your local database:

```bash
# Open terminal/command prompt
cd C:\dev\darkspace-campaign\backend

# Run the COMPREHENSIVE migration (fixes both tables)
node migrations/comprehensive-database-fix.js

# Verify it worked
node verify-comprehensive-fix.js

# Test the app locally
npm start
# Then test in browser at localhost:3001
```

**What to test:**
- [ ] Character inventory page loads without errors
- [ ] Can create custom weapon as DM
- [ ] Can create custom armor as DM
- [ ] Can create ship WITHOUT errors
- [ ] Can view ships list
- [ ] No console errors

---

### STEP 2: Deploy to Production 🚀

Only proceed if Step 1 worked perfectly!

#### A. Connect to Production Server

```bash
ssh your-username@darkspacer.com
```

#### B. Navigate to Backend

```bash
cd /var/www/darkspacer/backend
```

#### C. BACKUP DATABASE (CRITICAL!) 💾

```bash
pg_dump -U darkspace_app -h localhost darkspace_prod > backup_$(date +%Y%m%d_%H%M%S).sql
```

**VERIFY backup was created:**
```bash
ls -lh backup_*.sql
# Should show file with size > 0 bytes
```

#### D. Upload Migration Files (if needed)

If the migration files aren't on the server yet:

```bash
# From your LOCAL machine (new terminal):
scp C:\dev\darkspace-campaign\backend\migrations\comprehensive-database-fix.js your-username@darkspacer.com:/var/www/darkspacer/backend/migrations/

scp C:\dev\darkspace-campaign\backend\verify-comprehensive-fix.js your-username@darkspacer.com:/var/www/darkspacer/backend/
```

#### E. Run the Comprehensive Migration

```bash
# On production server:
node migrations/comprehensive-database-fix.js
```

**Expected output:**
```
🔧 Starting comprehensive database migration...

📦 PART 1: Fixing gear_database table...
   ✅ gear_database table exists
   Adding weapon_type column...
   ✅ Column weapon_type added
   [... more columns ...]
   ✅ Existing gear updated

🚢 PART 2: Fixing ships table...
   ✅ ships table exists
   Adding owner_type column...
   ✅ Column owner_type added
   Adding owner_id column...
   ✅ Column owner_id added
   ✅ Existing ships updated

✅ Migration completed successfully!

📊 SUMMARY:
GEAR DATABASE:
   - Weapons with type: X
   - Armor with type: X
   - Two-handed weapons: X

SHIPS:
   - Total ships: X
   - Character-owned: X
   - Party-owned: X

🎉 All done!
```

#### F. Verify the Migration

```bash
node verify-comprehensive-fix.js
```

Should show: 
```
✅ VERIFICATION PASSED! All fixes are in place.
```

#### G. Restart Backend

```bash
# If using PM2:
pm2 restart darkspace-backend

# OR if using systemd:
sudo systemctl restart darkspace-backend

# Check status:
pm2 status
# OR
sudo systemctl status darkspace-backend
```

---

### STEP 3: Test Production 🧪

Visit your site and test:

- [ ] Log in to https://darkspacer.com
- [ ] View character inventory - **no errors**
- [ ] Log in as DM
- [ ] Create custom weapon - **works**
- [ ] Create custom armor - **works**
- [ ] Create ship - **works** (this was broken before!)
- [ ] View ships list - **works**
- [ ] Check browser console - **no errors**
- [ ] Check backend logs - **no errors**

**Check backend logs:**
```bash
# On server:
pm2 logs darkspace-backend --lines 50
# OR
sudo journalctl -u darkspace-backend -n 50
```

---

## 🆘 If Something Goes Wrong

### Rollback Database

```bash
# On production server:
cd /var/www/darkspacer/backend

# Find your backup:
ls -lh backup_*.sql

# Restore it:
psql -U darkspace_app -h localhost darkspace_prod < backup_TIMESTAMP.sql

# Restart backend:
pm2 restart darkspace-backend
```

### Common Issues

**"Column already exists"**
- Migration already ran successfully
- This is safe to ignore

**"Table does not exist"**
- The table hasn't been created yet
- Check your database initialization scripts

**"Permission denied"**
- Check database credentials in .env
- Verify user has ALTER TABLE permission

**"Connection timeout"**
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check .env database settings

**Still getting 500 errors after migration**
- Check backend logs: `pm2 logs darkspace-backend`
- Verify migration completed: `node verify-comprehensive-fix.js`
- Restart backend again: `pm2 restart darkspace-backend`

---

## 📁 Reference Files

All these files are in `C:\dev\darkspace-campaign\backend\`:

### Migration Files:
- ✅ `migrations/comprehensive-database-fix.js` ⭐ **Main migration (use this!)**
- ✅ `verify-comprehensive-fix.js` - Verification script

### Documentation:
- ✅ `COMPREHENSIVE_FIX_CHECKLIST.md` - This file
- ✅ `MIGRATION_GUIDE.md` - Detailed deployment guide  
- ✅ `MIGRATION_SUMMARY.md` - Overview of fixes

---

## 📊 What Gets Fixed

### gear_database Table (6 columns added):
| Column | Purpose | Example Values |
|--------|---------|----------------|
| `weapon_type` | Weapon category | 'melee', 'ranged' |
| `weapon_weight_class` | Weight class for restrictions | 'light', null, 'heavy' |
| `armor_type` | Armor category | 'light', 'medium', 'heavy', 'energy', 'helmet', 'shield' |
| `hands_required` | Hands to wield | 1 or 2 |
| `allows_dex_modifier` | Whether armor allows DEX to AC | true or false |
| `ac_bonus` | AC bonus provided | 11, 13, 15, etc. |

### ships Table (2 columns added):
| Column | Purpose | Example Values |
|--------|---------|----------------|
| `owner_type` | Who owns the ship | 'character', 'party' |
| `owner_id` | Character ID if character-owned | character ID or NULL |

---

## ✅ Post-Migration Checklist

After everything is working:

- [ ] Verify all features work correctly
- [ ] Monitor error logs for 24-48 hours
- [ ] Keep database backup for at least 1 week
- [ ] Update any custom items if needed
- [ ] Test ship creation and management
- [ ] Celebrate! 🎉

---

## 📞 Need Help?

1. **Check the comprehensive verification:**
   ```bash
   node verify-comprehensive-fix.js
   ```

2. **Review error logs:**
   ```bash
   pm2 logs darkspace-backend
   ```

3. **Check migration output** - look for any errors during migration

4. **Consult documentation:**
   - `MIGRATION_GUIDE.md` - Detailed troubleshooting
   - `MIGRATION_SUMMARY.md` - Technical overview

---

**Remember:** This ONE migration fixes ALL the issues! Always test locally before production! Always backup before migrations!

---

## 🎯 Success Criteria

After running the migration, you should see:

✅ No 500 errors when viewing character inventory  
✅ DMs can create custom weapons/armor  
✅ Ships can be created (was broken - now fixed!)  
✅ Ships can be viewed and managed  
✅ All archetype equipment restrictions work  
✅ No console errors in browser  
✅ No errors in backend logs  

**Total time:** ~15 minutes
**Downtime:** ~30 seconds (just app restart)
