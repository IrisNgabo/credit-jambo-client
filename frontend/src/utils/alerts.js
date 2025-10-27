/**
 * Alert Utilities
 * Handles user-friendly popups and confirmations
 */

import { Alert } from 'react-native';

/**
 * Show confirmation dialog
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {Function} onConfirm - Callback for confirm action
 * @param {Function} onCancel - Callback for cancel action
 */
export const showConfirmation = (title, message, onConfirm, onCancel) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'Confirm',
        style: 'default',
        onPress: onConfirm,
      },
    ],
    { cancelable: true }
  );
};

/**
 * Show withdrawal confirmation
 * @param {number} amount - Withdrawal amount
 * @param {Function} onConfirm - Callback for confirm action
 * @param {Function} onCancel - Callback for cancel action
 */
export const showWithdrawalConfirmation = (amount, onConfirm, onCancel) => {
  showConfirmation(
    'Confirm Withdrawal',
    `Are you sure you want to withdraw $${amount.toFixed(2)}?`,
    onConfirm,
    onCancel
  );
};

/**
 * Show deposit confirmation
 * @param {number} amount - Deposit amount
 * @param {Function} onConfirm - Callback for confirm action
 * @param {Function} onCancel - Callback for cancel action
 */
export const showDepositConfirmation = (amount, onConfirm, onCancel) => {
  showConfirmation(
    'Confirm Deposit',
    `Are you sure you want to deposit $${amount.toFixed(2)}?`,
    onConfirm,
    onCancel
  );
};

/**
 * Show logout confirmation
 * @param {Function} onConfirm - Callback for confirm action
 * @param {Function} onCancel - Callback for cancel action
 */
export const showLogoutConfirmation = (onConfirm, onCancel) => {
  showConfirmation(
    'Logout',
    'Are you sure you want to logout?',
    onConfirm,
    onCancel
  );
};

/**
 * Show error alert
 * @param {string} title - Error title
 * @param {string} message - Error message
 * @param {Function} onPress - Callback for button press
 */
export const showErrorAlert = (title, message, onPress) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onPress,
      },
    ],
    { cancelable: false }
  );
};

/**
 * Show success alert
 * @param {string} title - Success title
 * @param {string} message - Success message
 * @param {Function} onPress - Callback for button press
 */
export const showSuccessAlert = (title, message, onPress) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onPress,
      },
    ],
    { cancelable: false }
  );
};

/**
 * Show info alert
 * @param {string} title - Info title
 * @param {string} message - Info message
 * @param {Function} onPress - Callback for button press
 */
export const showInfoAlert = (title, message, onPress) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onPress,
      },
    ],
    { cancelable: true }
  );
};

/**
 * Show validation error alert
 * @param {string} field - Field name
 * @param {string} message - Validation message
 */
export const showValidationError = (field, message) => {
  showErrorAlert(
    'Validation Error',
    `${field}: ${message}`,
    () => {}
  );
};

/**
 * Show insufficient funds alert
 * @param {number} balance - Current balance
 * @param {number} amount - Requested amount
 */
export const showInsufficientFundsAlert = (balance, amount) => {
  showErrorAlert(
    'Insufficient Funds',
    `You have $${balance.toFixed(2)} available. You cannot withdraw $${amount.toFixed(2)}.`,
    () => {}
  );
};

/**
 * Show device verification alert
 */
export const showDeviceVerificationAlert = () => {
  showInfoAlert(
    'Device Verification Required',
    'Your device needs to be verified by an admin before you can access all features. Please contact support for assistance.',
    () => {}
  );
};

/**
 * Show network error alert
 */
export const showNetworkErrorAlert = () => {
  showErrorAlert(
    'Connection Error',
    'Please check your internet connection and try again.',
    () => {}
  );
};

/**
 * Show server error alert
 */
export const showServerErrorAlert = () => {
  showErrorAlert(
    'Server Error',
    'Something went wrong on our end. Please try again later.',
    () => {}
  );
};

/**
 * Show authentication error alert
 */
export const showAuthErrorAlert = () => {
  showErrorAlert(
    'Authentication Failed',
    'Your session has expired. Please login again.',
    () => {}
  );
};

/**
 * Show low balance warning alert
 * @param {number} balance - Current balance
 */
export const showLowBalanceAlert = (balance) => {
  showInfoAlert(
    'Low Balance Warning',
    `Your balance is $${balance.toFixed(2)}. Consider adding funds to avoid any issues.`,
    () => {}
  );
};

/**
 * Show feature not available alert
 * @param {string} feature - Feature name
 */
export const showFeatureNotAvailableAlert = (feature) => {
  showInfoAlert(
    'Feature Not Available',
    `${feature} is not available yet. Please check back later.`,
    () => {}
  );
};

/**
 * Show maintenance alert
 */
export const showMaintenanceAlert = () => {
  showInfoAlert(
    'System Maintenance',
    'The system is currently under maintenance. Please try again later.',
    () => {}
  );
};

/**
 * Show rate limit alert
 */
export const showRateLimitAlert = () => {
  showErrorAlert(
    'Too Many Requests',
    'You have made too many requests. Please wait a moment and try again.',
    () => {}
  );
};
