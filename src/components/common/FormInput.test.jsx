import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormInput from './FormInput'

describe('FormInput', () => {
  it('should render input with label', () => {
    render(
      <FormInput
        id="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    )

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    expect(screen.getByLabelText('Test Label')).toHaveAttribute('id', 'test-input')
  })

  it('should display value', () => {
    render(
      <FormInput
        id="test-input"
        label="Test Label"
        value="test value"
        onChange={() => {}}
      />
    )

    expect(screen.getByLabelText('Test Label')).toHaveValue('test value')
  })

  it('should call onChange when input changes', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <FormInput
        id="test-input"
        label="Test Label"
        value=""
        onChange={handleChange}
      />
    )

    const input = screen.getByLabelText('Test Label')
    await user.type(input, 'test')

    expect(handleChange).toHaveBeenCalled()
  })

  it('should support different input types', () => {
    render(
      <FormInput
        id="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
        type="number"
      />
    )

    expect(screen.getByLabelText('Test Label')).toHaveAttribute('type', 'number')
  })

  it('should support required attribute', () => {
    render(
      <FormInput
        id="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
        required
      />
    )

    expect(screen.getByLabelText('Test Label')).toBeRequired()
  })
})

