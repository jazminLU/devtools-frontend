import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ShoppingForm from './ShoppingForm'

describe('ShoppingForm', () => {
  const defaultProps = {
    costs: '',
    items: '',
    tax: '0.1',
    onCostsChange: vi.fn(),
    onItemsChange: vi.fn(),
    onTaxChange: vi.fn(),
    onSubmit: vi.fn(),
    loading: false,
  }

  it('should render form with all inputs', () => {
    render(<ShoppingForm {...defaultProps} />)

    expect(screen.getByText('Shopping Cost Calculator')).toBeInTheDocument()
    expect(screen.getByLabelText(/Item Costs/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Items to Calculate/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Tax Rate/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Calculate Total/i })).toBeInTheDocument()
  })

  it('should display values correctly', () => {
    render(
      <ShoppingForm
        {...defaultProps}
        costs="apple: 1.50"
        items="apple, banana"
        tax="0.15"
      />
    )

    expect(screen.getByLabelText(/Item Costs/i)).toHaveValue('apple: 1.50')
    expect(screen.getByLabelText(/Items to Calculate/i)).toHaveValue('apple, banana')
    expect(screen.getByLabelText(/Tax Rate/i)).toHaveValue(0.15)
  })

  it('should call onChange handlers', async () => {
    const user = userEvent.setup()
    const onCostsChange = vi.fn()
    const onItemsChange = vi.fn()
    const onTaxChange = vi.fn()

    render(
      <ShoppingForm
        {...defaultProps}
        onCostsChange={onCostsChange}
        onItemsChange={onItemsChange}
        onTaxChange={onTaxChange}
      />
    )

    await user.type(screen.getByLabelText(/Item Costs/i), 'test')
    expect(onCostsChange).toHaveBeenCalled()

    await user.type(screen.getByLabelText(/Items to Calculate/i), 'test')
    expect(onItemsChange).toHaveBeenCalled()

    await user.type(screen.getByLabelText(/Tax Rate/i), '0.2')
    expect(onTaxChange).toHaveBeenCalled()
  })

  it('should call onSubmit when form is submitted', () => {
    const onSubmit = vi.fn((e) => e.preventDefault())

    render(<ShoppingForm {...defaultProps} onSubmit={onSubmit} />)

    const form = screen.getByRole('button', { name: /Calculate Total/i }).closest('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalled()
  })

  it('should show loading state', () => {
    render(<ShoppingForm {...defaultProps} loading={true} />)

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByText('Calculating...')).toBeInTheDocument()
  })

  it('should show format hint', () => {
    render(<ShoppingForm {...defaultProps} />)

    expect(screen.getByText(/Format: One item per line/i)).toBeInTheDocument()
  })
})

