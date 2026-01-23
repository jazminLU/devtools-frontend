import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAsyncOperation } from './useAsyncOperation'

describe('useAsyncOperation', () => {
  it('should initialize with loading false and error null', () => {
    const { result } = renderHook(() => useAsyncOperation())
    
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should set loading to true during async operation', async () => {
    const { result } = renderHook(() => useAsyncOperation())
    const asyncFn = vi.fn(() => new Promise(resolve => setTimeout(() => resolve('success'), 10)))

    act(() => {
      result.current.execute(asyncFn)
    })

    expect(result.current.loading).toBe(true)
    
    await act(async () => {
      await asyncFn()
    })
  })

  it('should set loading to false after async operation completes', async () => {
    const { result } = renderHook(() => useAsyncOperation())
    const asyncFn = vi.fn(() => Promise.resolve('success'))

    await act(async () => {
      await result.current.execute(asyncFn)
    })

    expect(result.current.loading).toBe(false)
  })

  it('should call onSuccess callback when operation succeeds', async () => {
    const { result } = renderHook(() => useAsyncOperation())
    const asyncFn = vi.fn(() => Promise.resolve('success'))
    const onSuccess = vi.fn()

    await act(async () => {
      await result.current.execute(asyncFn, onSuccess)
    })

    expect(onSuccess).toHaveBeenCalledWith('success')
  })

  it('should set error when operation fails', async () => {
    const { result } = renderHook(() => useAsyncOperation())
    const error = new Error('Test error')
    const asyncFn = vi.fn(() => Promise.reject(error))

    await act(async () => {
      try {
        await result.current.execute(asyncFn)
      } catch (e) {
        // Expected to throw
      }
    })

    expect(result.current.error).toBe('Test error')
    expect(result.current.loading).toBe(false)
  })

  it('should call onError callback when operation fails', async () => {
    const { result } = renderHook(() => useAsyncOperation())
    const error = new Error('Test error')
    const asyncFn = vi.fn(() => Promise.reject(error))
    const onError = vi.fn()

    await act(async () => {
      try {
        await result.current.execute(asyncFn, null, onError)
      } catch (e) {
        // Expected to throw
      }
    })

    expect(onError).toHaveBeenCalledWith(error)
  })

  it('should reset error when resetError is called', async () => {
    const { result } = renderHook(() => useAsyncOperation())
    const error = new Error('Test error')
    const asyncFn = vi.fn(() => Promise.reject(error))

    await act(async () => {
      try {
        await result.current.execute(asyncFn)
      } catch (e) {
        // Expected to throw
      }
    })

    expect(result.current.error).toBe('Test error')

    act(() => {
      result.current.resetError()
    })

    expect(result.current.error).toBeNull()
  })

  it('should clear error before starting new operation', async () => {
    const { result } = renderHook(() => useAsyncOperation())
    const error = new Error('First error')
    const firstAsyncFn = vi.fn(() => Promise.reject(error))

    await act(async () => {
      try {
        await result.current.execute(firstAsyncFn)
      } catch (e) {
        // Expected to throw
      }
    })

    expect(result.current.error).toBe('First error')

    const secondAsyncFn = vi.fn(() => Promise.resolve('success'))

    await act(async () => {
      await result.current.execute(secondAsyncFn)
    })

    expect(result.current.error).toBeNull()
  })

  it('should return result from async function', async () => {
    const { result } = renderHook(() => useAsyncOperation())
    const asyncFn = vi.fn(() => Promise.resolve('test result'))

    const returnedValue = await act(async () => {
      return await result.current.execute(asyncFn)
    })

    expect(returnedValue).toBe('test result')
  })

  it('should handle error without message', async () => {
    const { result } = renderHook(() => useAsyncOperation())
    const error = new Error()
    const asyncFn = vi.fn(() => Promise.reject(error))

    await act(async () => {
      try {
        await result.current.execute(asyncFn)
      } catch (e) {
        // Expected to throw
      }
    })

    expect(result.current.error).toBe('An error occurred')
  })
})

