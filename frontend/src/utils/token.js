/**
 * JWT Token Management Utilities
 * Handles secure token storage and retrieval
 */

import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

/**
 * Store JWT token securely
 * @param {string} token - JWT token to store
 * @returns {Promise<boolean>} - Success status
 */
export const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error('Error storing token:', error);
    return false;
  }
};

/**
 * Retrieve JWT token from secure storage
 * @returns {Promise<string|null>} - JWT token or null
 */
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

/**
 * Remove JWT token from storage
 * @returns {Promise<boolean>} - Success status
 */
export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('Error removing token:', error);
    return false;
  }
};

/**
 * Store user data securely
 * @param {Object} userData - User data to store
 * @returns {Promise<boolean>} - Success status
 */
export const storeUserData = async (userData) => {
  try {
    await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error storing user data:', error);
    return false;
  }
};

/**
 * Retrieve user data from secure storage
 * @returns {Promise<Object|null>} - User data or null
 */
export const getUserData = async () => {
  try {
    const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

/**
 * Remove user data from storage
 * @returns {Promise<boolean>} - Success status
 */
export const removeUserData = async () => {
  try {
    await SecureStore.deleteItemAsync(USER_DATA_KEY);
    return true;
  } catch (error) {
    console.error('Error removing user data:', error);
    return false;
  }
};

/**
 * Clear all stored authentication data
 * @returns {Promise<boolean>} - Success status
 */
export const clearAuthData = async () => {
  try {
    await Promise.all([
      removeToken(),
      removeUserData()
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing auth data:', error);
    return false;
  }
};

/**
 * Check if token exists and is valid
 * @returns {Promise<boolean>} - Token validity
 */
export const isTokenValid = async () => {
  try {
    const token = await getToken();
    if (!token) return false;
    
    // Basic JWT structure check (3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Check if token is expired (basic check)
    try {
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

/**
 * Get token expiration time
 * @returns {Promise<Date|null>} - Expiration date or null
 */
export const getTokenExpiration = async () => {
  try {
    const token = await getToken();
    if (!token) return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    return new Date(payload.exp * 1000);
  } catch (error) {
    console.error('Error getting token expiration:', error);
    return null;
  }
};
