# Credit Jambo Client - Backend API

A secure savings management API built with Node.js, Express.js, and PostgreSQL.

##  Features

- **User Authentication**: SHA-512 password hashing with JWT tokens
- **Device Verification**: Admin-verified device access control
- **Savings Management**: Deposit, withdraw, and balance tracking
- **Transaction History**: Complete audit trail with pagination
- **Security**: Helmet, rate limiting, input validation, CORS
- **API Documentation**: Swagger/OpenAPI documentation
- **Database**: PostgreSQL with Sequelize ORM

##  Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

##  Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd credit-jambo-client/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=4000
   NODE_ENV=development

   # PostgreSQL Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=credit_jambo_client
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_URL=postgresql://your_db_username:your_db_password@localhost:5432/credit_jambo_client

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=24h

   # Security
   BCRYPT_ROUNDS=12
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb credit_jambo_client
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE credit_jambo_client;
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

##  API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:4000/api-docs
- **Health Check**: http://localhost:4000/api/health

##  Authentication Flow

1. **Register**: User creates account with device ID
2. **Verification**: Admin verifies the device
3. **Login**: User can only login after device verification
4. **Access**: All savings operations require verified device

##  API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout user

### Savings (Requires Verified Device)
- `POST /api/savings/deposit` - Deposit money
- `POST /api/savings/withdraw` - Withdraw money
- `GET /api/savings/balance` - Get current balance
- `GET /api/savings/history` - Get transaction history

##  Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

##  Security Features

- **Password Hashing**: SHA-512 encryption
- **JWT Tokens**: Stateless authentication
- **Rate Limiting**: Prevents abuse
- **Input Validation**: Express-validator sanitization
- **CORS**: Cross-origin resource sharing control
- **Helmet**: Security headers
- **Device Verification**: Admin-controlled access

##  Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `name` (String, Required)
- `email` (String, Unique, Required)
- `password` (String, Hashed, Required)
- `deviceId` (String, Unique, Required)
- `isVerified` (Boolean, Default: false)
- `balance` (Decimal, Default: 0.00)
- `lastLoginAt` (DateTime)
- `isActive` (Boolean, Default: true)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Transactions Table
- `id` (UUID, Primary Key)
- `userId` (UUID, Foreign Key)
- `type` (Enum: 'deposit', 'withdrawal')
- `amount` (Decimal, Required)
- `balanceBefore` (Decimal, Required)
- `balanceAfter` (Decimal, Required)
- `description` (String, Optional)
- `status` (Enum: 'pending', 'completed', 'failed')
- `reference` (String, Unique, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

##  Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "errors": ["Detailed validation errors"],
  "error": "Development error details"
}
```

##  Development

### Project Structure
```
backend/
├── src/
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic
│   ├── models/          # Database models
│   ├── dtos/           # Data transfer objects
│   ├── middlewares/     # Custom middleware
│   └── utils/          # Utility functions
├── tests/              # Test files
├── server.js          # Application entry point
├── package.json       # Dependencies and scripts
└── .env.example       # Environment variables template
```

### Adding New Features

1. Create model in `src/models/`
2. Add controller in `src/controllers/`
3. Create DTOs in `src/dtos/`
4. Add middleware if needed in `src/middlewares/`
5. Write tests in `tests/`
6. Update API documentation

##  Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 4000 |
| `NODE_ENV` | Environment | development |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_NAME` | Database name | credit_jambo_client |
| `DB_USER` | Database username | - |
| `DB_PASSWORD` | Database password | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | Token expiration | 24h |
| `CORS_ORIGIN` | Allowed origins | http://localhost:3000 |


