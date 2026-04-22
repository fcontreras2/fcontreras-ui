import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size:   { control: 'select', options: ['xs','sm','md','lg','xl'] },
    shape:  { control: 'select', options: ['circle','square'] },
    status: { control: 'select', options: ['online','offline','away','busy'] },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150?img=3', alt: 'User', size: 'md' },
}
export const WithInitials: Story = { args: { name: 'John Doe', size: 'md' } }
export const NoSrc: Story       = { args: { size: 'md' } }
export const Square: Story      = { args: { name: 'Jane Smith', shape: 'square', size: 'md' } }
export const WithStatus: Story  = { args: { name: 'Maria García', status: 'online', size: 'md' } }
export const Offline: Story     = { args: { name: 'Carlos López', status: 'offline', size: 'md' } }
export const Away: Story        = { args: { name: 'Ana Martínez', status: 'away',    size: 'md' } }
export const Busy: Story        = { args: { name: 'Pedro Ruiz',   status: 'busy',    size: 'md' } }

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['xs','sm','md','lg','xl'] as const).map(s => (
        <Avatar key={s} name="Freddy Contreras" size={s} status="online" />
      ))}
    </div>
  ),
}

export const InitialsColors: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 300 }}>
      {['Alice B','Carlos D','Eve F','George H','Ivan J','Karen L','Mike N','Oscar P'].map(n => (
        <Avatar key={n} name={n} size="md" />
      ))}
    </div>
  ),
}

export const AvatarGroup: StoryObj = {
  render: () => (
    <div style={{ display: 'flex' }}>
      {['Alice B','Carlos D','Eve F','George H'].map((n, i) => (
        <div key={n} style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 4 - i }}>
          <Avatar name={n} size="md" classNames={{ root: 'ring-2 ring-white' }} />
        </div>
      ))}
    </div>
  ),
}
