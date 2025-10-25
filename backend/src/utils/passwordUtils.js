const crypto = require('crypto');

/**
 * Hash password using SHA-512
 * @param {string} password - Plain text password
 * @returns {string} - Hashed password
 */
const hashPassword = (password) => {
  return crypto.createHash('sha512').update(password).digest('hex');
};

/**
 * Verify password against hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {boolean} - True if password matches hash
 */
const verifyPassword = (password, hash) => {
  const hashedPassword = hashPassword(password);
  return hashedPassword === hash;
};

/**
 * Generate a random device ID
 * @returns {string} - Random device identifier
 */
const generateDeviceId = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateDeviceId
};
