import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('applies success variant classes', () => {
    render(<Badge variant="success">Success</Badge>)
    expect(screen.getByText('Success')).toHaveClass('bg-green-100', 'text-green-700')
  })

  it('applies danger variant classes', () => {
    render(<Badge variant="danger">Danger</Badge>)
    expect(screen.getByText('Danger')).toHaveClass('bg-red-100', 'text-red-700')
  })

  it('applies warning variant classes', () => {
    render(<Badge variant="warning">Warning</Badge>)
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100')
  })

  it('applies small size classes', () => {
    render(<Badge size="sm">Small</Badge>)
    expect(screen.getByText('Small')).toHaveClass('text-xs')
  })

  it('applies custom classNames.root', () => {
    render(<Badge classNames={{ root: 'custom-badge' }}>Custom</Badge>)
    expect(screen.getByText('Custom')).toHaveClass('custom-badge')
  })
})
