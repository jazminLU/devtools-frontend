/**
 * Custom hook for tool components to reduce code duplication.
 * 
 * Implements Single Responsibility Principle - handles only tool state management.
 * Provides reusable pattern for tool components (Dictionary, Shopping, Words).
 */
import { useState, useMemo } from 'react'
import { createApiService } from '../services/apiService'
import { useAsyncOperation } from './useAsyncOperation'

/**
 * Hook for tool components with API service and async operations.
 * 
 * @param {string} apiUrl - Base URL for API
 * @returns {Object} Tool utilities (apiService, loading, error, execute, resetError, result, setResult)
 */
export function useTool(apiUrl) {
  const [result, setResult] = useState(null)
  const apiService = useMemo(() => createApiService(apiUrl), [apiUrl])
  const { loading, error, execute, resetError } = useAsyncOperation()

  return {
    apiService,
    loading,
    error,
    execute,
    resetError,
    result,
    setResult,
  }
}

