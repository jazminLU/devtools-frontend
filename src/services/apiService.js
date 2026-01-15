/**
 * API Service layer.
 * 
 * Implements Single Responsibility Principle - handles only API communication.
 * Provides abstraction for HTTP operations (Dependency Inversion).
 */

import { API_ENDPOINTS, HTTP_METHODS, HTTP_HEADERS, ERROR_MESSAGES } from '../utils/constants'

/**
 * API Service class.
 * 
 * Encapsulates all API communication logic.
 */
export class ApiService {
  /**
   * Create API service instance.
   * 
   * @param {string} baseUrl - Base URL for API
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  /**
   * Make HTTP request.
   * 
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   * @throws {Error} If request fails
   */
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...HTTP_HEADERS.JSON,
          ...options.headers,
        },
      })

      const data = await response.json().catch(() => ({ detail: 'Invalid response' }))

      if (!response.ok) {
        throw new Error(data.detail || `HTTP ${response.status}`)
      }

      return data
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(ERROR_MESSAGES.NETWORK)
      }
      throw error
    }
  }

  /**
   * Dictionary API methods.
   */
  dictionary = {
    /**
     * Add a word to dictionary.
     * 
     * @param {string} word - Word to add
     * @param {string} definition - Word definition
     * @returns {Promise<Object>} Response data
     */
    add: (word, definition) => {
      return this.request(API_ENDPOINTS.DICTIONARY.ADD, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ word, definition }),
      })
    },

    /**
     * Get word definition.
     * 
     * @param {string} word - Word to search
     * @returns {Promise<Object>} Word definition
     */
    get: (word) => {
      return this.request(API_ENDPOINTS.DICTIONARY.GET(word), {
        method: HTTP_METHODS.GET,
      })
    },
  }

  /**
   * Shopping API methods.
   */
  shopping = {
    /**
     * Calculate shopping total.
     * 
     * @param {Object} requestData - Shopping calculation data
     * @returns {Promise<Object>} Calculation result
     */
    calculateTotal: (requestData) => {
      return this.request(API_ENDPOINTS.SHOPPING.TOTAL, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(requestData),
      })
    },
  }

  /**
   * Words API methods.
   */
  words = {
    /**
     * Concatenate words.
     * 
     * @param {string[]} words - Words to concatenate
     * @returns {Promise<Object>} Concatenation result
     */
    concatenate: (words) => {
      return this.request(API_ENDPOINTS.WORDS.CONCAT, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ words }),
      })
    },
  }
}

/**
 * Create API service instance.
 * 
 * @param {string} baseUrl - Base URL for API
 * @returns {ApiService} API service instance
 */
export function createApiService(baseUrl) {
  return new ApiService(baseUrl)
}

