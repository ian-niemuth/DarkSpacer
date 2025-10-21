// Security middleware for production
const rateLimit = require('express-rate-limit');

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV !== 'production';

// Rate limiting for login attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 login attempts per 15 minutes
  message: 'Too many login attempts, please try again in 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // 1000 requests per minute (allows for rapid HP adjustments and active gameplay)
  message: 'Too many requests, please slow down!',
  standardHeaders: true,
  legacyHeaders: false,
});

// Input sanitization helper
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  // Remove basic XSS attempts
  return str
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
};

// Validate username format
const isValidUsername = (username) => {
  return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
};

// Validate password strength (basic)
const isValidPassword = (password) => {
  return password && password.length >= 8;
};

module.exports = {
  authLimiter,
  apiLimiter,
  sanitizeInput,
  isValidUsername,
  isValidPassword
};
