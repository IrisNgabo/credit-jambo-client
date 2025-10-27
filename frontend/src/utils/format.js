/**
 * Formatting Utilities
 * Handles formatting of dates, amounts, and other data
 */

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

/**
 * Format date for transaction history (shorter format)
 * @param {string|Date} date - Date to format
 * @returns {string} Short formatted date string
 */
export const formatTransactionDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format date for profile (longer format)
 * @param {string|Date} date - Date to format
 * @returns {string} Long formatted date string
 */
export const formatProfileDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(dateObj);
};

/**
 * Format transaction amount with sign
 * @param {number} amount - Amount to format
 * @param {string} type - Transaction type ('deposit' or 'withdrawal')
 * @returns {string} Formatted amount with sign
 */
export const formatTransactionAmount = (amount, type) => {
  const sign = type === 'deposit' ? '+' : '-';
  return `${sign}${formatCurrency(amount)}`;
};

/**
 * Format balance with appropriate styling
 * @param {number} balance - Balance amount
 * @returns {Object} Formatted balance with styling info
 */
export const formatBalance = (balance) => {
  const formatted = formatCurrency(balance);
  const isLow = balance < 10;
  const isZero = balance === 0;
  
  return {
    formatted,
    isLow,
    isZero,
    color: isZero ? '#F44336' : isLow ? '#FF9800' : '#4CAF50'
  };
};

/**
 * Format number with commas
 * @param {number} number - Number to format
 * @returns {string} Formatted number with commas
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

/**
 * Format percentage
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format phone number
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

/**
 * Format name (capitalize first letter of each word)
 * @param {string} name - Name to format
 * @returns {string} Formatted name
 */
export const formatName = (name) => {
  return name.replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format transaction description
 * @param {string} description - Transaction description
 * @returns {string} Formatted description
 */
export const formatTransactionDescription = (description) => {
  if (!description) return 'No description';
  return truncateText(description, 50);
};
