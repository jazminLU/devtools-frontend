import { describe, it, expect } from 'vitest'
import { parseCosts, parseItems } from './parsers'

describe('parsers utilities', () => {
  describe('parseCosts', () => {
    it('should parse JSON format', () => {
      const input = '{"apple": 1.50, "banana": 0.75}'
      const result = parseCosts(input)
      expect(result).toEqual({ apple: 1.50, banana: 0.75 })
    })

    it('should parse key:value format', () => {
      const input = 'apple: 1.50\nbanana: 0.75'
      const result = parseCosts(input)
      expect(result).toEqual({ apple: 1.50, banana: 0.75 })
    })

    it('should return empty object for empty input', () => {
      expect(parseCosts('')).toEqual({})
      expect(parseCosts('   ')).toEqual({})
      expect(parseCosts(null)).toEqual({})
    })

    it('should handle mixed formats', () => {
      const input = 'apple: 1.50\norange: 2.00'
      const result = parseCosts(input)
      expect(result).toEqual({ apple: 1.50, orange: 2.00 })
    })

    it('should ignore invalid lines', () => {
      const input = 'apple: 1.50\ninvalid line\nbanana: 0.75'
      const result = parseCosts(input)
      expect(result).toEqual({ apple: 1.50, banana: 0.75 })
    })
  })

  describe('parseItems', () => {
    it('should parse comma-separated items', () => {
      const input = 'apple, banana, orange'
      const result = parseItems(input)
      expect(result).toEqual(['apple', 'banana', 'orange'])
    })

    it('should parse newline-separated items', () => {
      const input = 'apple\nbanana\norange'
      const result = parseItems(input)
      expect(result).toEqual(['apple', 'banana', 'orange'])
    })

    it('should trim whitespace', () => {
      const input = '  apple  ,  banana  ,  orange  '
      const result = parseItems(input)
      expect(result).toEqual(['apple', 'banana', 'orange'])
    })

    it('should return empty array for empty input', () => {
      expect(parseItems('')).toEqual([])
      expect(parseItems('   ')).toEqual([])
      expect(parseItems(null)).toEqual([])
    })

    it('should filter out empty items', () => {
      const input = 'apple, , banana, , orange'
      const result = parseItems(input)
      expect(result).toEqual(['apple', 'banana', 'orange'])
    })
  })
})

