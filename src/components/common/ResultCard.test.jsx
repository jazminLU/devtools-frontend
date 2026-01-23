import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ResultCard from './ResultCard'

describe('ResultCard', () => {
  it('should not render when result is null', () => {
    const { container } = render(<ResultCard result={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render message when result has message', () => {
    render(<ResultCard result={{ type: 'success', message: 'Test message' }} />)
    
    expect(screen.getByText('Result')).toBeInTheDocument()
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('should render word and definition when provided', () => {
    render(
      <ResultCard
        result={{
          type: 'success',
          word: 'hello',
          definition: 'a greeting',
        }}
      />
    )

    expect(screen.getByText('Result')).toBeInTheDocument()
    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(screen.getByText('a greeting')).toBeInTheDocument()
  })

  it('should render only word when definition is missing', () => {
    render(
      <ResultCard
        result={{
          type: 'success',
          word: 'hello',
        }}
      />
    )

    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(screen.queryByText(/Definition/)).not.toBeInTheDocument()
  })

  it('should render only definition when word is missing', () => {
    render(
      <ResultCard
        result={{
          type: 'success',
          definition: 'a greeting',
        }}
      />
    )

    expect(screen.getByText('a greeting')).toBeInTheDocument()
    expect(screen.queryByText(/Word/)).not.toBeInTheDocument()
  })

  it('should have green border when type is success', () => {
    const { container } = render(
      <ResultCard result={{ type: 'success', message: 'Test' }} />
    )

    const card = container.firstChild
    expect(card).toHaveClass('border-l-4', 'border-green-500')
  })

  it('should not have green border when type is not success', () => {
    const { container } = render(
      <ResultCard result={{ type: 'info', message: 'Test' }} />
    )

    const card = container.firstChild
    expect(card).not.toHaveClass('border-green-500')
  })
})

