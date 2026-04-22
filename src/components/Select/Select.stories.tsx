import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite'
import { Select } from './Select'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: { options, placeholder: 'Select an option...' },
}
export const WithLabel: Story = {
  args: { label: 'Framework', options, placeholder: 'Select a framework...' },
}
export const WithError: Story = {
  args: { label: 'Framework', options, error: 'This field is required' },
}
export const WithHelperText: Story = {
  args: { label: 'Framework', options, helperText: 'Choose your preferred framework' },
}
export const Multi: Story = {
  args: { label: 'Frameworks', options, isMulti: true as never, placeholder: 'Select frameworks...' },
}
export const Clearable: Story = {
  args: { label: 'Framework', options, isClearable: true },
}
export const Disabled: Story = {
  args: { label: 'Framework', options, isDisabled: true },
}
