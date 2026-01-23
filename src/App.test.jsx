import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

vi.mock('./hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({
    isDark: false,
    toggleTheme: vi.fn(),
  })),
}))

vi.mock('./components/DictionaryTool', () => ({
  default: () => <div>Dictionary Tool</div>,
}))

vi.mock('./components/ShoppingTool', () => ({
  default: () => <div>Shopping Tool</div>,
}))

vi.mock('./components/WordsTool', () => ({
  default: () => <div>Words Tool</div>,
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render header with title', () => {
    render(<App />)

    expect(screen.getByText('DevTools Playground v2')).toBeInTheDocument()
    expect(screen.getByText('A collection of developer utilities')).toBeInTheDocument()
  })

  it('should render footer with copyright', () => {
    render(<App />)

    expect(screen.getByText('Created by Jazmin Luna © 2026')).toBeInTheDocument()
  })

  it('should render tab navigation', () => {
    render(<App />)

    expect(screen.getByText('Dictionary')).toBeInTheDocument()
    expect(screen.getByText('Shopping Calculator')).toBeInTheDocument()
    expect(screen.getByText('Word Concatenation')).toBeInTheDocument()
  })

  it('should render DictionaryTool by default', () => {
    render(<App />)

    expect(screen.getByText('Dictionary Tool')).toBeInTheDocument()
  })

  it('should switch to ShoppingTool when shopping tab is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText('Shopping Calculator'))

    expect(screen.getByText('Shopping Tool')).toBeInTheDocument()
    expect(screen.queryByText('Dictionary Tool')).not.toBeInTheDocument()
  })

  it('should switch to WordsTool when words tab is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText('Word Concatenation'))

    expect(screen.getByText('Words Tool')).toBeInTheDocument()
    expect(screen.queryByText('Dictionary Tool')).not.toBeInTheDocument()
  })

  it('should render ThemeToggle', () => {
    render(<App />)

    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument()
  })
})

