import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WordSearch from './WordSearch'

describe('WordSearch', () => {
  const defaultProps = {
    searchWord: '',
    onSearchWordChange: vi.fn(),
    onSubmit: vi.fn(),
    loading: false,
  }

  it('should render form with input', () => {
    render(<WordSearch {...defaultProps} />)

    expect(screen.getByText('Search Word')).toBeInTheDocument()
    expect(screen.getByLabelText('Word to Search')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument()
  })

  it('should display search word value', () => {
    render(<WordSearch {...defaultProps} searchWord="hello" />)

    expect(screen.getByLabelText('Word to Search')).toHaveValue('hello')
  })

  it('should call onSearchWordChange when input changes', async () => {
    const user = userEvent.setup()
    const onSearchWordChange = vi.fn()

    render(<WordSearch {...defaultProps} onSearchWordChange={onSearchWordChange} />)

    const input = screen.getByLabelText('Word to Search')
    await user.type(input, 'test')

    expect(onSearchWordChange).toHaveBeenCalled()
  })

  it('should call onSubmit when form is submitted', () => {
    const onSubmit = vi.fn((e) => e.preventDefault())

    render(<WordSearch {...defaultProps} onSubmit={onSubmit} />)

    const form = screen.getByRole('button', { name: /Search/i }).closest('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalled()
  })

  it('should show loading state', () => {
    render(<WordSearch {...defaultProps} loading={true} />)

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByText('Searching...')).toBeInTheDocument()
  })
})

