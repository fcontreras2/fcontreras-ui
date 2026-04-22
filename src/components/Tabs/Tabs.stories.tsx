import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, Tab, TabList, TabPanel } from './Tabs'
import { Badge } from '../Badge'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  argTypes: {
    variant: { control: 'select', options: ['line', 'pill', 'enclosed'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

const BasicTabs = (props: Partial<React.ComponentProps<typeof Tabs>>) => (
  <Tabs defaultValue="overview" {...props}>
    <TabList>
      <Tab value="overview">Overview</Tab>
      <Tab value="activity">Activity</Tab>
      <Tab value="settings">Settings</Tab>
    </TabList>
    <TabPanel value="overview"><p style={{ fontSize: 14, color: '#6b7280' }}>Overview content goes here.</p></TabPanel>
    <TabPanel value="activity"><p style={{ fontSize: 14, color: '#6b7280' }}>Activity feed content.</p></TabPanel>
    <TabPanel value="settings"><p style={{ fontSize: 14, color: '#6b7280' }}>Settings panel content.</p></TabPanel>
  </Tabs>
)

export const Line: Story    = { render: () => <BasicTabs variant="line" /> }
export const Pill: Story    = { render: () => <BasicTabs variant="pill" /> }
export const Enclosed: Story = { render: () => <BasicTabs variant="enclosed" /> }
export const Small: Story   = { render: () => <BasicTabs size="sm" /> }
export const Large: Story   = { render: () => <BasicTabs size="lg" /> }

export const WithBadge: StoryObj = {
  render: () => (
    <Tabs defaultValue="open" style={{ width: 480 }}>
      <TabList>
        <Tab value="open">
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Open <Badge variant="info" size="sm">12</Badge>
          </span>
        </Tab>
        <Tab value="closed">
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Closed <Badge variant="default" size="sm">4</Badge>
          </span>
        </Tab>
        <Tab value="draft" disabled>Draft</Tab>
      </TabList>
      <TabPanel value="open"><p style={{ fontSize: 14, color: '#6b7280' }}>12 open issues.</p></TabPanel>
      <TabPanel value="closed"><p style={{ fontSize: 14, color: '#6b7280' }}>4 closed issues.</p></TabPanel>
    </Tabs>
  ),
}
