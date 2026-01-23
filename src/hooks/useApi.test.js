import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useApi } from './useApi'

describe('useApi', () => {
  const baseUrl = 'http://localhost:8000'
  let fetchSpy

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, 'fetch')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('get', () => {
    it('should make GET request to correct endpoint', async () => {
      const mockResponse = { data: 'test' }
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const api = useApi(baseUrl)
      const result = await api.get('/test')

      expect(fetchSpy).toHaveBeenCalledWith(
        'http://localhost:8000/test',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      expect(result).toEqual(mockResponse)
    })

    it('should throw error when response is not ok', async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ detail: 'Not found' }),
      })

      const api = useApi(baseUrl)

      await expect(api.get('/test')).rejects.toThrow('Not found')
    })

    it('should throw error with status code when detail is missing', async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({}),
      })

      const api = useApi(baseUrl)

      await expect(api.get('/test')).rejects.toThrow('HTTP 500')
    })

    it('should handle invalid JSON response', async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => {
          throw new Error('Invalid JSON')
        },
      })

      const api = useApi(baseUrl)

      await expect(api.get('/test')).rejects.toThrow('Request failed')
    })
  })

  describe('post', () => {
    it('should make POST request with correct data', async () => {
      const mockResponse = { success: true }
      const requestData = { key: 'value' }
      
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const api = useApi(baseUrl)
      const result = await api.post('/test', requestData)

      expect(fetchSpy).toHaveBeenCalledWith(
        'http://localhost:8000/test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      )
      expect(result).toEqual(mockResponse)
    })

    it('should throw error when response is not ok', async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ detail: 'Bad request' }),
      })

      const api = useApi(baseUrl)

      await expect(api.post('/test', {})).rejects.toThrow('Bad request')
    })

    it('should handle invalid JSON response', async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => {
          throw new Error('Invalid JSON')
        },
      })

      const api = useApi(baseUrl)

      await expect(api.post('/test', {})).rejects.toThrow('Request failed')
    })
  })
})

