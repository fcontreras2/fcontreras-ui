import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'
import { Button } from '../Button'
import { Text } from '../Text'

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover trigger={<Button>Show Info</Button>}>
      <div className="space-y-2">
        <Text weight="semibold">Welcome!</Text>
        <Text color="muted" size="sm">
          This is a popover with detailed information.
        </Text>
      </div>
    </Popover>
  ),
}

export const WithContent: Story = {
  render: () => (
    <Popover trigger={<Button>Learn More</Button>}>
      <div className="space-y-3 max-w-xs">
        <Text weight="semibold">Advanced Settings</Text>
        <Text color="muted" size="sm">
          Configure advanced options for your account. These settings affect how your data is
          processed and displayed.
        </Text>
        <div className="pt-2 flex gap-2">
          <Button size="sm" variant="default">
            Save
          </Button>
          <Button size="sm" variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </Popover>
  ),
}

export const RightAlign: Story = {
  render: () => (
    <div className="flex justify-end">
      <Popover trigger={<Button>Help</Button>} align="right">
        <div className="space-y-2">
          <Text weight="semibold">Quick Help</Text>
          <Text color="muted" size="sm">
            Click here for assistance with your current task.
          </Text>
        </div>
      </Popover>
    </div>
  ),
}
