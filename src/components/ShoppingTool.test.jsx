import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ShoppingTool from './ShoppingTool'
import { useTool } from '../hooks/useTool'

vi.mock('../hooks/useTool')

vi.mock('../utils/parsers', () => ({
  parseCosts: vi.fn((input) => {
    if (!input) return {}
    return { apple: 1.5, banana: 0.75 }
  }),
  parseItems: vi.fn((input) => {
    if (!input) return []
    return input.split(',').map(item => item.trim()).filter(Boolean)
  }),
}))

vi.mock('../utils/validation', () => ({
  isValidNumber: vi.fn((val) => !isNaN(parseFloat(val))),
  isPositive: vi.fn((val) => val > 0),
}))

describe('ShoppingTool', () => {
  const apiUrl = 'http://localhost:8000'

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useTool).mockReturnValue({
      apiService: {
        shopping: {
          calculateTotal: vi.fn(),
        },
      },
      loading: false,
      error: null,
      execute: vi.fn((fn, onSuccess) => {
        const result = fn()
        if (result && typeof result.then === 'function') {
          return result.then(onSuccess)
        }
        if (onSuccess) onSuccess(result)
        return result
      }),
      resetError: vi.fn(),
      result: null,
      setResult: vi.fn(),
    })
  })

  it('should render ShoppingForm component', () => {
    render(<ShoppingTool apiUrl={apiUrl} />)

    expect(screen.getByText('Shopping Cost Calculator')).toBeInTheDocument()
  })

  it('should render ErrorCard when error exists', () => {
    vi.mocked(useTool).mockReturnValueOnce({
      apiService: { shopping: { calculateTotal: vi.fn() } },
      loading: false,
      error: 'Calculation error',
      execute: vi.fn(),
      resetError: vi.fn(),
      result: null,
      setResult: vi.fn(),
    })

    render(<ShoppingTool apiUrl={apiUrl} />)

    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Calculation error')).toBeInTheDocument()
  })

  it('should render ShoppingResult when result exists', () => {
    vi.mocked(useTool).mockReturnValueOnce({
      apiService: { shopping: { calculateTotal: vi.fn() } },
      loading: false,
      error: null,
      execute: vi.fn(),
      resetError: vi.fn(),
      result: {
        subtotal: 10.0,
        tax_amount: 1.0,
        total: 11.0,
        items_found: ['apple'],
        items_not_found: [],
      },
      setResult: vi.fn(),
    })

    render(<ShoppingTool apiUrl={apiUrl} />)

    expect(screen.getByText('Calculation Result')).toBeInTheDocument()
  })
})

