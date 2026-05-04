import { render, screen } from '@testing-library/react'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renders an svg element', () => {
    const { container } = render(<Icon name="check" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('sets data-icon attribute', () => {
    const { container } = render(<Icon name="check" />)
    expect(container.querySelector('[data-icon="check"]')).toBeInTheDocument()
  })

  it('sets data-variant attribute', () => {
    const { container } = render(<Icon name="check" variant="solid" />)
    expect(container.querySelector('[data-variant="solid"]')).toBeInTheDocument()
  })

  it('defaults to outline variant', () => {
    const { container } = render(<Icon name="heart" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('data-variant', 'outline')
    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
  })

  it('renders solid variant with fill', () => {
    const { container } = render(<Icon name="heart" variant="solid" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('fill', 'currentColor')
    expect(svg).toHaveAttribute('stroke', 'none')
  })

  it('applies correct size for xs', () => {
    const { container } = render(<Icon name="check" size="xs" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('width', '12')
    expect(svg).toHaveAttribute('height', '12')
  })

  it('applies correct size for sm', () => {
    const { container } = render(<Icon name="check" size="sm" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('width', '16')
    expect(svg).toHaveAttribute('height', '16')
  })

  it('applies correct size for md (default)', () => {
    const { container } = render(<Icon name="check" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('width', '20')
    expect(svg).toHaveAttribute('height', '20')
  })

  it('applies correct size for lg', () => {
    const { container } = render(<Icon name="check" size="lg" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('applies correct size for xl', () => {
    const { container } = render(<Icon name="check" size="xl" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('applies thin strokeWidth', () => {
    const { container } = render(<Icon name="check" weight="thin" />)
    expect(container.querySelector('svg')).toHaveAttribute('stroke-width', '1')
  })

  it('applies regular strokeWidth (default)', () => {
    const { container } = render(<Icon name="check" />)
    expect(container.querySelector('svg')).toHaveAttribute('stroke-width', '1.5')
  })

  it('applies bold strokeWidth', () => {
    const { container } = render(<Icon name="check" weight="bold" />)
    expect(container.querySelector('svg')).toHaveAttribute('stroke-width', '2.5')
  })

  it('does not apply strokeWidth in solid variant', () => {
    const { container } = render(<Icon name="check" variant="solid" weight="bold" />)
    expect(container.querySelector('svg')).not.toHaveAttribute('stroke-width')
  })

  it('applies custom className', () => {
    const { container } = render(<Icon name="check" className="text-primary-600" />)
    expect(container.querySelector('svg')).toHaveClass('text-primary-600')
  })

  it('applies classNames.root', () => {
    const { container } = render(<Icon name="check" classNames={{ root: 'custom-icon' }} />)
    expect(container.querySelector('svg')).toHaveClass('custom-icon')
  })

  it('has aria-hidden by default', () => {
    const { container } = render(<Icon name="check" />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders different icons correctly', () => {
    const { container: c1 } = render(<Icon name="check" />)
    const { container: c2 } = render(<Icon name="x" />)
    const path1 = c1.querySelector('path')!.getAttribute('d')
    const path2 = c2.querySelector('path')!.getAttribute('d')
    expect(path1).not.toBe(path2)
  })
})
