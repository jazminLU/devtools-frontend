import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormTextarea from './FormTextarea'

describe('FormTextarea', () => {
  it('should render with label and textarea', () => {
    render(
      <FormTextarea
        id="test"
        label="Test Label"
        value=""
        onChange={vi.fn()}
      />
    )

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should display value correctly', () => {
    render(
      <FormTextarea
        id="test"
        label="Test Label"
        value="Test value"
        onChange={vi.fn()}
      />
    )

    expect(screen.getByRole('textbox')).toHaveValue('Test value')
  })

  it('should call onChange when value changes', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <FormTextarea
        id="test"
        label="Test Label"
        value=""
        onChange={handleChange}
      />
    )

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'New value')

    expect(handleChange).toHaveBeenCalled()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <FormTextarea
        id="test"
        label="Test Label"
        value=""
        onChange={vi.fn()}
        className="custom-class"
      />
    )

    const textarea = container.querySelector('textarea')
    expect(textarea).toHaveClass('custom-class')
  })

  it('should set required attribute when required is true', () => {
    render(
      <FormTextarea
        id="test"
        label="Test Label"
        value=""
        onChange={vi.fn()}
        required
      />
    )

    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('should not set required attribute when required is false', () => {
    render(
      <FormTextarea
        id="test"
        label="Test Label"
        value=""
        onChange={vi.fn()}
        required={false}
      />
    )

    expect(screen.getByRole('textbox')).not.toBeRequired()
  })

  it('should use default rows when not specified', () => {
    render(
      <FormTextarea
        id="test"
        label="Test Label"
        value=""
        onChange={vi.fn()}
      />
    )

    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '3')
  })

  it('should use custom rows when specified', () => {
    render(
      <FormTextarea
        id="test"
        label="Test Label"
        value=""
        onChange={vi.fn()}
        rows={5}
      />
    )

    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5')
  })

  it('should pass through additional props', () => {
    render(
      <FormTextarea
        id="test"
        label="Test Label"
        value=""
        onChange={vi.fn()}
        placeholder="Enter text"
      />
    )

    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter text')
  })
})

