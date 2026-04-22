import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { placeholder: 'Enter text...' } }
export const WithLabel: Story = {
  args: { label: 'Email', placeholder: 'you@example.com', type: 'email' },
}
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
}
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: 'Invalid email address',
  },
}
export const Disabled: Story = {
  args: { label: 'Disabled', placeholder: 'Cannot edit', disabled: true },
}
export const Small: Story = {
  args: { label: 'Small', size: 'sm', placeholder: 'Small input' },
}
export const Large: Story = {
  args: { label: 'Large', size: 'lg', placeholder: 'Large input' },
}
