# 🚀 AWS Lightsail Deployment Guide - Darkspace Campaign Manager

## Overview
This guide is specifically for deploying your Darkspace Campaign Manager to **AWS Lightsail**, which is a simplified AWS service perfect for full-stack applications.

---

## 💰 Lightsail Pricing

**Recommended Setup:**
- **$12/month** - 2GB RAM, 1 vCPU, 60GB SSD (good for starting)
- **$24/month** - 4GB RAM, 2 vCPU, 80GB SSD (better for production)

Includes:
- Static IP
- DNS management
- Automatic snapshots
- Load balancer (if needed)

---

## 📋 Architecture

```
┌─────────────────────────────────────────┐
│         darkspacer.com                   │
│    (Static files via Nginx)             │
│                                          │
│  ┌───────────────────────────────────┐ │
│  │   Node.js Backend (Port 3001)     │ │
│  │   + Socket.IO                      │ │
│  └───────────────────────────────────┘ │
│                                          │
│  ┌───────────────────────────────────┐ │
│  │   PostgreSQL Database             │ │
│  └───────────────────────────────────┘ │
│                                          │
│  AWS Lightsail Instance ($12-24/month)  │
└─────────────────────────────────────────┘
```

---

## 🎯 Step-by-Step Deployment

### Step 1: Create Lightsail Instance (10 minutes)

1. **Go to AWS Lightsail Console**
   - https://lightsail.aws.amazon.com/

2. **Create Instance**
   - Click "Create instance"
   - Select "Linux/Unix"
   - Select "OS Only" → **Ubuntu 22.04 LTS**
   - Choose instance plan: **$12/month or $24/month**
   - Name it: `darkspace-prod`
   - Click "Create instance"

3. **Wait for Instance to Start**
   - Takes about 2-3 minutes
   - Status will show "Running"

4. **Create Static IP**
   - Click "Networking" tab
   - Click "Create static IP"
   - Attach to your instance
   - Name it: `darkspace-static-ip`
   - **Note this IP address - you'll need it for DNS!**

---

### Step 2: Connect to Your Instance (2 minutes)

**Option A: Browser-Based SSH (Easiest)**
1. Click "Connect using SSH" button in Lightsail console
2. A terminal will open in your browser

**Option B: Your Own Terminal**
1. Download the default SSH key from Lightsail
2. Connect:
   ```bash
   ssh -i LightsailDefaultKey.pem ubuntu@YOUR_STATIC_IP
   ```

---

### Step 3: Install Dependencies (15 minutes)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js
node --version  # Should show v18.x
npm --version

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx (Web Server)
sudo apt install -y nginx

# Install Git
sudo apt install -y git

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx
```

---

### Step 4: Configure PostgreSQL (10 minutes)

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE darkspace_production;
CREATE USER darkspace_prod WITH ENCRYPTED PASSWORD 'YOUR_STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE darkspace_production TO darkspace_prod;

# Grant additional permissions (PostgreSQL 15+)
\c darkspace_production
GRANT ALL ON SCHEMA public TO darkspace_prod;

# Exit
\q
```

**Test connection:**
```bash
psql -U darkspace_prod -d darkspace_production -h localhost
# Enter password when prompted
# If successful, you'll see the psql prompt
\q
```

---

### Step 5: Deploy Application Code (15 minutes)

```bash
# Clone your repository
cd /var/www
sudo git clone https://github.com/yourusername/darkspace-campaign.git
cd darkspace-campaign

# Set proper permissions
sudo chown -R ubuntu:ubuntu /var/www/darkspace-campaign

# Setup Backend
cd backend
npm install --production

# Create production environment file
nano .env.production
```

**Add to `.env.production`:**
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=darkspace_prod
DB_PASSWORD=YOUR_STRONG_PASSWORD_HERE
DB_NAME=darkspace_production

PORT=3001
NODE_ENV=production

# Generate this with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=YOUR_64_CHAR_RANDOM_STRING_HERE

CLIENT_URL=https://darkspacer.com
```

**Save and exit** (Ctrl+X, Y, Enter)

```bash
# Copy to .env
cp .env.production .env

# Run database migrations
node migrate-ships.js
# Run any other migration scripts you have

# Test backend
npm start
# Should see "Server running on port 3001" and "Database connected"
# Press Ctrl+C to stop

# Start with PM2
pm2 start src/server.js --name darkspace-api
pm2 startup
pm2 save

# Check status
pm2 status
```

---

### Step 6: Build and Deploy Frontend (10 minutes)

```bash
# Build frontend
cd /var/www/darkspace-campaign/frontend

# Create production environment
nano .env.production
```

**Add to `.env.production`:**
```bash
VITE_API_URL=https://darkspacer.com/api
VITE_WS_URL=https://darkspacer.com
```

**Save and exit**

```bash
# Install dependencies and build
npm install
npm run build

# Create web directory
sudo mkdir -p /var/www/html/darkspacer

# Copy build files
sudo cp -r dist/* /var/www/html/darkspacer/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/darkspacer
```

---

### Step 7: Configure Nginx (15 minutes)

```bash
# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Create new configuration
sudo nano /etc/nginx/sites-available/darkspacer
```

**Add this configuration:**
```nginx
# Frontend
server {
    listen 80;
    server_name darkspacer.com www.darkspacer.com;
    root /var/www/html/darkspacer;
    index index.html;

    # Frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Backend API proxy
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Socket.IO WebSocket support
    location /socket.io {
        proxy_pass http://localhost:3001/socket.io;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Save and exit**

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/darkspacer /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Should see "syntax is ok" and "test is successful"

# Restart Nginx
sudo systemctl restart nginx
```

---

### Step 8: Configure Firewall (5 minutes)

**In Lightsail Console:**
1. Go to your instance
2. Click "Networking" tab
3. Click "IPv4 Firewall" section
4. Add these rules if not present:
   - HTTP (80) - Allow from Anywhere
   - HTTPS (443) - Allow from Anywhere
   - SSH (22) - Allow from Your IP or Anywhere

**On the server:**
```bash
# Enable firewall
sudo ufw enable

# Allow necessary ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS

# Check status
sudo ufw status
```

---

### Step 9: Configure DNS (10 minutes)

**Option A: Use Your Domain Registrar**

Add these DNS records:
```
Type    Name    Value                           TTL
A       @       YOUR_LIGHTSAIL_STATIC_IP        300
A       www     YOUR_LIGHTSAIL_STATIC_IP        300
```

**Option B: Use Lightsail DNS Zone (Easier)**

1. In Lightsail console, go to "Networking" → "DNS zones"
2. Click "Create DNS zone"
3. Enter your domain: `darkspacer.com`
4. Add records:
   - A record: `@` → Your static IP
   - A record: `www` → Your static IP
5. Lightsail will show you nameservers
6. Update nameservers at your domain registrar to Lightsail's nameservers

**Wait 5-60 minutes for DNS propagation**

Test with:
```bash
ping darkspacer.com
# Should show your Lightsail IP
```

---

### Step 10: Install SSL Certificate (10 minutes)

```bash
# Install SSL certificate (ONLY after DNS is working!)
sudo certbot --nginx -d darkspacer.com -d www.darkspacer.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose: Redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

**Your site should now be live at https://darkspacer.com!** 🎉

---

## 🧪 Testing Your Deployment

```bash
# Test backend directly
curl http://localhost:3001/api/health

# Test backend through Nginx
curl https://darkspacer.com/api/health

# Check PM2 status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# Check PostgreSQL
sudo systemctl status postgresql

# View logs
pm2 logs darkspace-api
```

**In Browser:**
1. Go to https://darkspacer.com
2. Try to register a new account
3. Login with admin/admin123
4. **IMMEDIATELY change admin password!**
5. Create a test character
6. Test inventory system
7. Test ship system

---

## 🔄 Updating Your Application

Create this update script:
```bash
# Create update script
nano /home/ubuntu/update-darkspace.sh
```

**Add:**
```bash
#!/bin/bash
set -e

echo "🚀 Updating Darkspace Campaign Manager..."

cd /var/www/darkspace-campaign

# Pull latest code
echo "📦 Pulling latest code..."
git pull

# Update backend
echo "🔧 Updating backend..."
cd backend
npm install --production
pm2 restart darkspace-api

# Update frontend
echo "🎨 Building frontend..."
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/darkspacer/

echo "✅ Update complete!"
pm2 status
```

```bash
# Make executable
chmod +x /home/ubuntu/update-darkspace.sh

# Run updates
./update-darkspace.sh
```

---

## 📊 Monitoring and Logs

### PM2 Monitoring:
```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs darkspace-api

# View only errors
pm2 logs darkspace-api --err

# Status
pm2 status
```

### Nginx Logs:
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### PostgreSQL Logs:
```bash
# View logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

### System Resources:
```bash
# CPU and Memory
htop

# Disk space
df -h

# Database size
sudo -u postgres psql -d darkspace_production -c "SELECT pg_size_pretty(pg_database_size('darkspace_production'));"
```

---

## 💾 Automated Backups

### Database Backups:

Create backup script:
```bash
nano /home/ubuntu/backup-database.sh
```

**Add:**
```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/darkspace_$TIMESTAMP.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
PGPASSWORD='YOUR_DB_PASSWORD' pg_dump -U darkspace_prod -h localhost darkspace_production > $BACKUP_FILE

# Compress
gzip $BACKUP_FILE

# Keep only last 7 days
find $BACKUP_DIR -name "darkspace_*.sql.gz" -mtime +7 -delete

echo "✅ Backup created: $BACKUP_FILE.gz"
```

```bash
# Make executable
chmod +x /home/ubuntu/backup-database.sh

# Test backup
./backup-database.sh

# Schedule daily backups (3 AM)
crontab -e

# Add this line:
0 3 * * * /home/ubuntu/backup-database.sh
```

### Lightsail Snapshots:
1. In Lightsail console, go to your instance
2. Click "Snapshots" tab
3. Enable automatic snapshots (recommended daily)
4. Or manually create snapshots before major updates

---

## 🔒 Security Hardening

### Change Default Passwords:
```bash
# Change ubuntu user password
sudo passwd ubuntu

# Change PostgreSQL postgres password
sudo -u postgres psql
ALTER USER postgres PASSWORD 'new_strong_password';
\q
```

### Restrict PostgreSQL:
```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Make sure these lines exist:
# local   all             all                                     peer
# host    all             all             127.0.0.1/32            md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Regular Updates:
```bash
# Update system packages weekly
sudo apt update && sudo apt upgrade -y

# Update Node packages
cd /var/www/darkspace-campaign/backend
npm update
pm2 restart darkspace-api
```

---

## 🆘 Troubleshooting

### "502 Bad Gateway"
```bash
# Check if backend is running
pm2 status

# Check backend logs
pm2 logs darkspace-api

# Restart backend
pm2 restart darkspace-api
```

### "Database Connection Failed"
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Test connection
psql -U darkspace_prod -d darkspace_production -h localhost

# Check logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

### "SSL Certificate Issues"
```bash
# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# If stuck, remove and reinstall
sudo certbot delete --cert-name darkspacer.com
sudo certbot --nginx -d darkspacer.com -d www.darkspacer.com
```

### "Out of Memory"
```bash
# Check memory usage
free -h

# Check what's using memory
ps aux --sort=-%mem | head

# Consider upgrading to $24/month instance (4GB RAM)
```

---

## 💰 Cost Optimization

### Current Setup Cost:
- Lightsail Instance: $12-24/month
- SSL Certificate: $0 (Let's Encrypt)
- Bandwidth: Included (up to 2TB)
- **Total: $12-24/month**

### Tips:
1. Start with $12/month instance
2. Monitor resources with `htop` and `pm2 monit`
3. Upgrade to $24/month if:
   - More than 10 active users
   - CPU usage consistently above 80%
   - Memory usage above 80%

---

## 📈 Scaling Up (When Needed)

### Upgrade Instance:
1. Create snapshot of current instance
2. Create new larger instance from snapshot
3. Update static IP to new instance

### Add Load Balancer (for high traffic):
1. In Lightsail, create load balancer
2. Attach your instance
3. Point DNS to load balancer IP

### Separate Database:
1. Create Lightsail managed database
2. Update backend .env with new connection details
3. Migrate data from local PostgreSQL

---

## 🎉 You're Live!

Your Darkspace Campaign Manager is now running on AWS Lightsail at **https://darkspacer.com**!

### Next Steps:
1. ✅ Test everything thoroughly
2. ✅ Change admin password
3. ✅ Set up automatic backups
4. ✅ Monitor logs for the first few days
5. ✅ Share with your players!

**Happy Gaming, Dungeon Master!** 🎲🚀

---

## 📞 Quick Commands Reference

```bash
# Update application
./update-darkspace.sh

# Backup database
./backup-database.sh

# Check status
pm2 status && sudo systemctl status nginx && sudo systemctl status postgresql

# View all logs
pm2 logs darkspace-api

# Restart everything
pm2 restart darkspace-api && sudo systemctl restart nginx

# Check disk space
df -h
```
