import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: { title: 'Heads up!', description: 'This is a default informational alert.' },
}
export const Success: Story = {
  args: { variant: 'success', title: 'Success!', description: 'Your changes have been saved.' },
}
export const Warning: Story = {
  args: { variant: 'warning', title: 'Warning', description: 'This action cannot be undone.' },
}
export const Danger: Story = {
  args: { variant: 'danger', title: 'Error', description: 'Something went wrong. Please try again.' },
}
export const Info: Story = {
  args: { variant: 'info', title: 'Info', description: 'Your session will expire in 5 minutes.' },
}
export const DescriptionOnly: Story = {
  args: { variant: 'success', description: 'Profile updated successfully.' },
}
export const Closable: Story = {
  args: {
    variant: 'info',
    title: 'Closable alert',
    description: 'Click the X to dismiss this alert.',
    onClose: () => alert('closed'),
  },
}
export const AllVariants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 480 }}>
      <Alert variant="default" title="Default" description="A neutral informational message." />
      <Alert variant="success" title="Success" description="The operation was completed." />
      <Alert variant="warning" title="Warning" description="Please review before continuing." />
      <Alert variant="danger" title="Error" description="Something went wrong." />
      <Alert variant="info" title="Info" description="Here is some useful information." />
    </div>
  ),
}
