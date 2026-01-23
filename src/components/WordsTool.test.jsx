import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import WordsTool from './WordsTool'
import { useTool } from '../hooks/useTool'

vi.mock('../hooks/useTool')

vi.mock('../utils/parsers', () => ({
  parseItems: vi.fn((input) => {
    if (!input) return []
    return input.split(',').map(item => item.trim()).filter(Boolean)
  }),
}))

describe('WordsTool', () => {
  const apiUrl = 'http://localhost:8000'

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useTool).mockReturnValue({
      apiService: {
        words: {
          concatenate: vi.fn(),
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

  it('should render WordConcatForm component', () => {
    render(<WordsTool apiUrl={apiUrl} />)

    expect(screen.getByText('Word Concatenation Tool')).toBeInTheDocument()
  })

  it('should render ErrorCard when error exists', () => {
    vi.mocked(useTool).mockReturnValueOnce({
      apiService: { words: { concatenate: vi.fn() } },
      loading: false,
      error: 'Concatenation error',
      execute: vi.fn(),
      resetError: vi.fn(),
      result: null,
      setResult: vi.fn(),
    })

    render(<WordsTool apiUrl={apiUrl} />)

    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Concatenation error')).toBeInTheDocument()
  })

  it('should render WordConcatResult when result exists', () => {
    vi.mocked(useTool).mockReturnValueOnce({
      apiService: { words: { concatenate: vi.fn() } },
      loading: false,
      error: null,
      execute: vi.fn(),
      resetError: vi.fn(),
      result: {
        words: ['hello', 'world'],
        result: 'ho',
      },
      setResult: vi.fn(),
    })

    render(<WordsTool apiUrl={apiUrl} />)

    expect(screen.getByText('Result')).toBeInTheDocument()
    expect(screen.getByText('ho')).toBeInTheDocument()
  })
})

