import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('renders a text input', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('applies invalid border styles when isInvalid is true', () => {
    render(<Input isInvalid />)
    expect(screen.getByRole('textbox')).toHaveClass('border-danger-500')
  })

  it('applies default border styles when isInvalid is false', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toHaveClass('border-neutral-300')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders left addon', () => {
    render(<Input leftAddon={<span data-testid="left-addon">@</span>} />)
    expect(screen.getByTestId('left-addon')).toBeInTheDocument()
  })

  it('renders right addon', () => {
    render(<Input rightAddon={<span data-testid="right-addon">$</span>} />)
    expect(screen.getByTestId('right-addon')).toBeInTheDocument()
  })
})
