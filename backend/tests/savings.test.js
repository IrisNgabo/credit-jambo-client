const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../src/models');
const User = require('../src/models/User');
const Transaction = require('../src/models/Transaction');
const { generateToken } = require('../src/utils/jwtUtils');

describe('Savings Endpoints', () => {
  let authToken;
  let testUser;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    // Clean up data
    await Transaction.destroy({ where: {} });
    await User.destroy({ where: {} });

    // Create test user
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
      deviceId: 'test-device-id',
      isVerified: true,
      balance: 100.00
    });

    // Generate token
    authToken = generateToken(testUser);
  });

  describe('POST /api/savings/deposit', () => {
    it('should deposit money successfully', async () => {
      const depositData = {
        amount: 50.00,
        description: 'Test deposit'
      };

      const response = await request(app)
        .post('/api/savings/deposit')
        .set('Authorization', `Bearer ${authToken}`)
        .send(depositData)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('transaction');
      expect(response.body).toHaveProperty('newBalance');
      expect(response.body.newBalance).toBe(150.00);
    });

    it('should not deposit without authentication', async () => {
      const depositData = {
        amount: 50.00
      };

      await request(app)
        .post('/api/savings/deposit')
        .send(depositData)
        .expect(401);
    });
  });

  describe('POST /api/savings/withdraw', () => {
    it('should withdraw money successfully', async () => {
      const withdrawData = {
        amount: 25.00,
        description: 'Test withdrawal'
      };

      const response = await request(app)
        .post('/api/savings/withdraw')
        .set('Authorization', `Bearer ${authToken}`)
        .send(withdrawData)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('transaction');
      expect(response.body).toHaveProperty('newBalance');
      expect(response.body.newBalance).toBe(75.00);
    });

    it('should not withdraw more than balance', async () => {
      const withdrawData = {
        amount: 200.00
      };

      const response = await request(app)
        .post('/api/savings/withdraw')
        .set('Authorization', `Bearer ${authToken}`)
        .send(withdrawData)
        .expect(400);

      expect(response.body.message).toContain('Insufficient funds');
    });
  });

  describe('GET /api/savings/balance', () => {
    it('should get current balance', async () => {
      const response = await request(app)
        .get('/api/savings/balance')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('balance');
      expect(response.body.balance).toBe(100.00);
    });
  });

  describe('GET /api/savings/history', () => {
    it('should get transaction history', async () => {
      // Create some test transactions
      await Transaction.create({
        userId: testUser.id,
        type: 'deposit',
        amount: 50.00,
        balanceBefore: 100.00,
        balanceAfter: 150.00,
        status: 'completed'
      });

      const response = await request(app)
        .get('/api/savings/history')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('transactions');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.transactions)).toBe(true);
    });
  });
});
