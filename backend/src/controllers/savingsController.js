const express = require('express');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { authenticateToken, requireVerifiedDevice } = require('../middlewares/authMiddleware');
const { transactionDTO, transactionListDTO } = require('../dtos/transactionDTO');

const router = express.Router();

/**
 * @swagger
 * /api/savings/deposit:
 *   post:
 *     summary: Deposit money to savings account
 *     tags: [Savings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0.01
 *               description:
 *                 type: string
 *                 maxLength: 255
 *     responses:
 *       200:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 transaction:
 *                   $ref: '#/components/schemas/Transaction'
 *                 newBalance:
 *                   type: number
 *       400:
 *         description: Validation error or insufficient data
 *       403:
 *         description: Device not verified
 *       500:
 *         description: Server error
 */
router.post('/deposit', authenticateToken, requireVerifiedDevice, [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be at least 0.01'),
  body('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Description must be less than 255 characters')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { amount, description } = req.body;
    const userId = req.user.id;
    const balanceBefore = parseFloat(req.user.balance);
    const balanceAfter = balanceBefore + parseFloat(amount);

    // Start transaction
    const t = await Transaction.sequelize.transaction();

    try {
      // Update user balance
      await req.user.update({ balance: balanceAfter }, { transaction: t });

      // Create transaction record
      const transaction = await Transaction.create({
        userId,
        type: 'deposit',
        amount: parseFloat(amount),
        balanceBefore,
        balanceAfter,
        description: description || 'Deposit to savings account',
        status: 'completed'
      }, { transaction: t });

      await t.commit();

      res.status(200).json({
        message: 'Deposit successful',
        transaction: transactionDTO(transaction),
        newBalance: balanceAfter
      });

    } catch (error) {
      await t.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({
      message: 'Deposit failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/savings/withdraw:
 *   post:
 *     summary: Withdraw money from savings account
 *     tags: [Savings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0.01
 *               description:
 *                 type: string
 *                 maxLength: 255
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 transaction:
 *                   $ref: '#/components/schemas/Transaction'
 *                 newBalance:
 *                   type: number
 *       400:
 *         description: Validation error or insufficient funds
 *       403:
 *         description: Device not verified
 *       500:
 *         description: Server error
 */
router.post('/withdraw', authenticateToken, requireVerifiedDevice, [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be at least 0.01'),
  body('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Description must be less than 255 characters')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { amount, description } = req.body;
    const userId = req.user.id;
    const balanceBefore = parseFloat(req.user.balance);
    const withdrawalAmount = parseFloat(amount);

    // Check if user has sufficient funds
    if (balanceBefore < withdrawalAmount) {
      return res.status(400).json({
        message: 'Insufficient funds',
        currentBalance: balanceBefore,
        requestedAmount: withdrawalAmount
      });
    }

    const balanceAfter = balanceBefore - withdrawalAmount;

    // Start transaction
    const t = await Transaction.sequelize.transaction();

    try {
      // Update user balance
      await req.user.update({ balance: balanceAfter }, { transaction: t });

      // Create transaction record
      const transaction = await Transaction.create({
        userId,
        type: 'withdrawal',
        amount: withdrawalAmount,
        balanceBefore,
        balanceAfter,
        description: description || 'Withdrawal from savings account',
        status: 'completed'
      }, { transaction: t });

      await t.commit();

      res.status(200).json({
        message: 'Withdrawal successful',
        transaction: transactionDTO(transaction),
        newBalance: balanceAfter
      });

    } catch (error) {
      await t.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Withdrawal error:', error);
    res.status(500).json({
      message: 'Withdrawal failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/savings/balance:
 *   get:
 *     summary: Get current account balance
 *     tags: [Savings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                 currency:
 *                   type: string
 *       403:
 *         description: Device not verified
 *       500:
 *         description: Server error
 */
router.get('/balance', authenticateToken, requireVerifiedDevice, async (req, res) => {
  try {
    const balance = parseFloat(req.user.balance);
    
    res.status(200).json({
      balance,
      currency: 'USD',
      lastUpdated: req.user.updatedAt
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({
      message: 'Failed to retrieve balance',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/savings/history:
 *   get:
 *     summary: Get transaction history
 *     tags: [Savings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of transactions per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [deposit, withdrawal]
 *         description: Filter by transaction type
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date filter (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date filter (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Transaction history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       403:
 *         description: Device not verified
 *       500:
 *         description: Server error
 */
router.get('/history', authenticateToken, requireVerifiedDevice, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      type,
      startDate,
      endDate
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const whereClause = { userId: req.user.id };

    // Add filters
    if (type) {
      whereClause.type = type;
    }

    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt[Op.gte] = new Date(startDate);
      }
      if (endDate) {
        whereClause.createdAt[Op.lte] = new Date(endDate + 'T23:59:59.999Z');
      }
    }

    // Get transactions with pagination
    const { count, rows: transactions } = await Transaction.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    const totalPages = Math.ceil(count / parseInt(limit));

    res.status(200).json({
      transactions: transactionListDTO(transactions),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: totalPages
      }
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      message: 'Failed to retrieve transaction history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
