import type { Meta, StoryObj } from '@storybook/react-vite'
import { BadgeDot } from './BadgeDot'

const meta: Meta<typeof BadgeDot> = {
  title: 'Components/BadgeDot',
  component: BadgeDot,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'danger', 'info'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    pulse:   { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof BadgeDot>

export const Default: Story  = { args: { label: 'Default' } }
export const Success: Story  = { args: { variant: 'success', label: 'Online' } }
export const Warning: Story  = { args: { variant: 'warning', label: 'Away' } }
export const Danger: Story   = { args: { variant: 'danger',  label: 'Offline' } }
export const Info: Story     = { args: { variant: 'info',    label: 'Busy' } }
export const DotOnly: Story  = { args: { variant: 'success' } }
export const Small: Story    = { args: { variant: 'success', label: 'Online', size: 'sm' } }
export const Large: Story    = { args: { variant: 'success', label: 'Online', size: 'lg' } }
export const Pulse: Story    = { args: { variant: 'success', label: 'Live',   pulse: true } }

export const AllVariants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <BadgeDot variant="success" label="Online" />
      <BadgeDot variant="warning" label="Away" />
      <BadgeDot variant="danger"  label="Offline" />
      <BadgeDot variant="info"    label="Busy" />
      <BadgeDot variant="default" label="Unknown" />
    </div>
  ),
}

export const WithPulse: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <BadgeDot variant="success" label="Live stream" pulse />
      <BadgeDot variant="danger"  label="Critical alert" pulse />
    </div>
  ),
}
