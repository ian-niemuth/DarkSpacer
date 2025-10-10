# 🚀 Darkspace Campaign Manager - v1.0

A space-themed RPG campaign manager

## 📋 What's This?

Web-based character & campaign management system for DarkSpacer + ShadowDark RPG

**Features:**
- Character creation and management
- Ship management with crew, weapons, and cargo
- Inventory and equipment system
- XP and level progression
- Real-time updates via WebSockets
- DM admin panel for campaign management

## 🛠️ Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express + PostgreSQL
- **Real-time**: Socket.io
- **Auth**: JWT + bcrypt
- **Hosting**: AWS Lightsail ($10/month)

## 🏃 Quick Start (Local Development)

### Prerequisites
- Node.js 20.x
- PostgreSQL 15+

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/darkspace-campaign.git
cd darkspace-campaign

# Setup backend
cd backend
npm install
cp .env.example .env  # Edit with your database credentials
node src/scripts/runMigration.js  # Run migrations
psql -U postgres -d darkspace_campaign < ../database/init.sql  # Import initial data

# Start backend
npm run dev  # Runs on http://localhost:3001

# In a new terminal, setup frontend
cd frontend
npm install

# Start frontend
npm run dev  # Runs on http://localhost:5173
```

Visit http://localhost:5173 to use the app!

## 🌐 Production Deployment

**Ready to deploy?** Check the [docs/](./docs/) folder for deployment guides:

- **[DEPLOYMENT_QUICKSTART.md](./docs/DEPLOYMENT_QUICKSTART.md)** - Quick deployment instructions
- **[PRODUCTION_DEPLOYMENT.md](./docs/PRODUCTION_DEPLOYMENT.md)** - Full deployment guide
- **[LIGHTSAIL_DEPLOYMENT.md](./docs/LIGHTSAIL_DEPLOYMENT.md)** - AWS Lightsail setup

**Cost**: ~$10/month on AWS Lightsail

## 🔒 Security Features (v1.0)

- ✅ Rate limiting on login (10 attempts per 15 min)
- ✅ Rate limiting on API (1000 requests per minute)
- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Input sanitization
- ✅ HTTPS/SSL via Let's Encrypt (free)
- ✅ CORS protection
- ✅ SQL injection protection (parameterized queries)

## 📦 Project Structure

```
darkspace-campaign/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Security & auth
│   │   └── config/         # Database & settings
│   └── .env                # Environment variables (local)
├── frontend/               # React app
│   ├── src/
│   │   ├── components/     # UI components
│   │   └── App.jsx         # Main app
│   └── dist/               # Built files (production)
├── database/               # Database schemas and migrations
│   ├── init.sql           # Schema & initial data
│   └── migrations/        # Database migrations
├── scripts/               # Deployment and maintenance scripts
│   ├── deploy.sh          # Quick deployment script
│   ├── backup.sh          # Database backup script
│   ├── migrate-production.sh  # Production migration script
│   └── health-check.sh    # Server health check
├── docs/                  # Documentation
│   ├── DEPLOYMENT_QUICKSTART.md
│   ├── PRODUCTION_DEPLOYMENT.md
│   └── LIGHTSAIL_DEPLOYMENT.md
├── README.md              # You are here!
└── QUICK_START.md         # Quick start guide
```

## 🔧 Maintenance

### Update Application
```bash
# On your Lightsail server
cd ~/darkspace-campaign
./scripts/deploy.sh  # Pulls code, updates dependencies, rebuilds, restarts
```

### Backup Database
```bash
./scripts/backup.sh  # Creates timestamped backup
```

### View Logs
```bash
pm2 logs darkspace-api  # Backend logs
sudo tail -f /var/log/nginx/error.log  # Nginx logs
```

### Monitor Status
```bash
pm2 status  # Check if backend is running
pm2 monit   # Real-time monitoring
```

## 🎯 Features Roadmap

**v1.0 (Current)**
- ✅ Character creation & management
- ✅ Ship system
- ✅ Inventory & equipment
- ✅ XP & leveling
- ✅ Admin panel
- ✅ Real-time updates

**v1.1 (Planned)**
- [ ] Mobile-responsive UI improvements
- [ ] Character portraits/avatars
- [ ] Dice roller
- [ ] Campaign notes
- [ ] Session logs

**v2.0 (Future)**
- [ ] Space exploration map
- [ ] Combat tracker
- [ ] NPC management
- [ ] Loot generator

## 🤝 Contributing

This is a private campaign manager, but feel free to fork it for your own games!

## 📝 Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=darkspace_campaign
PORT=3001
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (.env.production)
```
VITE_API_URL=https://darkspacer.com/api
VITE_WS_URL=https://darkspacer.com
```

## 🐛 Troubleshooting

### Can't connect to database
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Test connection
psql -U darkspace_app -d darkspace_prod -h localhost
```

### Backend won't start
```bash
# Check logs
pm2 logs darkspace-api

# Restart
pm2 restart darkspace-api
```

### Frontend shows API error
- Check if backend is running: `pm2 status`
- Verify API URL in frontend .env
- Check CORS settings in backend

## 📞 Support

For issues or questions, check the deployment guide or review the logs first.

## 📄 License

Private project - for personal use with friends.

---

**Built for epic space adventures! 🚀✨**

May your rolls be high and your bugs be few! 🎲
