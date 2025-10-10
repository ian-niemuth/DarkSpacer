# 🚀 Darkspace Campaign Manager - Production Deployment Guide

## Overview
This guide covers everything needed to deploy your Darkspace Campaign Manager from local development to production on **https://darkspacer.com**.

---

## 📋 Table of Contents
1. [Current State Analysis](#current-state-analysis)
2. [Code Changes Required](#code-changes-required)
3. [Hosting Options](#hosting-options)
4. [Database Setup](#database-setup)
5. [Backend Deployment](#backend-deployment)
6. [Frontend Deployment](#frontend-deployment)
7. [Domain Configuration](#domain-configuration)
8. [Security Hardening](#security-hardening)
9. [Deployment Checklist](#deployment-checklist)

---

## 🔍 Current State Analysis

### ✅ Good News - Already Set Up:
- **Frontend API Configuration**: Using environment variables via `frontend/src/config/api.js`
- **CORS Configuration**: Backend properly checks for production URLs
- **JWT Authentication**: Secure token-based auth in place
- **Environment Variables**: Backend uses `.env` for configuration
- **Rate Limiting**: API rate limiting already implemented
- **Socket.IO**: Real-time updates configured with environment awareness

### ⚠️ Needs Changes:
1. **One Hardcoded URL**: `ShipCargoTab.jsx` has hardcoded `localhost:3001`
2. **Database Configuration**: Currently pointing to local PostgreSQL
3. **Environment Variables**: Need production values
4. **SSL/HTTPS**: Not yet configured
5. **Build Process**: Need to set up production builds

---

## 🛠️ Code Changes Required

### 1. Fix Hardcoded URLs

#### File: `frontend/src/components/ShipCargoTab.jsx`
**Current (Line 6):**
```javascript
const API_URL = 'http://localhost:3001/api';
```

**Change to:**
```javascript
import { API_URL } from '../config/api';
```

**Action:** Replace the hardcoded URL with the import from the config file (same pattern used in other components).

---

### 2. Update Backend Environment Variables

#### Create: `backend/.env.production`
```bash
# Database Configuration (Production)
DB_HOST=your-production-db-host.com
DB_PORT=5432
DB_USER=darkspace_prod_user
DB_PASSWORD=STRONG_PASSWORD_HERE
DB_NAME=darkspace_production

# Server Configuration
PORT=3001
NODE_ENV=production

# Security
JWT_SECRET=GENERATE_A_STRONG_RANDOM_SECRET_KEY_AT_LEAST_64_CHARS

# CORS Configuration
CLIENT_URL=https://darkspacer.com

# API Rate Limiting (already implemented)
# Adjust these if needed for production load
```

**🔐 Important:** 
- Generate a NEW, secure JWT_SECRET (minimum 64 characters)
- Use a strong, unique database password
- **NEVER commit `.env.production` to git!**

---

### 3. Create Frontend Environment File

#### Create: `frontend/.env.production`
```bash
VITE_API_URL=https://api.darkspacer.com/api
VITE_WS_URL=https://api.darkspacer.com
```

**Note:** Adjust URLs based on your hosting setup (see hosting options below).

---

### 4. Update Backend CORS for Production

Your backend already handles this well! Verify `backend/src/server.js`:
```javascript
// CORS configuration (Lines 29-34)
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || 'https://darkspacer.com'
    : 'http://localhost:5173',
  credentials: true
}));
```

**Action:** ✅ No changes needed - already production-ready!

---

## 🏢 Hosting Options

### Option 1: Traditional VPS (Recommended for Full Control)
**Providers:** DigitalOcean, Linode, Vultr, AWS EC2
**Cost:** ~$12-20/month

**Setup:**
- Frontend: Static files served by Nginx
- Backend: Node.js app with PM2 process manager
- Database: Managed PostgreSQL or self-hosted
- SSL: Let's Encrypt (free)

**Architecture:**
```
darkspacer.com (Frontend - Static files via Nginx)
    ↓
api.darkspacer.com (Backend - Node.js + PM2)
    ↓
Database (PostgreSQL - Managed or self-hosted)
```

### Option 2: Platform as a Service (Easiest Setup)
**Providers:** Render, Railway, Heroku, Fly.io

**Frontend:** Vercel or Netlify (free tier available)
**Backend:** Railway or Render (~$7-15/month)
**Database:** Railway PostgreSQL or Supabase

**Pros:**
- Zero server management
- Automatic SSL certificates
- Easy deployments via Git
- Auto-scaling

**Cons:**
- Less control
- Potentially higher cost at scale

### Option 3: Hybrid Approach (Best of Both Worlds)
**Frontend:** Vercel (free tier)
**Backend + Database:** Single VPS ($12/month)

---

## 🗄️ Database Setup

### Option A: Managed PostgreSQL (Recommended for Beginners)
**Providers:**
- **Railway**: $5/month for 1GB database
- **Supabase**: Free tier + $25/month for production
- **DigitalOcean Managed**: $15/month
- **AWS RDS**: ~$15-30/month

**Steps:**
1. Create managed PostgreSQL instance
2. Get connection string
3. Run migrations: `npm run migrate` (from backend directory)
4. Update backend `.env.production` with connection details

### Option B: Self-Hosted PostgreSQL on VPS
**Steps:**
1. Install PostgreSQL on your VPS
2. Create database and user
3. Configure firewall to allow only your backend
4. Update connection details in `.env.production`

**Commands (Ubuntu/Debian):**
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE darkspace_production;
CREATE USER darkspace_prod_user WITH ENCRYPTED PASSWORD 'your_strong_password';
GRANT ALL PRIVILEGES ON DATABASE darkspace_production TO darkspace_prod_user;
\q
```

---

## 🖥️ Backend Deployment

### Using a VPS (Ubuntu/Debian)

#### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx (reverse proxy)
sudo apt install -y nginx
```

#### 2. Deploy Backend Code
```bash
# Clone your repository
cd /var/www
sudo git clone https://github.com/yourusername/darkspace-campaign.git
cd darkspace-campaign/backend

# Install dependencies
sudo npm install --production

# Copy production environment file
sudo cp .env.production .env

# Start with PM2
sudo pm2 start src/server.js --name darkspace-api
sudo pm2 startup
sudo pm2 save
```

#### 3. Configure Nginx Reverse Proxy
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/darkspace-api
```

**Add this configuration:**
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Socket.IO support
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

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/darkspace-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4. Install SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d api.darkspacer.com

# Auto-renewal is set up automatically
```

---

## 🎨 Frontend Deployment

### Option A: Deploy to Vercel (Easiest)
```bash
# Install Vercel CLI
npm install -g vercel

# From frontend directory
cd frontend

# Login and deploy
vercel login
vercel --prod
```

**Environment Variables in Vercel Dashboard:**
- `VITE_API_URL`: https://api.darkspacer.com/api
- `VITE_WS_URL`: https://api.darkspacer.com

### Option B: Build and Serve from Nginx (VPS)
```bash
# Build frontend
cd frontend
npm run build

# Copy build files
sudo cp -r dist/* /var/www/html/darkspacer/

# Configure Nginx
sudo nano /etc/nginx/sites-available/darkspacer
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name darkspacer.com www.darkspacer.com;
    root /var/www/html/darkspacer;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/darkspacer /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Get SSL certificate
sudo certbot --nginx -d darkspacer.com -d www.darkspacer.com
```

---

## 🌐 Domain Configuration

### DNS Records to Add (via your domain registrar)

For **darkspacer.com**:
```
Type    Name    Value                   TTL
A       @       YOUR_VPS_IP_ADDRESS     3600
A       www     YOUR_VPS_IP_ADDRESS     3600
A       api     YOUR_VPS_IP_ADDRESS     3600
```

**Or if using separate hosting:**
```
Type    Name    Value                           TTL
A       @       FRONTEND_HOSTING_IP             3600
A       www     FRONTEND_HOSTING_IP             3600
A       api     BACKEND_VPS_IP                  3600
```

**Wait 5-60 minutes for DNS propagation.**

---

## 🔒 Security Hardening

### 1. Change Default Admin Credentials
**CRITICAL:** After deployment, immediately change the default admin password!

Login with:
- Username: `admin`
- Password: `admin123`

Then change the password using a strong, unique password.

### 2. Database Security
```bash
# Restrict PostgreSQL to localhost only
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Add:
# TYPE  DATABASE        USER            ADDRESS         METHOD
local   all             all                             peer
host    all             all             127.0.0.1/32    md5
```

### 3. Firewall Configuration
```bash
# Allow only necessary ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 4. Regular Updates
```bash
# Create update script
sudo nano /usr/local/bin/update-darkspace.sh
```

```bash
#!/bin/bash
cd /var/www/darkspace-campaign/backend
git pull
npm install --production
pm2 restart darkspace-api
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/update-darkspace.sh
```

### 5. Monitoring Setup
```bash
# Monitor logs
pm2 logs darkspace-api

# Check status
pm2 status

# Monitor system resources
pm2 monit
```

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Fix hardcoded URL in `ShipCargoTab.jsx`
- [ ] Create `.env.production` for backend
- [ ] Create `.env.production` for frontend
- [ ] Generate strong JWT_SECRET (64+ characters)
- [ ] Test build locally: `npm run build` in frontend
- [ ] Backup local database
- [ ] Push all code to Git repository

### Database Setup
- [ ] Create production PostgreSQL database
- [ ] Configure database user and permissions
- [ ] Run database migrations
- [ ] Verify database connection

### Backend Deployment
- [ ] Deploy backend code to server
- [ ] Install Node.js dependencies
- [ ] Configure environment variables
- [ ] Start backend with PM2
- [ ] Configure Nginx reverse proxy
- [ ] Install SSL certificate
- [ ] Test API endpoints

### Frontend Deployment
- [ ] Build production frontend
- [ ] Deploy to hosting platform
- [ ] Configure environment variables
- [ ] Configure custom domain
- [ ] Install SSL certificate
- [ ] Test frontend loads correctly

### Post-Deployment
- [ ] Change default admin password
- [ ] Test user registration
- [ ] Test character creation
- [ ] Test inventory system
- [ ] Test ship system
- [ ] Test real-time updates (Socket.IO)
- [ ] Configure firewall
- [ ] Set up monitoring
- [ ] Configure backups

### DNS Configuration
- [ ] Add A records for domain
- [ ] Add A record for api subdomain
- [ ] Verify DNS propagation
- [ ] Test HTTPS on all domains

---

## 📊 Recommended Production Architecture

```
┌─────────────────────────────────────────┐
│         darkspacer.com                   │
│    (Frontend - React/Vite)              │
│    Vercel or Nginx on VPS               │
└───────────────┬─────────────────────────┘
                │ HTTPS
                ↓
┌─────────────────────────────────────────┐
│     api.darkspacer.com                   │
│  (Backend - Node.js/Express)            │
│  PM2 + Nginx Reverse Proxy              │
└───────────────┬─────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────┐
│   PostgreSQL Database                    │
│   (Managed or Self-Hosted)              │
└─────────────────────────────────────────┘
```

---

## 🎯 Quick Start (Recommended Path)

### For Beginners:
1. **Frontend**: Deploy to Vercel (free, easy setup)
2. **Backend + Database**: Deploy to Railway (all-in-one, $10-15/month)
3. **Domain**: Point DNS to both services

### For Experience Users:
1. Get a $12/month VPS (DigitalOcean Droplet or Linode)
2. Follow VPS deployment steps above
3. Deploy frontend to Vercel or same VPS

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check PM2 logs
pm2 logs darkspace-api

# Check if port is already in use
sudo lsof -i :3001

# Restart backend
pm2 restart darkspace-api
```

### Frontend can't reach backend
1. Check CORS settings in backend
2. Verify `VITE_API_URL` in frontend `.env.production`
3. Check browser console for errors
4. Verify SSL certificates are valid

### Database connection fails
1. Check database credentials in `.env`
2. Verify database is running
3. Check firewall rules
4. Test connection: `psql -h HOST -U USER -d DATABASE`

### Socket.IO not working
1. Check Nginx WebSocket configuration
2. Verify VITE_WS_URL is correct
3. Check browser console for connection errors

---

## 📞 Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs darkspace-api`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Check database logs
4. Review browser console for frontend errors

---

## 🔄 Making Updates After Deployment

```bash
# Pull latest changes
cd /var/www/darkspace-campaign
git pull

# Backend updates
cd backend
npm install
pm2 restart darkspace-api

# Frontend updates (if self-hosting)
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/darkspacer/
```

---

## 💰 Estimated Monthly Costs

### Budget Option (~$10-15/month):
- Railway (Backend + Database): $10-15/month
- Vercel (Frontend): Free tier
- Domain: ~$12/year

### Self-Hosted Option (~$15-20/month):
- VPS (DigitalOcean/Linode): $12-18/month
- Domain: ~$12/year
- SSL: Free (Let's Encrypt)

### Professional Option (~$50/month):
- VPS: $24/month (more resources)
- Managed Database: $15/month
- CDN: $10/month
- Domain: ~$12/year

---

## 🎉 You're Ready!

Once you've completed this guide, your Darkspace Campaign Manager will be live at **https://darkspacer.com** for the world to access!

Good luck, Dungeon Master! 🎲
