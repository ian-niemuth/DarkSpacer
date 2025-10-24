// backend/src/server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Validate required environment variables at startup
const requiredEnvVars = [
  'JWT_SECRET',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\nPlease set these variables in your .env file');
  process.exit(1);
}

// Validate JWT_SECRET is strong enough
if (process.env.JWT_SECRET.length < 32) {
  console.error('❌ JWT_SECRET must be at least 32 characters long for security');
  process.exit(1);
}

console.log('✅ Environment variables validated');

const { apiLimiter } = require('./middleware/security');

const pool = require('./config/database');
const authRoutes = require('./routes/auth');
const characterRoutes = require('./routes/characters');
const adminRoutes = require('./routes/admin');
const inventoryRoutes = require('./routes/inventory');
const equipmentRoutes = require('./routes/equipment');
const shipRoutes = require('./routes/ships');
const shipWeaponsRoutes = require('./routes/ships-weapons');
const shipExtrasRoutes = require('./routes/ships-extras');
const shipUpgradesRoutes = require('./routes/ships-upgrades');
const shipCaptainRoutes = require('./routes/ships-captain');
const shipCargoRoutes = require('./routes/shipCargo');
const playerShipsRoutes = require('./routes/player-ships');
const advancementRoutes = require('./routes/advancement');
const abilitiesRoutes = require('./routes/abilities');
const commsRoutes = require('./routes/comms');
const salvageRoutes = require('./routes/salvage');
const bugReportsRoutes = require('./routes/bugReports');
const registrationCodesRoutes = require('./routes/registrationCodes');
const starMapRoutes = require('./routes/star-map');
const publicRoutes = require('./routes/public');
// const spaceRoutes = require('./routes/space'); // DEPRECATED - Will be refactored later

// Background jobs
const { initEnergyCellCleanupJob } = require('./utils/energyCellCleanup');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.CLIENT_URL || 'https://darkspacer.com'
      : "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || 'https://darkspacer.com'
    : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use(apiLimiter); // Apply rate limiting to all routes

// Serve static files from public directory (for avatars)
app.use('/uploads', express.static(path.join(__dirname, '../public/avatars')));

// Add cache control headers for API responses
app.use('/api', (req, res, next) => {
  // Prevent caching of API responses
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  });
  next();
});

app.set('io', io);

app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/ships', shipRoutes);
app.use('/api/ships', shipWeaponsRoutes);
app.use('/api/ships', shipExtrasRoutes);
app.use('/api/ships', shipUpgradesRoutes);
app.use('/api/ships', shipCaptainRoutes);
app.use('/api/ships', shipCargoRoutes);
app.use('/api/player-ships', playerShipsRoutes);
app.use('/api/advancement', advancementRoutes);
app.use('/api/abilities', abilitiesRoutes);
app.use('/api/comms', commsRoutes);
app.use('/api/salvage', salvageRoutes);
app.use('/api/bug-reports', bugReportsRoutes);
app.use('/api/registration-codes', registrationCodesRoutes);
app.use('/api/star-map', starMapRoutes);
app.use('/api/public', publicRoutes);
// app.use('/api/space', spaceRoutes); // DEPRECATED - Will be refactored later

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DarkSpace Campaign Manager API' });
});

// Socket.IO authentication middleware (optional auth)
// Allows unauthenticated connections to receive broadcast events
// but protects user-specific events
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // Attach user info to socket
      socket.authenticated = true;
    } catch (error) {
      console.log('Invalid token provided, allowing unauthenticated connection');
      socket.authenticated = false;
    }
  } else {
    socket.authenticated = false;
  }

  next(); // Allow connection regardless of authentication
});

io.on('connection', (socket) => {
  const userInfo = socket.authenticated ? socket.user.username : 'Unauthenticated (HUD)';
  console.log('Client connected:', socket.id, 'User:', userInfo);

  socket.on('join_character', async (characterId) => {
    // Require authentication for user-specific events
    if (!socket.authenticated) {
      socket.emit('error', { message: 'Authentication required for this action' });
      return;
    }

    try {
      // Verify user owns this character or is admin
      const result = await pool.query(
        'SELECT id FROM characters WHERE id = $1 AND (user_id = $2 OR $3 = true)',
        [characterId, socket.user.userId, socket.user.isAdmin || false]
      );

      if (result.rows.length === 0) {
        socket.emit('error', { message: 'Access denied: Character not found or not owned by you' });
        return;
      }

      socket.join(`character_${characterId}`);
      console.log(`Socket ${socket.id} (${socket.user.username}) joined character_${characterId}`);
    } catch (error) {
      console.error('Error joining character room:', error);
      socket.emit('error', { message: 'Failed to join character room' });
    }
  });

  socket.on('join_ship_room', async (shipId) => {
    // Require authentication for user-specific events
    if (!socket.authenticated) {
      socket.emit('error', { message: 'Authentication required for this action' });
      return;
    }

    try {
      // Verify user has a character that is crew on this ship or is admin
      const result = await pool.query(
        `SELECT s.id FROM ships s
         JOIN ship_crew sc ON s.id = sc.ship_id
         JOIN characters c ON sc.character_id = c.id
         WHERE s.id = $1 AND (c.user_id = $2 OR $3 = true)`,
        [shipId, socket.user.userId, socket.user.isAdmin || false]
      );

      if (result.rows.length === 0) {
        socket.emit('error', { message: 'Access denied: Not a crew member of this ship' });
        return;
      }

      socket.join(`ship_${shipId}`);
      console.log(`Socket ${socket.id} (${socket.user.username}) joined ship_${shipId}`);
    } catch (error) {
      console.error('Error joining ship room:', error);
      socket.emit('error', { message: 'Failed to join ship room' });
    }
  });

  socket.on('leave_ship_room', (shipId) => {
    // Require authentication for user-specific events
    if (!socket.authenticated) {
      socket.emit('error', { message: 'Authentication required for this action' });
      return;
    }

    socket.leave(`ship_${shipId}`);
    console.log(`Socket ${socket.id} (${socket.user.username}) left ship_${shipId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🔌 Socket.IO ready for real-time updates`);

  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('❌ Database connection failed:', err.message);
    } else {
      console.log('✅ Database connected successfully');
    }
  });

  // Start background jobs
  initEnergyCellCleanupJob(io);
});

module.exports = server;

