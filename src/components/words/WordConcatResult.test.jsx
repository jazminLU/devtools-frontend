import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WordConcatResult from './WordConcatResult'

describe('WordConcatResult', () => {
  it('should not render when result is null', () => {
    const { container } = render(<WordConcatResult result={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render result with words and concatenated result', () => {
    const result = {
      words: ['hello', 'world'],
      result: 'ho',
    }

    render(<WordConcatResult result={result} />)

    expect(screen.getByText('Result')).toBeInTheDocument()
    expect(screen.getByText(/hello, world/i)).toBeInTheDocument()
    expect(screen.getByText('ho')).toBeInTheDocument()
  })

  it('should show note when result is empty', () => {
    const result = {
      words: ['hi'],
      result: '',
    }

    render(<WordConcatResult result={result} />)

    expect(screen.getByText(/Some words were too short/i)).toBeInTheDocument()
  })

  it('should not show note when result is not empty', () => {
    const result = {
      words: ['hello', 'world'],
      result: 'ho',
    }

    render(<WordConcatResult result={result} />)

    expect(screen.queryByText(/Some words were too short/i)).not.toBeInTheDocument()
  })

  it('should format words list correctly', () => {
    const result = {
      words: ['hello', 'world', 'test'],
      result: 'hos',
    }

    render(<WordConcatResult result={result} />)

    expect(screen.getByText(/hello, world, test/i)).toBeInTheDocument()
  })
})

