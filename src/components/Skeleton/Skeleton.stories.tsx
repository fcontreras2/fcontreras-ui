import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  argTypes: {
    variant: { control: 'select', options: ['text','circular','rectangular'] },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Text: Story       = { args: { variant: 'text' } }
export const MultiLine: Story  = { args: { variant: 'text', lines: 4 } }
export const Circular: Story   = { args: { variant: 'circular' } }
export const Rectangular: Story = { args: { variant: 'rectangular' } }
export const CustomSize: Story  = { args: { variant: 'rectangular', width: 200, height: 120 } }

export const CardSkeleton: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20, border: '1px solid #e5e7eb', borderRadius: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <div style={{ marginTop: 6 }}>
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      </div>
      <Skeleton variant="rectangular" height={160} />
      <Skeleton variant="text" lines={3} />
    </div>
  ),
}

export const ListSkeleton: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Skeleton variant="circular" width={36} height={36} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="30%" />
          </div>
        </div>
      ))}
    </div>
  ),
}
