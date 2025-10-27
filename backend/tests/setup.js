// Jest setup file
const { sequelize } = require('../src/models');

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DB_URL = 'postgresql://postgres:postgres@localhost:5432/credit_jambo_test';

// Global test setup
beforeAll(async () => {
  // Setup test database connection
  await sequelize.authenticate();
});

// Global test teardown
afterAll(async () => {
  // Close database connection
  await sequelize.close();
});

// Increase timeout for database operations
jest.setTimeout(30000);
