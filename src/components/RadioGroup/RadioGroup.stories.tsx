import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup, Radio } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: { label: 'Pick a framework', defaultValue: 'react' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="react"   label="React" />
      <Radio value="vue"     label="Vue" />
      <Radio value="svelte"  label="Svelte" />
      <Radio value="angular" label="Angular" />
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  args: { label: 'Size', orientation: 'horizontal', defaultValue: 'md' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="sm" label="Small" />
      <Radio value="md" label="Medium" />
      <Radio value="lg" label="Large" />
    </RadioGroup>
  ),
}

export const WithHelperText: Story = {
  args: { label: 'Plan', helperText: 'You can upgrade anytime.', defaultValue: 'pro' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="free"  label="Free — $0/mo" />
      <Radio value="pro"   label="Pro — $12/mo" />
      <Radio value="team"  label="Team — $40/mo" />
    </RadioGroup>
  ),
}

export const WithError: Story = {
  args: { label: 'Gender', error: 'Please select an option.' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="male"   label="Male" />
      <Radio value="female" label="Female" />
      <Radio value="other"  label="Prefer not to say" />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  args: { label: 'Region', disabled: true, defaultValue: 'us' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="us" label="United States" />
      <Radio value="eu" label="Europe" />
      <Radio value="as" label="Asia" />
    </RadioGroup>
  ),
}

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      {(['sm', 'md', 'lg'] as const).map(size => (
        <RadioGroup key={size} label={`Size: ${size}`} size={size} defaultValue="a">
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      ))}
    </div>
  ),
}
