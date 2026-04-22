import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  argTypes: {
    variant: { control: 'select', options: ['default','success','warning','danger','info'] },
    size:    { control: 'select', options: ['sm','md','lg'] },
    value:   { control: 'range', min: 0, max: 100 },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story  = { args: { value: 60 } }
export const WithLabel: Story = { args: { value: 72, label: true } }
export const CustomLabel: Story = { args: { value: 3, label: '3 of 10 steps' } }
export const Success: Story  = { args: { value: 100, variant: 'success', label: true } }
export const Warning: Story  = { args: { value: 45,  variant: 'warning', label: true } }
export const Danger: Story   = { args: { value: 15,  variant: 'danger',  label: true } }
export const Info: Story     = { args: { value: 60,  variant: 'info',    label: true } }
export const Small: Story    = { args: { value: 60,  size: 'sm' } }
export const Large: Story    = { args: { value: 60,  size: 'lg' } }

export const AllVariants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['default','success','warning','danger','info'] as const).map(v => (
        <Progress key={v} value={65} variant={v} label={v} />
      ))}
    </div>
  ),
}

export const FileUpload: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Progress value={100} variant="success" label="document.pdf — Complete" size="sm" />
      <Progress value={67}  variant="default" label="image.png — 67%" size="sm" />
      <Progress value={12}  variant="warning" label="video.mp4 — 12%" size="sm" />
    </div>
  ),
}
