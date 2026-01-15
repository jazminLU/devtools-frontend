/**
 * Parsing utilities for user input.
 * 
 * Implements Single Responsibility Principle - handles only parsing logic.
 */

/**
 * Parse costs from JSON or key:value format.
 * 
 * @param {string} input - Input string to parse
 * @returns {Object} Parsed costs object
 * @throws {Error} If parsing fails
 */
export function parseCosts(input) {
  if (!input || !input.trim()) {
    return {}
  }

  // Try JSON first
  try {
    const parsed = JSON.parse(input)
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed
    }
  } catch {
    // Fall through to key:value parsing
  }

  // Try key:value format
  const costsObj = {}
  const lines = input.split('\n').filter(line => line.trim())
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      const valueStr = line.substring(colonIndex + 1).trim()
      const value = parseFloat(valueStr)
      
      if (key && !isNaN(value)) {
        costsObj[key] = value
      }
    }
  })

  return costsObj
}

/**
 * Parse items from comma or newline separated string.
 * 
 * @param {string} input - Input string to parse
 * @returns {string[]} Array of item names
 */
export function parseItems(input) {
  if (!input || !input.trim()) {
    return []
  }

  return input
    .split(/[,\n]/)
    .map(item => item.trim())
    .filter(item => item.length > 0)
}

