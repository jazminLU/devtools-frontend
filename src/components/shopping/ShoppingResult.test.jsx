import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ShoppingResult from './ShoppingResult'

describe('ShoppingResult', () => {
  it('should not render when result is null', () => {
    const { container } = render(<ShoppingResult result={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render calculation result', () => {
    const result = {
      subtotal: 10.0,
      tax_amount: 1.0,
      total: 11.0,
      items_found: ['apple', 'banana'],
      items_not_found: [],
    }

    render(<ShoppingResult result={result} />)

    expect(screen.getByText('Calculation Result')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByText('$1.00')).toBeInTheDocument()
    expect(screen.getByText('$11.00')).toBeInTheDocument()
  })

  it('should render items found', () => {
    const result = {
      subtotal: 10.0,
      tax_amount: 1.0,
      total: 11.0,
      items_found: ['apple', 'banana'],
      items_not_found: [],
    }

    render(<ShoppingResult result={result} />)

    expect(screen.getByText(/Items Found:/i)).toBeInTheDocument()
    expect(screen.getByText(/apple, banana/i)).toBeInTheDocument()
  })

  it('should render items not found', () => {
    const result = {
      subtotal: 10.0,
      tax_amount: 1.0,
      total: 11.0,
      items_found: ['apple'],
      items_not_found: ['orange'],
    }

    render(<ShoppingResult result={result} />)

    expect(screen.getByText(/Items Not Found/i)).toBeInTheDocument()
    expect(screen.getByText(/orange/i)).toBeInTheDocument()
  })

  it('should not render items found section when empty', () => {
    const result = {
      subtotal: 10.0,
      tax_amount: 1.0,
      total: 11.0,
      items_found: [],
      items_not_found: [],
    }

    render(<ShoppingResult result={result} />)

    expect(screen.queryByText(/Items Found:/i)).not.toBeInTheDocument()
  })

  it('should not render items not found section when empty', () => {
    const result = {
      subtotal: 10.0,
      tax_amount: 1.0,
      total: 11.0,
      items_found: ['apple'],
      items_not_found: [],
    }

    render(<ShoppingResult result={result} />)

    expect(screen.queryByText(/Items Not Found/i)).not.toBeInTheDocument()
  })

  it('should format currency correctly', () => {
    const result = {
      subtotal: 10.5,
      tax_amount: 1.05,
      total: 11.55,
      items_found: [],
      items_not_found: [],
    }

    render(<ShoppingResult result={result} />)

    expect(screen.getByText('$10.50')).toBeInTheDocument()
    expect(screen.getByText('$1.05')).toBeInTheDocument()
    expect(screen.getByText('$11.55')).toBeInTheDocument()
  })
})

