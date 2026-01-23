import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WordForm from './WordForm'

describe('WordForm', () => {
  const defaultProps = {
    word: '',
    definition: '',
    onWordChange: vi.fn(),
    onDefinitionChange: vi.fn(),
    onSubmit: vi.fn(),
    loading: false,
  }

  it('should render form with inputs', () => {
    render(<WordForm {...defaultProps} />)

    expect(screen.getAllByText('Add Word').length).toBeGreaterThan(0)
    expect(screen.getByLabelText('Word')).toBeInTheDocument()
    expect(screen.getByLabelText('Definition')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Add Word/i })).toBeInTheDocument()
  })

  it('should display word value', () => {
    render(<WordForm {...defaultProps} word="hello" />)

    expect(screen.getByLabelText('Word')).toHaveValue('hello')
  })

  it('should display definition value', () => {
    render(<WordForm {...defaultProps} definition="a greeting" />)

    expect(screen.getByLabelText('Definition')).toHaveValue('a greeting')
  })

  it('should call onWordChange when word input changes', async () => {
    const user = userEvent.setup()
    const onWordChange = vi.fn()

    render(<WordForm {...defaultProps} onWordChange={onWordChange} />)

    const wordInput = screen.getByLabelText('Word')
    await user.type(wordInput, 'test')

    expect(onWordChange).toHaveBeenCalled()
  })

  it('should call onDefinitionChange when definition input changes', async () => {
    const user = userEvent.setup()
    const onDefinitionChange = vi.fn()

    render(<WordForm {...defaultProps} onDefinitionChange={onDefinitionChange} />)

    const definitionInput = screen.getByLabelText('Definition')
    await user.type(definitionInput, 'test definition')

    expect(onDefinitionChange).toHaveBeenCalled()
  })

  it('should call onSubmit when form is submitted', () => {
    const onSubmit = vi.fn((e) => e.preventDefault())

    render(<WordForm {...defaultProps} onSubmit={onSubmit} />)

    const form = screen.getByRole('button', { name: /Add Word/i }).closest('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalled()
  })

  it('should show loading state', () => {
    render(<WordForm {...defaultProps} loading={true} />)

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByText('Adding...')).toBeInTheDocument()
  })
})

