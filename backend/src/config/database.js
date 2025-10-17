// backend/src/config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('📦 New database connection established');
});

pool.on('error', (err, client) => {
  console.error('❌ Unexpected database error on idle client:', err);
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    code: err.code
  });
  // Don't exit the process - log the error and let the pool handle reconnection
  // The pool will automatically try to recover. Only exit if it's a fatal error.
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    console.error('❌ Fatal database connection error - server shutting down');
    process.exit(1);
  }
});

module.exports = pool;