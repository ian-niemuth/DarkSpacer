#!/bin/bash
# Database backup script for Darkspace Campaign Manager
# Run this manually or set up as a cron job

# Configuration
BACKUP_DIR="/home/ubuntu/backups"
DB_NAME="darkspace_prod"
DB_USER="darkspace_app"
DB_HOST="localhost"
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Generate filename with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/darkspace_backup_${TIMESTAMP}.sql"

echo "🗄️  Starting database backup..."
echo "Database: $DB_NAME"
echo "File: $BACKUP_FILE"

# Create backup
pg_dump -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" > "$BACKUP_FILE"

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "✅ Backup completed successfully!"
    
    # Compress the backup
    gzip "$BACKUP_FILE"
    echo "📦 Backup compressed: ${BACKUP_FILE}.gz"
    
    # Calculate size
    SIZE=$(du -h "${BACKUP_FILE}.gz" | cut -f1)
    echo "📊 Backup size: $SIZE"
    
    # Delete old backups (older than RETENTION_DAYS)
    find "$BACKUP_DIR" -name "darkspace_backup_*.sql.gz" -type f -mtime +${RETENTION_DAYS} -delete
    echo "🧹 Cleaned up backups older than ${RETENTION_DAYS} days"
    
    # List recent backups
    echo ""
    echo "📂 Recent backups:"
    ls -lh "$BACKUP_DIR" | grep darkspace_backup | tail -5
else
    echo "❌ Backup failed!"
    exit 1
fi

# Optional: Upload to S3 or another cloud storage
# Uncomment and configure if you want cloud backups
# aws s3 cp "${BACKUP_FILE}.gz" s3://your-backup-bucket/darkspace/

echo ""
echo "✅ Backup process complete!"
