import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SubmitButton from './SubmitButton'

describe('SubmitButton', () => {
  it('should render children when not loading', () => {
    render(
      <SubmitButton loading={false} loadingText="Loading...">
        Submit
      </SubmitButton>
    )

    expect(screen.getByText('Submit')).toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('should render loading text when loading', () => {
    render(
      <SubmitButton loading={true} loadingText="Loading...">
        Submit
      </SubmitButton>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
  })

  it('should be disabled when loading', () => {
    render(
      <SubmitButton loading={true} loadingText="Loading...">
        Submit
      </SubmitButton>
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should not be disabled when not loading', () => {
    render(
      <SubmitButton loading={false} loadingText="Loading...">
        Submit
      </SubmitButton>
    )

    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('should have correct type attribute', () => {
    render(
      <SubmitButton loading={false} loadingText="Loading...">
        Submit
      </SubmitButton>
    )

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('should call onClick when clicked and not loading', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <SubmitButton loading={false} loadingText="Loading..." onClick={handleClick}>
        Submit
      </SubmitButton>
    )

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick when loading', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <SubmitButton loading={true} loadingText="Loading..." onClick={handleClick}>
        Submit
      </SubmitButton>
    )

    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should have disabled styling when loading', () => {
    const { container } = render(
      <SubmitButton loading={true} loadingText="Loading...">
        Submit
      </SubmitButton>
    )

    const button = container.querySelector('button')
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
  })
})

