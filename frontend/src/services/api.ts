import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Base API configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear stored token
      try {
        await SecureStore.deleteItemAsync('authToken');
        await SecureStore.deleteItemAsync('userData');
      } catch (clearError) {
        console.error('Error clearing stored data:', clearError);
      }
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// Savings API endpoints
export const savingsAPI = {
  deposit: async (data: {
    amount: number;
    description?: string;
  }) => {
    const response = await api.post('/savings/deposit', data);
    return response.data;
  },

  withdraw: async (data: {
    amount: number;
    description?: string;
  }) => {
    const response = await api.post('/savings/withdraw', data);
    return response.data;
  },

  getBalance: async () => {
    const response = await api.get('/savings/balance');
    return response.data;
  },

  getHistory: async (params?: {
    page?: number;
    limit?: number;
    type?: 'deposit' | 'withdrawal';
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await api.get('/savings/history', { params });
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
