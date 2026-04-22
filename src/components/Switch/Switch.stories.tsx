import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = { args: { label: 'Enable notifications' } }
export const Checked: Story = { args: { label: 'Enabled by default', defaultChecked: true } }
export const WithHelperText: Story = {
  args: { label: 'Dark mode', helperText: 'Switch between light and dark theme' },
}
export const WithError: Story = {
  args: { label: 'Required setting', error: 'This setting must be enabled' },
}
export const Small: Story = { args: { label: 'Small switch', size: 'sm' } }
export const Large: Story = { args: { label: 'Large switch', size: 'lg' } }
export const Disabled: Story = { args: { label: 'Disabled', disabled: true } }
export const DisabledChecked: Story = {
  args: { label: 'Disabled and on', disabled: true, defaultChecked: true },
}
