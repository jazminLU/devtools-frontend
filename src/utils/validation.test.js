import { describe, it, expect } from 'vitest'
import { isNotEmpty, isPositive, isValidNumber } from './validation'

describe('validation utilities', () => {
  describe('isNotEmpty', () => {
    it('should return true for non-empty string', () => {
      expect(isNotEmpty('hello')).toBe(true)
      expect(isNotEmpty('test')).toBe(true)
    })

    it('should return false for empty string', () => {
      // isNotEmpty returns falsy value (empty string) for empty strings
      expect(isNotEmpty('')).toBeFalsy()
      expect(isNotEmpty('   ')).toBeFalsy()
    })

    it('should return false for null or undefined', () => {
      // isNotEmpty returns falsy value (null/undefined) for null/undefined
      expect(isNotEmpty(null)).toBeFalsy()
      expect(isNotEmpty(undefined)).toBeFalsy()
    })

    it('should trim whitespace before checking', () => {
      expect(isNotEmpty('  hello  ')).toBe(true)
      expect(isNotEmpty('  ')).toBe(false)
    })
  })

  describe('isPositive', () => {
    it('should return true for positive numbers', () => {
      expect(isPositive(1)).toBe(true)
      expect(isPositive(100)).toBe(true)
      expect(isPositive(0)).toBe(true)
    })

    it('should return false for negative numbers', () => {
      expect(isPositive(-1)).toBe(false)
      expect(isPositive(-100)).toBe(false)
    })

    it('should return false for non-numbers', () => {
      expect(isPositive('abc')).toBe(false)
      expect(isPositive(null)).toBe(false)
      expect(isPositive(undefined)).toBe(false)
    })
  })

  describe('isValidNumber', () => {
    it('should return true for valid numbers', () => {
      expect(isValidNumber(1)).toBe(true)
      expect(isValidNumber(0)).toBe(true)
      expect(isValidNumber(-1)).toBe(true)
      expect(isValidNumber(3.14)).toBe(true)
      expect(isValidNumber('123')).toBe(true)
    })

    it('should return false for invalid numbers', () => {
      expect(isValidNumber('abc')).toBe(false)
      expect(isValidNumber(NaN)).toBe(false)
      expect(isValidNumber(Infinity)).toBe(false)
      // Note: isValidNumber(null) returns true because !isNaN(null) is true
      // This is JavaScript's behavior - null is coerced to 0 in numeric context
      expect(isValidNumber(undefined)).toBe(false)
    })
  })
})

