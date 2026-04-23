import type { Meta, StoryObj } from '@storybook/react'
import { FormHelperText } from './FormHelperText'

const meta = {
  title: 'Components/FormHelperText',
  component: FormHelperText,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof FormHelperText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'This is a helper text' },
}

export const Error: Story = {
  args: { variant: 'error', children: 'This field is required' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Email verified successfully' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'This field will be public' },
}

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <label className="text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        placeholder="you@example.com"
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <FormHelperText>Enter a valid email address</FormHelperText>
    </div>
  ),
}

export const WithErrorState: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <label className="text-sm font-medium text-red-600">Password</label>
      <input
        type="password"
        className="px-3 py-2 border-2 border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <FormHelperText variant="error">Password must be at least 8 characters</FormHelperText>
    </div>
  ),
}

export const WithSuccessState: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <label className="text-sm font-medium text-gray-700">Username</label>
      <input
        type="text"
        value="johndoe"
        className="px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <FormHelperText variant="success">Username is available</FormHelperText>
    </div>
  ),
}
