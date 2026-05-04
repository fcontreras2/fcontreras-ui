import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when loading is true', () => {
    render(<Button loading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('shows spinner when loading', () => {
    render(<Button loading>Click me</Button>)
    expect(document.querySelector('svg[role="status"]')).toBeInTheDocument()
  })

  it('renders full width when fullWidth is true', () => {
    render(<Button fullWidth>Click</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('applies custom classNames.root', () => {
    render(<Button classNames={{ root: 'custom-root' }}>Click</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-root')
  })

  it('renders leftIcon', () => {
    render(<Button leftIcon={<span data-testid="icon" />}>Click</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('does not render leftIcon when loading', () => {
    render(<Button loading leftIcon={<span data-testid="icon" />}>Click</Button>)
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
  })
})
