import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = { args: { placeholder: 'Write something...' } }
export const WithLabel: Story = { args: { label: 'Description', placeholder: 'Enter a description...' } }
export const WithHelperText: Story = {
  args: { label: 'Bio', placeholder: 'Tell us about yourself', helperText: 'Max 200 characters' },
}
export const WithError: Story = {
  args: { label: 'Description', placeholder: 'Enter a description...', error: 'This field is required' },
}
export const Disabled: Story = {
  args: { label: 'Description', placeholder: 'Disabled textarea', disabled: true },
}
export const FullWidth: Story = {
  args: { label: 'Notes', placeholder: 'Add notes here...', fullWidth: true },
}
