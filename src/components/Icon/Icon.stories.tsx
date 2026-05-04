import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'
import { icons, type IconName } from './icons'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: Object.keys(icons) },
    variant: { control: 'radio', options: ['outline', 'solid'] },
    weight: { control: 'radio', options: ['thin', 'regular', 'bold'] },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { name: 'check', variant: 'outline', weight: 'regular', size: 'md' },
}

// ─── Variants ────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Icon name="heart" variant="outline" size="lg" />
        <span className="text-xs text-neutral-500">outline</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="heart" variant="solid" size="lg" />
        <span className="text-xs text-neutral-500">solid</span>
      </div>
    </div>
  ),
}

// ─── Weights ─────────────────────────────────────────────────────────────────

export const Weights: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      {(['thin', 'regular', 'bold'] as const).map((weight) => (
        <div key={weight} className="flex flex-col items-center gap-2">
          <Icon name="search" weight={weight} size="lg" />
          <span className="text-xs text-neutral-500">{weight}</span>
        </div>
      ))}
    </div>
  ),
}

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="bell" size={size} />
          <span className="text-xs text-neutral-500">{size}</span>
        </div>
      ))}
    </div>
  ),
}

// ─── Colors ──────────────────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="heart" variant="solid" size="lg" className="text-danger-500" />
      <Icon name="check" variant="solid" size="lg" className="text-success-500" />
      <Icon name="warning" variant="solid" size="lg" className="text-warning-500" />
      <Icon name="info" variant="solid" size="lg" className="text-primary-500" />
      <Icon name="x" variant="solid" size="lg" className="text-neutral-400" />
    </div>
  ),
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

const iconGroups: Record<string, IconName[]> = {
  'UI General': [
    'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up',
    'check', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up',
    'dashboard', 'dots-horizontal', 'dots-vertical', 'external-link',
    'eye', 'eye-off', 'filter', 'home', 'logout', 'menu', 'minus', 'plus',
    'search', 'settings', 'sort-asc', 'sort-desc', 'x',
  ],
  'Formularios': [
    'calendar', 'clock', 'download', 'edit', 'lock', 'mail', 'paperclip',
    'phone', 'trash', 'unlock', 'upload', 'user', 'user-group', 'users',
  ],
  'Comunicación': [
    'alert-circle', 'bell', 'bell-off', 'chat', 'help-circle', 'info', 'send', 'warning',
  ],
  'Archivos y datos': [
    'chart-bar', 'chart-line', 'code', 'database', 'document', 'file', 'folder', 'image', 'table',
  ],
  'Salud': [
    'doctor', 'heart', 'heart-pulse', 'stethoscope',
  ],
}

function IconCard({ name }: { name: IconName }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 dark:border-neutral-700 dark:hover:border-primary-700 dark:hover:bg-primary-950 transition-colors cursor-default group">
      <Icon name={name} size="md" className="text-neutral-700 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
      <span className="text-xs text-neutral-500 dark:text-neutral-400 text-center leading-tight">{name}</span>
    </div>
  )
}

export const Gallery: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-8" style={{ width: 720 }}>
      {Object.entries(iconGroups).map(([group, names]) => (
        <div key={group}>
          <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">
            {group}
          </h3>
          <div className="grid grid-cols-8 gap-2">
            {names.map((name) => (
              <IconCard key={name} name={name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── In Components ───────────────────────────────────────────────────────────

export const InComponents: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 320 }}>
      <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors">
        <Icon name="plus" size="sm" />
        New item
      </button>
      <button className="flex items-center gap-2 px-4 py-2 border border-danger-300 text-danger-600 rounded-md text-sm font-medium hover:bg-danger-50 transition-colors">
        <Icon name="trash" size="sm" />
        Delete
      </button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-300 bg-white">
        <Icon name="search" size="sm" className="text-neutral-400" />
        <span className="text-sm text-neutral-400">Search...</span>
      </div>
      <div className="flex items-center gap-2 p-3 rounded-md bg-success-50 border border-success-200 text-success-700">
        <Icon name="check" variant="solid" size="sm" className="text-success-500" />
        <span className="text-sm">Operation completed successfully</span>
      </div>
      <div className="flex items-center gap-2 p-3 rounded-md bg-warning-50 border border-warning-200 text-warning-700">
        <Icon name="warning" variant="solid" size="sm" className="text-warning-500" />
        <span className="text-sm">Please review before continuing</span>
      </div>
    </div>
  ),
}
