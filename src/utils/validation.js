/**
 * Validation utilities.
 * 
 * Implements Single Responsibility Principle - handles only validation logic.
 */

/**
 * Validate if a string is not empty.
 * 
 * @param {string} value - Value to validate
 * @returns {boolean} True if valid
 */
export function isNotEmpty(value) {
  return value && value.trim().length > 0
}

/**
 * Validate if a number is positive.
 * 
 * @param {number} value - Value to validate
 * @returns {boolean} True if valid
 */
export function isPositive(value) {
  return !isNaN(value) && parseFloat(value) >= 0
}

/**
 * Validate if a value is a valid number.
 * 
 * @param {string|number} value - Value to validate
 * @returns {boolean} True if valid
 */
export function isValidNumber(value) {
  return !isNaN(value) && isFinite(value)
}

