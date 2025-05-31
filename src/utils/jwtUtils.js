// utils/jwtUtils.js

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

// Function to generate a JWT token with 24-hour expiry
exports.generateToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: '24h' });
};

// Function to verify a token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (err) {
    return null; // Invalid token
  }
};
