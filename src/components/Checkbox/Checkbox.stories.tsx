import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = { args: { label: 'Accept terms and conditions' } }
export const Checked: Story = { args: { label: 'Checked by default', defaultChecked: true } }
export const WithHelperText: Story = {
  args: { label: 'Subscribe to newsletter', helperText: 'You can unsubscribe at any time' },
}
export const WithError: Story = {
  args: { label: 'Accept terms and conditions', error: 'You must accept the terms' },
}
export const Small: Story = { args: { label: 'Small checkbox', size: 'sm' } }
export const Large: Story = { args: { label: 'Large checkbox', size: 'lg' } }
export const Disabled: Story = { args: { label: 'Disabled', disabled: true } }
export const DisabledChecked: Story = {
  args: { label: 'Disabled and checked', disabled: true, defaultChecked: true },
}
