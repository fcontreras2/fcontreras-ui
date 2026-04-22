import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal','vertical'] },
    labelAlign:  { control: 'select', options: ['left','center','right'] },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story      = { args: {} }
export const WithLabel: Story    = { args: { label: 'OR' } }
export const LabelLeft: Story    = { args: { label: 'Continue with', labelAlign: 'left' } }
export const LabelRight: Story   = { args: { label: 'or sign up', labelAlign: 'right' } }

export const Vertical: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: 40, gap: 12 }}>
      <span style={{ fontSize: 14 }}>Left</span>
      <Divider orientation="vertical" />
      <span style={{ fontSize: 14 }}>Center</span>
      <Divider orientation="vertical" />
      <span style={{ fontSize: 14 }}>Right</span>
    </div>
  ),
}

export const InContent: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 14, color: '#374151' }}>Section one content goes here.</p>
      <Divider label="Next section" />
      <p style={{ fontSize: 14, color: '#374151' }}>Section two content goes here.</p>
    </div>
  ),
}
