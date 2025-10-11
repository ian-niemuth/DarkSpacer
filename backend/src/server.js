// backend/src/server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

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
// const spaceRoutes = require('./routes/space'); // DEPRECATED - Will be refactored later

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
// app.use('/api/space', spaceRoutes); // DEPRECATED - Will be refactored later

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DarkSpace Campaign Manager API' });
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join_character', (characterId) => {
    socket.join(`character_${characterId}`);
    console.log(`Socket ${socket.id} joined character_${characterId}`);
  });

  socket.on('join_ship_room', (shipId) => {
    socket.join(`ship_${shipId}`);
    console.log(`Socket ${socket.id} joined ship_${shipId}`);
  });

  socket.on('leave_ship_room', (shipId) => {
    socket.leave(`ship_${shipId}`);
    console.log(`Socket ${socket.id} left ship_${shipId}`);
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
});

module.exports = server;