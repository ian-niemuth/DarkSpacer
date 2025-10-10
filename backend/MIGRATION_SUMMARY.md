# Darkspace Production Database Fix - Summary

## 🎯 The Problem

Your production database was missing 6 critical columns in the `gear_database` table, causing:
- ❌ 500 errors when viewing character inventory  
- ❌ 500 errors when DMs try to create custom items
- ❌ 500 errors when creating ships
- ❌ Archetype equipment restrictions not working

**Error Message:**
```
Error fetching inventory: error: column g.weapon_type does not exist
```

## ✅ The Solution

I've created a database migration script that:
1. Adds the missing columns to `gear_database`
2. Populates existing items with intelligent default values
3. Fixes all the 500 errors

## 📦 Files Created

1. **`migrations/add-archetype-restriction-columns.js`**  
   The migration script that fixes the database schema

2. **`run-migration.js`**  
   A helper script to run the migration easily

3. **`MIGRATION_GUIDE.md`**  
   Complete deployment instructions for both local and production

## 🚀 Quick Start - Run This Migration

### For Local Testing (Do This First):
```bash
cd C:\dev\darkspace-campaign\backend
node migrations/add-archetype-restriction-columns.js
```

### For Production (After Testing Locally):
```bash
# 1. SSH to your server
ssh your-username@darkspacer.com

# 2. Navigate to backend
cd /var/www/darkspacer/backend

# 3. BACKUP DATABASE FIRST!
pg_dump -U darkspace_app -h localhost darkspace_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# 4. Run migration
node migrations/add-archetype-restriction-columns.js

# 5. Restart app
pm2 restart darkspace-backend
```

## 🔍 What Gets Added

The migration adds these columns to `gear_database`:

| Column | Type | Purpose | Example Values |
|--------|------|---------|----------------|
| `weapon_type` | VARCHAR | Weapon category | 'melee', 'ranged' |
| `weapon_weight_class` | VARCHAR | Weight classification | 'light', NULL, 'heavy' |
| `armor_type` | VARCHAR | Armor category | 'light', 'medium', 'heavy', 'energy', 'helmet', 'shield' |
| `hands_required` | INTEGER | Hands to wield | 1, 2 |
| `allows_dex_modifier` | BOOLEAN | AC calculation | true, false |
| `ac_bonus` | INTEGER | Armor class bonus | 11, 13, 15, etc. |

## 🎮 Expected Results

After running the migration:
- ✅ Character inventory loads correctly
- ✅ All equipment displayed with restrictions
- ✅ DMs can create custom weapons and armor
- ✅ Archetype restrictions enforced (Wise can't wear heavy armor, etc.)
- ✅ 2-handed weapons properly block off-hand slot
- ✅ AC calculations work correctly
- ✅ Ship creation works
- ✅ No more 500 errors!

## ⚠️ Important Notes

- **BACKUP FIRST!** Always backup production before migrations
- **Test Locally!** Run on your dev database before production
- **Migration is Safe:** It's idempotent - can run multiple times
- **Checks First:** Won't duplicate columns if they already exist
- **Intelligent Defaults:** Existing items get proper classifications based on their names/properties

## 📋 Verification Checklist

After migration, test these:
- [ ] View character inventory - no errors
- [ ] Create custom weapon as DM
- [ ] Create custom armor as DM  
- [ ] Equip items with archetype character
- [ ] Verify archetype restrictions work
- [ ] Create a new ship
- [ ] Check browser console for errors
- [ ] Check backend logs for errors

## 🆘 If Something Goes Wrong

**Rollback Command:**
```bash
psql -U darkspace_app -h localhost darkspace_prod < backup_TIMESTAMP.sql
```

See `MIGRATION_GUIDE.md` for detailed rollback instructions.

## 📚 More Information

- Full deployment guide: `MIGRATION_GUIDE.md`
- Migration script: `migrations/add-archetype-restriction-columns.js`
- Helper script: `run-migration.js`

## 🎉 Next Steps

1. ✅ **Run migration locally first** to test
2. ✅ **Backup production database**
3. ✅ **Run migration on production**
4. ✅ **Restart backend service**
5. ✅ **Test all affected features**
6. ✅ **Monitor logs for first few days**

---

**Questions?** Check the full `MIGRATION_GUIDE.md` for troubleshooting and detailed instructions.
