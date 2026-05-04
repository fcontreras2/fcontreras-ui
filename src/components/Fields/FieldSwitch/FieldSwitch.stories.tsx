import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite'
import { useForm, FormProvider } from 'react-hook-form'
import { FieldSwitch } from './FieldSwitch'
import { FieldsProvider } from '../FieldsProvider'
import { FieldsGrid } from '../FieldsGrid'

const FormDecorator = (Story: StoryFn) => {
  const methods = useForm({ defaultValues: { notifications: false, darkMode: false, autoSave: false } })
  return (
    <FormProvider {...methods}>
      <FieldsProvider>
        <FieldsGrid style={{ width: 640 }}>
          <Story />
        </FieldsGrid>
      </FieldsProvider>
    </FormProvider>
  )
}

const meta: Meta<typeof FieldSwitch> = {
  title: 'Fields/FieldSwitch',
  component: FieldSwitch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [FormDecorator],
}

export default meta
type Story = StoryObj<typeof FieldSwitch>

export const Default: Story = {
  args: { name: 'notifications', label: 'Enable notifications' },
}

export const WithHelpText: Story = {
  args: {
    name: 'notifications',
    label: 'Enable notifications',
    helpText: 'Receive alerts for important updates.',
  },
}

export const WithTooltip: Story = {
  args: {
    name: 'darkMode',
    label: 'Dark mode',
    tooltip: 'Switch between light and dark interface.',
  },
}

export const WithError: Story = {
  decorators: [
    (Story: StoryFn) => {
      const methods = useForm({ defaultValues: { notifications: false } })
      methods.setError('notifications', { message: 'You must enable notifications to continue' })
      return (
        <FormProvider {...methods}>
          <FieldsProvider>
            <FieldsGrid style={{ width: 640 }}>
              <Story />
            </FieldsGrid>
          </FieldsProvider>
        </FormProvider>
      )
    },
  ],
  args: { name: 'notifications', label: 'Enable notifications' },
}

export const Sizes: Story = {
  render: () => (
    <>
      <FieldSwitch name="notifications" label="Small switch" size="sm" className="col-span-full" />
      <FieldSwitch name="darkMode" label="Medium switch (default)" size="md" className="col-span-full" />
      <FieldSwitch name="autoSave" label="Large switch" size="lg" className="col-span-full" />
    </>
  ),
}

export const MultipleFields: Story = {
  render: () => (
    <>
      <FieldSwitch name="notifications" label="Push notifications" className="col-span-full" />
      <FieldSwitch name="darkMode" label="Dark mode" className="col-span-full" />
      <FieldSwitch name="autoSave" label="Auto-save" className="col-span-full" />
    </>
  ),
}
