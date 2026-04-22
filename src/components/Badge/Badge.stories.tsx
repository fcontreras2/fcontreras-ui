import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Default', variant: 'default' } }
export const Success: Story = { args: { children: 'Active', variant: 'success' } }
export const Warning: Story = { args: { children: 'Pending', variant: 'warning' } }
export const Danger: Story = { args: { children: 'Error', variant: 'danger' } }
export const Info: Story = { args: { children: 'Info', variant: 'info' } }
export const Small: Story = { args: { children: 'Small', size: 'sm' } }
