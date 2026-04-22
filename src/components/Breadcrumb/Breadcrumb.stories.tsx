import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home',     href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Laptops',  href: '#' },
      { label: 'MacBook Pro 16"' },
    ],
  },
}

export const Short: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Settings' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    separator: '/',
    items: [
      { label: 'Home',     href: '#' },
      { label: 'Blog',     href: '#' },
      { label: 'Post title' },
    ],
  },
}

export const WithClick: StoryObj = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home',      onClick: () => alert('Home') },
        { label: 'Users',     onClick: () => alert('Users') },
        { label: 'John Doe' },
      ]}
    />
  ),
}
