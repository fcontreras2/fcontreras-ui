import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Email' },
}

export const Required: Story = {
  args: { children: 'Password', required: true },
}

export const Error: Story = {
  args: { children: 'Username', error: true },
}

export const ErrorRequired: Story = {
  args: { children: 'Phone', error: true, required: true },
}

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email Address</Label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  ),
}

export const WithInputRequired: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="name" required>
        Full Name
      </Label>
      <input
        id="name"
        type="text"
        placeholder="John Doe"
        className="px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  ),
}
