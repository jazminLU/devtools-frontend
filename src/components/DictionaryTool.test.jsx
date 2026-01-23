import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DictionaryTool from './DictionaryTool'
import { useTool } from '../hooks/useTool'

vi.mock('../hooks/useTool')
vi.mock('../utils/validation', () => ({
  isNotEmpty: vi.fn((str) => str && str.trim().length > 0),
}))

describe('DictionaryTool', () => {
  const apiUrl = 'http://localhost:8000'
  const mockExecute = vi.fn()
  const mockSetResult = vi.fn()
  const mockResetError = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockExecute.mockImplementation(async (fn, onSuccess) => {
      const result = await fn()
      if (onSuccess) onSuccess(result)
      return result
    })
    
    vi.mocked(useTool).mockReturnValue({
      apiService: {
        dictionary: {
          add: vi.fn(() => Promise.resolve({ message: 'Word added' })),
          get: vi.fn(() => Promise.resolve({ word: 'hello', definition: 'a greeting' })),
        },
      },
      loading: false,
      error: null,
      execute: mockExecute,
      resetError: mockResetError,
      result: null,
      setResult: mockSetResult,
    })
  })

  it('should render WordForm and WordSearch components', () => {
    render(<DictionaryTool apiUrl={apiUrl} />)

    expect(screen.getAllByText('Add Word').length).toBeGreaterThan(0)
    expect(screen.getByText('Search Word')).toBeInTheDocument()
  })

  it('should render ErrorCard when error exists', () => {
    vi.mocked(useTool).mockReturnValueOnce({
      apiService: { dictionary: { add: vi.fn(), get: vi.fn() } },
      loading: false,
      error: 'Test error',
      execute: vi.fn(),
      resetError: vi.fn(),
      result: null,
      setResult: vi.fn(),
    })

    render(<DictionaryTool apiUrl={apiUrl} />)

    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('should render ResultCard when result exists', () => {
    vi.mocked(useTool).mockReturnValueOnce({
      apiService: { dictionary: { add: vi.fn(), get: vi.fn() } },
      loading: false,
      error: null,
      execute: vi.fn(),
      resetError: vi.fn(),
      result: { type: 'success', message: 'Word added' },
      setResult: vi.fn(),
    })

    render(<DictionaryTool apiUrl={apiUrl} />)

    expect(screen.getByText('Result')).toBeInTheDocument()
    expect(screen.getByText('Word added')).toBeInTheDocument()
  })

  it('should handle add word form submission', async () => {
    const user = userEvent.setup()
    render(<DictionaryTool apiUrl={apiUrl} />)

    const wordInput = screen.getByLabelText('Word')
    const definitionInput = screen.getByLabelText('Definition')
    
    await user.type(wordInput, 'hello')
    await user.type(definitionInput, 'a greeting')
    
    const addForm = wordInput.closest('form')
    const submitButton = screen.getAllByRole('button', { name: /Add Word/i })[0]
    
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalled()
    })
  })

  it('should handle search word form submission', async () => {
    const user = userEvent.setup()
    render(<DictionaryTool apiUrl={apiUrl} />)

    const searchInput = screen.getByLabelText('Word to Search')
    await user.type(searchInput, 'hello')
    
    const searchButton = screen.getByRole('button', { name: /Search/i })
    await user.click(searchButton)

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalled()
    })
  })
})
