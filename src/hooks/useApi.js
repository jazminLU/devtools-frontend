/**
 * Custom hook for API calls.
 * 
 * Implements Single Responsibility Principle - handles only API communication.
 * Provides abstraction for HTTP operations (Dependency Inversion).
 */

/**
 * Hook to make API calls with error handling and loading states.
 * 
 * @param {string} baseUrl - Base URL for API
 * @returns {Object} API utilities
 */
export function useApi(baseUrl) {
  /**
   * Make a GET request.
   * 
   * @param {string} endpoint - API endpoint
   * @returns {Promise<Object>} Response data
   * @throws {Error} If request fails
   */
  const get = async (endpoint) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    return response.json()
  }

  /**
   * Make a POST request.
   * 
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise<Object>} Response data
   * @throws {Error} If request fails
   */
  const post = async (endpoint, data) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    return response.json()
  }

  return { get, post }
}

