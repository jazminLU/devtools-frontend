/**
 * Application constants.
 * 
 * Centralized constants following Single Responsibility Principle.
 * All magic strings and numbers should be defined here.
 */

export const API_ENDPOINTS = {
  DICTIONARY: {
    ADD: '/dictionary/add',
    GET: (word) => `/dictionary/${encodeURIComponent(word)}`,
  },
  SHOPPING: {
    TOTAL: '/shopping/total',
  },
  WORDS: {
    CONCAT: '/word/concat',
  },
}

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
}

export const HTTP_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
  },
}

export const ERROR_MESSAGES = {
  NETWORK: 'Network error: Could not connect to the API',
  GENERIC: 'An error occurred. Please try again.',
  VALIDATION: 'Please check your input and try again.',
}

export const SUCCESS_MESSAGES = {
  WORD_ADDED: (word) => `Word '${word}' added successfully`,
}

