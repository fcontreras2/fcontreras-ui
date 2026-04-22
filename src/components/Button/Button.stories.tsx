import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { children: 'Button', variant: 'primary' } }
export const Secondary: Story = { args: { children: 'Button', variant: 'secondary' } }
export const Danger: Story = { args: { children: 'Button', variant: 'danger' } }
export const Ghost: Story = { args: { children: 'Button', variant: 'ghost' } }
export const Outline: Story = { args: { children: 'Button', variant: 'outline' } }
export const Loading: Story = { args: { children: 'Guardando...', loading: true } }
export const Small: Story = { args: { children: 'Small', size: 'sm' } }
export const Large: Story = { args: { children: 'Large', size: 'lg' } }
export const FullWidth: Story = {
  args: { children: 'Full Width', fullWidth: true },
  parameters: { layout: 'padded' },
}
export const Disabled: Story = { args: { children: 'Disabled', disabled: true } }
