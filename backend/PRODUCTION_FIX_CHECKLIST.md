# 🚀 Production Database Fix - Quick Checklist

## What's the Problem?
Your production site has database errors preventing:
- ❌ Viewing character inventory (500 error)
- ❌ Creating custom items as DM (500 error)  
- ❌ Creating ships (500 error)

**Root Cause:** Missing columns in the `gear_database` table

---

## ✅ The Fix (Step by Step)

### STEP 1: Test Locally FIRST ⚠️

Before touching production, test on your local database:

```bash
# Open terminal/command prompt
cd C:\dev\darkspace-campaign\backend

# Run the migration
node migrations/add-archetype-restriction-columns.js

# Verify it worked
node verify-migration.js

# Test the app locally
npm start
# Then test in browser at localhost:3001
```

**What to test:**
- [ ] Character inventory page loads without errors
- [ ] Can create custom weapon as DM
- [ ] Can create custom armor as DM
- [ ] Can create ship
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

If the migration file isn't on the server yet:

```bash
# From your LOCAL machine (new terminal):
scp C:\dev\darkspace-campaign\backend\migrations\add-archetype-restriction-columns.js your-username@darkspacer.com:/var/www/darkspacer/backend/migrations/

scp C:\dev\darkspace-campaign\backend\verify-migration.js your-username@darkspacer.com:/var/www/darkspacer/backend/
```

#### E. Run the Migration

```bash
# On production server:
node migrations/add-archetype-restriction-columns.js
```

**Expected output:**
```
🔧 Starting migration: Add archetype restriction columns...
   Adding weapon_type column...
✅ Column weapon_type added successfully
   Adding weapon_weight_class column...
✅ Column weapon_weight_class added successfully
[... more columns ...]
✅ Migration completed successfully!
📊 Summary:
   - Weapons with type set: X
   - Armor with type set: X
   - Two-handed weapons: X
🎉 All done!
```

#### F. Verify the Migration

```bash
node verify-migration.js
```

Should show: `✅ Migration verification PASSED!`

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
- [ ] Create ship - **works**
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

**"Permission denied"**
- Check database credentials in .env
- Verify user has ALTER TABLE permission

**"Connection timeout"**
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check .env database settings

**Still getting 500 errors after migration**
- Check backend logs: `pm2 logs darkspace-backend`
- Verify migration completed: `node verify-migration.js`
- Restart backend again: `pm2 restart darkspace-backend`

---

## 📁 Reference Files

All these files are in `C:\dev\darkspace-campaign\backend\`:

- `migrations/add-archetype-restriction-columns.js` - The migration script
- `verify-migration.js` - Verification script
- `MIGRATION_SUMMARY.md` - Overview of the fix
- `MIGRATION_GUIDE.md` - Detailed deployment guide
- `PRODUCTION_FIX_CHECKLIST.md` - This file

---

## 📞 Need Help?

1. Check `MIGRATION_GUIDE.md` for detailed troubleshooting
2. Review backend error logs
3. Verify database connection
4. Make sure you ran migration successfully

---

## ✅ Post-Migration Checklist

After everything is working:

- [ ] Verify all features work correctly
- [ ] Monitor error logs for 24-48 hours
- [ ] Keep database backup for at least 1 week
- [ ] Update any custom items if needed
- [ ] Document any changes to game mechanics
- [ ] Celebrate! 🎉

---

**Remember:** Always test locally before production! Always backup before migrations!
