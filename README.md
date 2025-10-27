# Credit Jambo Client Application

A comprehensive savings management system with secure authentication, device verification, and real-time transaction tracking.

## 🚀 Features

### Backend (Node.js + Express + PostgreSQL)
- **Secure Authentication**: SHA-512 password hashing with JWT tokens
- **Device Verification**: Admin-controlled device access
- **Savings Management**: Deposit, withdraw, balance tracking
- **Transaction History**: Complete audit trail with pagination
- **Security**: Helmet, rate limiting, CORS, input validation
- **API Documentation**: Swagger/OpenAPI at `/api-docs`
- **Testing**: Comprehensive Jest test suite
- **Docker Support**: Full containerization

### Frontend (React Native + Expo)
- **Mobile App**: Cross-platform iOS/Android/Web
- **State Management**: Redux Toolkit with persistent storage
- **Secure Storage**: Expo SecureStore for tokens
- **Modern UI**: Clean, intuitive interface
- **Real-time Updates**: Live balance and transaction updates
- **Navigation**: Bottom tabs with stack navigation

## 🏗️ Architecture

```
credit-jambo-client/
├── backend/                 # Node.js API Server
│   ├── src/
│   │   ├── controllers/    # API endpoints
│   │   ├── models/         # Database models
│   │   ├── middlewares/    # Authentication & security
│   │   ├── utils/         # Helper functions
│   │   └── dtos/          # Data transfer objects
│   ├── tests/             # Jest test suite
│   ├── Dockerfile         # Container configuration
│   └── README.md          # Backend documentation
├── frontend/              # React Native App
│   ├── src/
│   │   ├── pages/         # Screen components
│   │   ├── navigation/    # App navigation
│   │   ├── store/         # Redux store
│   │   └── services/      # API integration
│   ├── Dockerfile         # Container configuration
│   └── README.md          # Frontend documentation
├── docker-compose.yml     # Full stack orchestration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- Docker & Docker Compose (optional)

### Option 1: Docker (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd credit-jambo-client

# Start the entire stack
docker-compose up -d

# Backend API: http://localhost:4000
# API Docs: http://localhost:4000/api-docs
# Frontend: http://localhost:3000
```

### Option 2: Local Development
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Update .env with your database credentials
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
cp .env.example .env
npm start
```

## 🔐 Security Features

- **SHA-512 Password Hashing**: Secure password storage
- **JWT Authentication**: Stateless token-based auth
- **Device Verification**: Admin-controlled access
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Comprehensive data sanitization
- **CORS Protection**: Cross-origin request security
- **Secure Headers**: Helmet.js security middleware

## 📱 User Flow

1. **Registration**: User creates account with device ID
2. **Device Verification**: Admin verifies the device
3. **Login**: User can access app after verification
4. **Savings Management**: Deposit, withdraw, view balance
5. **Transaction History**: Complete audit trail

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test
npm run test:coverage

# Frontend tests
cd frontend
npm test
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile
- `POST /api/auth/logout` - User logout

### Savings (Requires Verified Device)
- `POST /api/savings/deposit` - Deposit money
- `POST /api/savings/withdraw` - Withdraw money
- `GET /api/savings/balance` - Get current balance
- `GET /api/savings/history` - Get transaction history

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild services
docker-compose up --build

# Run tests in container
docker-compose exec backend npm test
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=4000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=credit_jambo_client
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
EXPO_PUBLIC_API_URL=http://localhost:4000/api
EXPO_PUBLIC_APP_NAME=Credit Jambo
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions:
- Check the documentation in `/backend/README.md` and `/frontend/README.md`
- Review existing issues
- Create a new issue with detailed description
Savings Management System Client side
