/**
 * Custom hook for async operations with loading and error states.
 * 
 * Implements Single Responsibility Principle - handles only async state management.
 * Provides reusable pattern for API calls.
 */

import { useState, useCallback } from 'react'

/**
 * Hook to manage async operations.
 * 
 * @returns {Object} Async operation utilities
 */
export function useAsyncOperation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Execute async operation with loading and error handling.
   * 
   * @param {Function} asyncFn - Async function to execute
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback (optional)
   */
  const execute = useCallback(async (asyncFn, onSuccess, onError) => {
    setLoading(true)
    setError(null)

    try {
      const result = await asyncFn()
      if (onSuccess) {
        onSuccess(result)
      }
      return result
    } catch (err) {
      const errorMessage = err.message || 'An error occurred'
      setError(errorMessage)
      if (onError) {
        onError(err)
      }
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  return {
    loading,
    error,
    execute,
    resetError,
  }
}

