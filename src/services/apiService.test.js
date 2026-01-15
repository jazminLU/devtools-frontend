import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ApiService, createApiService } from './apiService'

describe('ApiService', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('constructor', () => {
    it('should create instance with baseUrl', () => {
      const service = new ApiService('http://api.test')
      expect(service.baseUrl).toBe('http://api.test')
    })
  })

  describe('request', () => {
    it('should make successful GET request', async () => {
      const mockData = { word: 'test', definition: 'A test' }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const service = new ApiService('http://api.test')
      const result = await service.request('/dictionary/test')

      expect(global.fetch).toHaveBeenCalledWith(
        'http://api.test/dictionary/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )
      expect(result).toEqual(mockData)
    })

    it('should make successful POST request with body', async () => {
      const mockData = { message: 'Word added' }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const service = new ApiService('http://api.test')
      const result = await service.request('/dictionary/add', {
        method: 'POST',
        body: JSON.stringify({ word: 'test', definition: 'A test' }),
      })

      expect(global.fetch).toHaveBeenCalledWith(
        'http://api.test/dictionary/add',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ word: 'test', definition: 'A test' }),
        })
      )
      expect(result).toEqual(mockData)
    })

    it('should throw error on HTTP error response', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ detail: 'Not found' }),
      })

      const service = new ApiService('http://api.test')
      await expect(service.request('/dictionary/test')).rejects.toThrow('Not found')
    })

    it('should throw network error on fetch failure', async () => {
      global.fetch.mockRejectedValueOnce(new TypeError('Network error'))

      const service = new ApiService('http://api.test')
      await expect(service.request('/dictionary/test')).rejects.toThrow()
    })
  })

  describe('dictionary methods', () => {
    it('should add word', async () => {
      const mockData = { message: 'Word added' }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const service = new ApiService('http://api.test')
      const result = await service.dictionary.add('test', 'A test')

      expect(global.fetch).toHaveBeenCalledWith(
        'http://api.test/dictionary/add',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ word: 'test', definition: 'A test' }),
        })
      )
      expect(result).toEqual(mockData)
    })

    it('should get word', async () => {
      const mockData = { word: 'test', definition: 'A test' }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const service = new ApiService('http://api.test')
      const result = await service.dictionary.get('test')

      expect(global.fetch).toHaveBeenCalledWith(
        'http://api.test/dictionary/test',
        expect.objectContaining({
          method: 'GET',
        })
      )
      expect(result).toEqual(mockData)
    })
  })

  describe('createApiService', () => {
    it('should create ApiService instance', () => {
      const service = createApiService('http://api.test')
      expect(service).toBeInstanceOf(ApiService)
      expect(service.baseUrl).toBe('http://api.test')
    })
  })
})

