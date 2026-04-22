import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  argTypes: {
    variant: { control: 'select', options: ['h1','h2','h3','h4','h5','h6','body','body-sm','caption','overline','code'] },
    weight:  { control: 'select', options: ['light','normal','medium','semibold','bold'] },
    color:   { control: 'select', options: ['default','muted','primary','success','warning','danger','inherit'] },
    align:   { control: 'select', options: ['left','center','right'] },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = { args: { children: 'The quick brown fox jumps over the lazy dog' } }
export const Heading1: Story  = { args: { variant: 'h1', children: 'Heading 1' } }
export const Heading2: Story  = { args: { variant: 'h2', children: 'Heading 2' } }
export const Heading3: Story  = { args: { variant: 'h3', children: 'Heading 3' } }
export const Heading4: Story  = { args: { variant: 'h4', children: 'Heading 4' } }
export const BodySm: Story    = { args: { variant: 'body-sm', children: 'Small body text for secondary content or descriptions.' } }
export const Caption: Story   = { args: { variant: 'caption', children: 'Caption text — timestamps, metadata' } }
export const Overline: Story  = { args: { variant: 'overline', children: 'Section label' } }
export const Code: Story      = { args: { variant: 'code', children: 'npm install @fcontreras2/ui' } }
export const Muted: Story     = { args: { color: 'muted', children: 'Muted secondary text' } }
export const Primary: Story   = { args: { color: 'primary', children: 'Primary colored text' } }
export const Truncate: Story  = {
  args: { truncate: true, children: 'This is a very long text that will be truncated when it exceeds the container width.' },
}

export const TypeScale: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['h1','h2','h3','h4','h5','h6'] as const).map(v => (
        <Text key={v} variant={v}>{v.toUpperCase()} — Display heading</Text>
      ))}
      <Text variant="body">Body — The quick brown fox jumps over the lazy dog.</Text>
      <Text variant="body-sm">Body SM — Secondary paragraph text, a bit smaller.</Text>
      <Text variant="caption" color="muted">Caption — Timestamps, metadata, helper text</Text>
      <Text variant="overline" color="muted">Overline label</Text>
      <Text variant="code">const greeting = "Hello, world!"</Text>
    </div>
  ),
}

export const Colors: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {(['default','muted','primary','success','warning','danger'] as const).map(c => (
        <Text key={c} color={c}>Color: {c}</Text>
      ))}
    </div>
  ),
}
