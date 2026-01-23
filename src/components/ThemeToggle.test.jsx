import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('should render light mode button when isDark is true', () => {
    render(<ThemeToggle isDark={true} onToggle={vi.fn()} />)

    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument()
  })

  it('should render dark mode button when isDark is false', () => {
    render(<ThemeToggle isDark={false} onToggle={vi.fn()} />)

    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument()
  })

  it('should call onToggle when button is clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()

    render(<ThemeToggle isDark={false} onToggle={onToggle} />)

    await user.click(screen.getByLabelText('Toggle dark mode'))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('should have correct aria-label', () => {
    render(<ThemeToggle isDark={false} onToggle={vi.fn()} />)

    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument()
  })
})

