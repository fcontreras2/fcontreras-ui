import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { Button } from '../Button'
import { Badge } from '../Badge'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
  argTypes: {
    shadow: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: 'Card title',
    description: 'A short description of the card content.',
    children: 'Main card content goes here.',
  },
}
export const WithFooter: Story = {
  args: {
    title: 'Confirm action',
    description: 'Are you sure you want to delete this item?',
    children: 'This action cannot be undone.',
    footer: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button variant="danger" size="sm">Delete</Button>
      </div>
    ),
  },
}
export const ContentOnly: Story = {
  args: { children: 'A simple card with only body content and no header or footer.' },
}
export const WithBadge: Story = {
  render: () => (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          Monthly Report <Badge variant="success" size="sm">Live</Badge>
        </div>
      }
      description="Summary for April 2026"
      footer={<Button size="sm">Download PDF</Button>}
    >
      <p style={{ fontSize: 14, color: '#6b7280' }}>
        Revenue this month is up 12% compared to last month.
      </p>
    </Card>
  ),
}
export const Shadows: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((s) => (
        <Card key={s} shadow={s} title={`shadow="${s}"`} description="Card shadow variant" />
      ))}
    </div>
  ),
}
