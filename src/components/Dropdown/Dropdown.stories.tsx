import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown, DropdownItem, DropdownDivider } from './Dropdown'
import { Button } from '../Button'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dropdown trigger={<Button>Open Menu</Button>}>
      <DropdownItem label="Edit" />
      <DropdownItem label="Duplicate" />
      <DropdownItem label="Archive" />
      <DropdownDivider />
      <DropdownItem label="Delete" variant="danger" />
    </Dropdown>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Dropdown trigger={<Button>Menu</Button>}>
      <DropdownItem label="Profile" icon="👤" />
      <DropdownItem label="Settings" icon="⚙️" />
      <DropdownDivider />
      <DropdownItem label="Logout" variant="danger" icon="🚪" />
    </Dropdown>
  ),
}

export const RightAlign: Story = {
  render: () => (
    <Dropdown trigger={<Button>More</Button>} align="right">
      <DropdownItem label="Option 1" />
      <DropdownItem label="Option 2" />
      <DropdownItem label="Option 3" />
    </Dropdown>
  ),
}
