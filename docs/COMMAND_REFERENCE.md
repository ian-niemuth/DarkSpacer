# 🔧 Production Deployment - Command Reference

Quick reference for all deployment commands.

---

## 📦 Local Build & Test

### Frontend:
```bash
cd frontend

# Install dependencies
npm install

# Create production build
npm run build

# Preview production build locally
npm run preview

# Build will be in frontend/dist/
```

### Backend:
```bash
cd backend

# Install dependencies (production only)
npm install --production

# Start with production env
NODE_ENV=production npm start

# Or use PM2 for production
pm2 start src/server.js --name darkspace-api --env production
```

---

## 🗄️ Database Commands

### PostgreSQL (Local/VPS):
```bash
# Access PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE darkspace_production;

# Create user
CREATE USER darkspace_prod WITH ENCRYPTED PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE darkspace_production TO darkspace_prod;

# List databases
\l

# Connect to database
\c darkspace_production

# List tables
\dt

# Exit
\q
```

### Run Migrations:
```bash
cd backend

# Make sure .env.production is in place
npm run migrate

# Or if you have custom migration scripts
node migrate-ships.js
```

### Backup Database:
```bash
# Backup
pg_dump -U darkspace_prod darkspace_production > backup.sql

# Restore
psql -U darkspace_prod darkspace_production < backup.sql
```

---

## 🚀 Vercel Deployment

### First Time Setup:
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel
```

### Subsequent Deployments:
```bash
cd frontend

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### Environment Variables (via Vercel Dashboard):
```
VITE_API_URL=https://api.darkspacer.com/api
VITE_WS_URL=https://api.darkspacer.com
```

---

## 🖥️ VPS Deployment (Ubuntu/Debian)

### Initial Server Setup:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx
```

### Deploy Application:
```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/yourusername/darkspace-campaign.git
cd darkspace-campaign

# Setup backend
cd backend
sudo npm install --production

# Copy production env
sudo nano .env.production
# (Paste your production environment variables)

# Start with PM2
sudo pm2 start src/server.js --name darkspace-api --env production

# Setup PM2 to start on reboot
sudo pm2 startup
sudo pm2 save

# Build frontend
cd ../frontend
npm install
npm run build

# Copy build files to web root
sudo mkdir -p /var/www/html/darkspacer
sudo cp -r dist/* /var/www/html/darkspacer/
```

### Update Application:
```bash
cd /var/www/darkspace-campaign

# Pull latest code
git pull

# Update backend
cd backend
npm install --production
pm2 restart darkspace-api

# Update frontend
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/darkspacer/
```

---

## ⚙️ Nginx Configuration

### Backend Reverse Proxy:
```bash
# Create config
sudo nano /etc/nginx/sites-available/darkspace-api
```

```nginx
server {
    listen 80;
    server_name api.darkspacer.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io {
        proxy_pass http://localhost:3001/socket.io;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/darkspace-api /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Frontend Hosting:
```bash
# Create config
sudo nano /etc/nginx/sites-available/darkspacer
```

```nginx
server {
    listen 80;
    server_name darkspacer.com www.darkspacer.com;
    root /var/www/html/darkspacer;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/darkspacer /etc/nginx/sites-enabled/

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 SSL Certificate (Let's Encrypt)

### Install Certificate:
```bash
# For API
sudo certbot --nginx -d api.darkspacer.com

# For Frontend
sudo certbot --nginx -d darkspacer.com -d www.darkspacer.com

# Certificates auto-renew, but you can test renewal:
sudo certbot renew --dry-run
```

---

## 🔥 Firewall Setup (UFW)

```bash
# Enable firewall
sudo ufw enable

# Allow SSH (IMPORTANT - do this first!)
sudo ufw allow 22

# Allow HTTP & HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Check status
sudo ufw status

# Allow specific IPs only (optional)
sudo ufw allow from YOUR_IP_ADDRESS to any port 22
```

---

## 📊 PM2 Commands

```bash
# Start application
pm2 start src/server.js --name darkspace-api

# Stop application
pm2 stop darkspace-api

# Restart application
pm2 restart darkspace-api

# Delete from PM2
pm2 delete darkspace-api

# View logs
pm2 logs darkspace-api

# Real-time logs
pm2 logs darkspace-api --lines 100

# Monitor resources
pm2 monit

# List all processes
pm2 list

# Save current process list
pm2 save

# Setup auto-start on reboot
pm2 startup
```

---

## 🧪 Testing Commands

### Test Backend API:
```bash
# Health check
curl https://api.darkspacer.com/api/health

# Test login
curl -X POST https://api.darkspacer.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Test Frontend:
```bash
# Just open in browser
https://darkspacer.com

# Check if static assets load
curl -I https://darkspacer.com
```

### Test Database Connection:
```bash
# From backend directory
node -e "
const pool = require('./src/config/database');
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database error:', err);
    process.exit(1);
  }
  console.log('✅ Database connected:', res.rows[0]);
  process.exit(0);
});
"
```

---

## 📝 View Logs

### PM2 Logs:
```bash
# All logs
pm2 logs

# Specific app
pm2 logs darkspace-api

# Error logs only
pm2 logs darkspace-api --err

# Last 50 lines
pm2 logs darkspace-api --lines 50
```

### Nginx Logs:
```bash
# Access log
sudo tail -f /var/log/nginx/access.log

# Error log
sudo tail -f /var/log/nginx/error.log

# Specific site error log
sudo tail -f /var/log/nginx/error.log | grep darkspace
```

### PostgreSQL Logs:
```bash
# Find log location
sudo -u postgres psql -c 'SHOW log_directory;'

# View logs (location varies by system)
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

---

## 🔄 Rollback Commands

### Backend Rollback:
```bash
cd /var/www/darkspace-campaign
git log --oneline
git checkout <previous-commit-hash>
cd backend
npm install --production
pm2 restart darkspace-api
```

### Frontend Rollback:
```bash
cd /var/www/darkspace-campaign
git checkout <previous-commit-hash>
cd frontend
npm run build
sudo cp -r dist/* /var/www/html/darkspacer/
```

### Database Rollback:
```bash
# Restore from backup
psql -U darkspace_prod darkspace_production < backup.sql
```

---

## 🔧 Troubleshooting Commands

### Check if Services are Running:
```bash
# Check Nginx
sudo systemctl status nginx

# Check PostgreSQL
sudo systemctl status postgresql

# Check PM2 apps
pm2 status

# Check ports in use
sudo lsof -i :3001  # Backend
sudo lsof -i :5432  # PostgreSQL
sudo lsof -i :80    # HTTP
sudo lsof -i :443   # HTTPS
```

### Restart Services:
```bash
# Restart Nginx
sudo systemctl restart nginx

# Restart PostgreSQL
sudo systemctl restart postgresql

# Restart backend
pm2 restart darkspace-api

# Restart all
pm2 restart all
```

### Check Disk Space:
```bash
# Check disk usage
df -h

# Check largest directories
du -sh /*

# Clean up old logs
sudo journalctl --vacuum-time=7d
```

---

## 🎯 Quick Deployment Script

Save this as `deploy.sh`:
```bash
#!/bin/bash
set -e

echo "🚀 Deploying Darkspace Campaign Manager..."

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

echo "✅ Deployment complete!"
pm2 status
```

```bash
# Make executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

---

## 📚 Additional Resources

- PM2 Docs: https://pm2.keymetrics.io/docs/usage/quick-start/
- Nginx Docs: https://nginx.org/en/docs/
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Let's Encrypt: https://letsencrypt.org/getting-started/
- Vercel Docs: https://vercel.com/docs

---

**Remember:** Always test in a staging environment first if possible!
