import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from './Tooltip'
import { Button } from '../Button'
import { Badge } from '../Badge'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top','bottom','left','right'] },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: { content: 'This is a tooltip', placement: 'top' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
}

export const Placements: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 48 }}>
      {(['top','bottom','left','right'] as const).map(p => (
        <Tooltip key={p} content={`Placement: ${p}`} placement={p}>
          <Button variant="secondary" size="sm">{p}</Button>
        </Tooltip>
      ))}
    </div>
  ),
}

export const OnBadge: StoryObj = {
  render: () => (
    <Tooltip content="Active since January 2024" placement="top">
      <Badge variant="success">Active</Badge>
    </Tooltip>
  ),
}

export const WithDelay: Story = {
  args: { content: 'Appears after 600ms', placement: 'top', delayMs: 600 },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline" size="sm">Slow tooltip</Button>
    </Tooltip>
  ),
}
