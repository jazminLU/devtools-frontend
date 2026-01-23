import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WordConcatForm from './WordConcatForm'

describe('WordConcatForm', () => {
  const defaultProps = {
    words: '',
    onWordsChange: vi.fn(),
    onSubmit: vi.fn(),
    loading: false,
  }

  it('should render form with textarea', () => {
    render(<WordConcatForm {...defaultProps} />)

    expect(screen.getByText('Word Concatenation Tool')).toBeInTheDocument()
    expect(screen.getByLabelText(/Words/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Concatenate/i })).toBeInTheDocument()
  })

  it('should display words value', () => {
    render(<WordConcatForm {...defaultProps} words="hello, world" />)

    expect(screen.getByLabelText(/Words/i)).toHaveValue('hello, world')
  })

  it('should call onWordsChange when textarea changes', async () => {
    const user = userEvent.setup()
    const onWordsChange = vi.fn()

    render(<WordConcatForm {...defaultProps} onWordsChange={onWordsChange} />)

    const textarea = screen.getByLabelText(/Words/i)
    await user.type(textarea, 'test')

    expect(onWordsChange).toHaveBeenCalled()
  })

  it('should call onSubmit when form is submitted', () => {
    const onSubmit = vi.fn((e) => e.preventDefault())

    render(<WordConcatForm {...defaultProps} onSubmit={onSubmit} />)

    const form = screen.getByRole('button', { name: /Concatenate/i }).closest('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalled()
  })

  it('should show loading state', () => {
    render(<WordConcatForm {...defaultProps} loading={true} />)

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })

  it('should display example in description', () => {
    render(<WordConcatForm {...defaultProps} />)

    expect(screen.getByText(/hello.*world.*ho/i)).toBeInTheDocument()
  })
})

