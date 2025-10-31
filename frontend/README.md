# Credit Jambo Client - React Native Frontend

A mobile savings management application built with React Native, Expo, and Redux Toolkit.

##  Features

- **User Authentication**: Secure login and registration with device verification
- **Savings Management**: Deposit, withdraw, and track your savings
- **Transaction History**: Complete audit trail with pagination
- **Real-time Balance**: Live balance updates
- **Device Security**: Admin-verified device access control
- **Modern UI**: Clean, intuitive interface with smooth animations


##  Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

##  Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd credit-jambo-client/frontend
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
   # API Configuration
   EXPO_PUBLIC_API_URL=http://localhost:4000/api
   
   # App Configuration
   EXPO_PUBLIC_APP_NAME=Credit Jambo
   EXPO_PUBLIC_APP_VERSION=1.0.0
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

##  Running the App

### Development Mode
```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web
```

### Production Build
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

##  Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── DepositScreen.tsx
│   │   ├── WithdrawScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── services/          # API services
│   │   └── api.ts
│   ├── store/             # Redux store and slices
│   │   ├── index.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       └── savingsSlice.ts
│   └── utils/             # Utility functions
├── App.tsx                # Main app component
├── package.json           # Dependencies and scripts
└── .env.example          # Environment variables template
```

##  Authentication Flow

1. **Registration**: User creates account with device ID generation
2. **Device Verification**: Admin must verify the device
3. **Login**: User can only access app after device verification
4. **Secure Storage**: JWT tokens stored securely using Expo SecureStore

##  API Integration

The app communicates with the backend API through:
- **Authentication**: Login, register, profile management
- **Savings**: Deposit, withdraw, balance, transaction history
- **Security**: JWT token management and automatic refresh



##  Security Features

- **Secure Storage**: Tokens stored using Expo SecureStore
- **Automatic Logout**: Token expiration handling
- **Device Verification**: Admin-controlled access
- **Input Validation**: Client-side form validation
- **Error Boundaries**: Graceful error handling

##  State Management

Uses Redux Toolkit for state management:
- **Auth Slice**: User authentication and profile
- **Savings Slice**: Balance and transaction management
- **Persistent Storage**: Automatic state persistence

##  Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

##  Supported Platforms

- **iOS**: 11.0+
- **Android**: API level 21+
- **Web**: Modern browsers

##  Development

### Adding New Features

1. Create components in `src/components/`
2. Add screens in `src/pages/`
3. Update navigation in `src/navigation/`
4. Add API calls in `src/services/`
5. Update Redux slices in `src/store/slices/`
6. Write tests for new functionality



##  Dependencies

### Core Dependencies
- `expo`: React Native framework
- `@react-navigation/native`: Navigation
- `@reduxjs/toolkit`: State management
- `axios`: HTTP client
- `expo-secure-store`: Secure storage

### Development Dependencies
- `typescript`: Type safety
- `@types/react`: React types
- `jest`: Testing framework

##  Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `expo start -c`
2. **iOS simulator not opening**: Check Xcode installation
3. **Android emulator issues**: Verify Android Studio setup
4. **API connection errors**: Check backend server and environment variables

### Debug Mode

```bash
# Enable debug mode
expo start --dev-client

# View logs
expo logs
```

##  Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `EXPO_PUBLIC_API_URL` | Backend API URL | http://localhost:4000/api |
| `EXPO_PUBLIC_APP_NAME` | App name | Credit Jambo |
| `EXPO_PUBLIC_APP_VERSION` | App version | 1.0.0 |




