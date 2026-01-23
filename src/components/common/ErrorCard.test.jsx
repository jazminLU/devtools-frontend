import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorCard from './ErrorCard'

describe('ErrorCard', () => {
  it('should render error message when error is provided', () => {
    render(<ErrorCard error="Test error message" />)
    
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  it('should not render when error is null', () => {
    const { container } = render(<ErrorCard error={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('should not render when error is undefined', () => {
    const { container } = render(<ErrorCard error={undefined} />)
    expect(container.firstChild).toBeNull()
  })

  it('should not render when error is empty string', () => {
    const { container } = render(<ErrorCard error="" />)
    expect(container.firstChild).toBeNull()
  })

  it('should have correct styling classes', () => {
    const { container } = render(<ErrorCard error="Test error" />)
    const card = container.firstChild
    
    expect(card).toHaveClass('bg-red-50', 'dark:bg-red-900/20', 'border-l-4', 'border-red-500')
  })
})

