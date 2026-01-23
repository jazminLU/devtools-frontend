import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTool } from './useTool'
import { createApiService } from '../services/apiService'

vi.mock('../services/apiService', () => ({
  createApiService: vi.fn(() => ({
    dictionary: {},
    shopping: {},
    words: {},
  })),
}))

describe('useTool', () => {
  it('should initialize with correct structure', () => {
    const apiUrl = 'http://localhost:8000'
    const { result } = renderHook(() => useTool(apiUrl))

    expect(result.current).toHaveProperty('apiService')
    expect(result.current).toHaveProperty('loading')
    expect(result.current).toHaveProperty('error')
    expect(result.current).toHaveProperty('execute')
    expect(result.current).toHaveProperty('resetError')
    expect(result.current).toHaveProperty('result')
    expect(result.current).toHaveProperty('setResult')
  })

  it('should create API service with provided URL', () => {
    const apiUrl = 'http://localhost:8000'
    renderHook(() => useTool(apiUrl))

    expect(createApiService).toHaveBeenCalledWith(apiUrl)
  })

  it('should initialize result as null', () => {
    const apiUrl = 'http://localhost:8000'
    const { result } = renderHook(() => useTool(apiUrl))

    expect(result.current.result).toBeNull()
  })

  it('should provide setResult function', () => {
    const apiUrl = 'http://localhost:8000'
    const { result } = renderHook(() => useTool(apiUrl))

    expect(typeof result.current.setResult).toBe('function')
  })
})

