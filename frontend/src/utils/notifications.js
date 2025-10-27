/**
 * Notification Utilities
 * Handles push notifications and toast messages
 */

import Toast from 'react-native-toast-message';

/**
 * Show success toast notification
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 */
export const showSuccessToast = (title, message) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 4000,
  });
};

/**
 * Show error toast notification
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 */
export const showErrorToast = (title, message) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 5000,
  });
};

/**
 * Show info toast notification
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 */
export const showInfoToast = (title, message) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 4000,
  });
};

/**
 * Show warning toast notification
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 */
export const showWarningToast = (title, message) => {
  Toast.show({
    type: 'info', // Using info type for warning
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 4000,
  });
};

/**
 * Hide all toasts
 */
export const hideAllToasts = () => {
  Toast.hide();
};

/**
 * Show deposit success notification
 * @param {number} amount - Deposit amount
 */
export const showDepositSuccess = (amount) => {
  showSuccessToast(
    'Deposit Successful',
    `$${amount.toFixed(2)} has been added to your account`
  );
};

/**
 * Show withdrawal success notification
 * @param {number} amount - Withdrawal amount
 */
export const showWithdrawalSuccess = (amount) => {
  showSuccessToast(
    'Withdrawal Successful',
    `$${amount.toFixed(2)} has been withdrawn from your account`
  );
};

/**
 * Show withdrawal failure notification
 * @param {string} reason - Failure reason
 */
export const showWithdrawalFailure = (reason) => {
  showErrorToast(
    'Withdrawal Failed',
    reason || 'Insufficient funds for this transaction'
  );
};

/**
 * Show low balance warning
 * @param {number} balance - Current balance
 */
export const showLowBalanceWarning = (balance) => {
  showWarningToast(
    'Low Balance Alert',
    `Your balance is $${balance.toFixed(2)}. Consider adding funds.`
  );
};

/**
 * Show device verification notification
 */
export const showDeviceVerificationRequired = () => {
  showWarningToast(
    'Device Verification Required',
    'Your device needs to be verified by an admin before you can access all features.'
  );
};

/**
 * Show device verification success
 */
export const showDeviceVerified = () => {
  showSuccessToast(
    'Device Verified',
    'Your device has been verified. You can now access all features.'
  );
};

/**
 * Show login success notification
 */
export const showLoginSuccess = () => {
  showSuccessToast(
    'Welcome Back!',
    'You have successfully logged in.'
  );
};

/**
 * Show registration success notification
 */
export const showRegistrationSuccess = () => {
  showSuccessToast(
    'Registration Successful',
    'Your account has been created. Please wait for device verification.'
  );
};

/**
 * Show network error notification
 */
export const showNetworkError = () => {
  showErrorToast(
    'Connection Error',
    'Please check your internet connection and try again.'
  );
};

/**
 * Show server error notification
 */
export const showServerError = () => {
  showErrorToast(
    'Server Error',
    'Something went wrong. Please try again later.'
  );
};

/**
 * Show authentication error notification
 */
export const showAuthError = () => {
  showErrorToast(
    'Authentication Failed',
    'Please login again to continue.'
  );
};
