import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite'
import { useForm, FormProvider } from 'react-hook-form'
import { FieldInput } from './FieldInput'
import { FieldsProvider } from '../FieldsProvider'
import { FieldsGrid } from '../FieldsGrid'
import { Icon } from '../../Icon'

const translations: Record<string, string> = {
  'form.fields.first_name': 'First Name',
  'form.fields.last_name': 'Last Name',
  'form.fields.email': 'Email Address',
  'form.fields.phone': 'Phone Number',
  'form.fields.address': 'Address',
  'form.placeholders.first_name': 'Enter your first name',
  'form.placeholders.last_name': 'Enter your last name',
  'form.placeholders.email': 'e.g. john@example.com',
  'form.placeholders.phone': '+1 (555) 000-0000',
  'form.placeholders.address': 'Street, City, ZIP',
}

const t = (key: string) => {
  if (key in translations) return translations[key]
  throw new Error(`Missing translation: ${key}`)
}

const FormDecorator = (Story: StoryFn) => {
  const methods = useForm({ defaultValues: { first_name: '', email: '', phone: '', address: '' } })
  return (
    <FormProvider {...methods}>
      <FieldsProvider t={t}>
        <FieldsGrid style={{ width: 640 }}>
          <Story />
        </FieldsGrid>
      </FieldsProvider>
    </FormProvider>
  )
}

const meta: Meta<typeof FieldInput> = {
  title: 'Fields/FieldInput',
  component: FieldInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [FormDecorator],
}

export default meta
type Story = StoryObj<typeof FieldInput>

export const Default: Story = {
  args: { name: 'first_name' },
}

export const WithExplicitLabel: Story = {
  args: { name: 'first_name', label: 'Your First Name' },
}

export const WithTooltip: Story = {
  args: {
    name: 'email',
    tooltip: 'We will never share your email with anyone.',
  },
}

export const WithIcon: Story = {
  args: {
    name: 'phone',
    leftAddon: <Icon name="phone" size="sm" />,
  },
}

export const WithError: Story = {
  decorators: [
    (Story: StoryFn) => {
      const methods = useForm({ defaultValues: { email: '' } })
      methods.setError('email', { message: 'Invalid email address' })
      return (
        <FormProvider {...methods}>
          <FieldsProvider t={t}>
            <FieldsGrid style={{ width: 640 }}>
              <Story />
            </FieldsGrid>
          </FieldsProvider>
        </FormProvider>
      )
    },
  ],
  args: { name: 'email' },
}

export const FullWidth: Story = {
  args: {
    name: 'address',
    className: 'col-span-full',
    placeholder: 'Enter full address',
  },
}

export const MultipleFields: Story = {
  render: () => (
    <>
      <FieldInput name="first_name" />
      <FieldInput name="last_name" />
      <FieldInput name="email" tooltip="We will never share your email." />
      <FieldInput name="phone" leftAddon={<Icon name="phone" size="sm" />} />
      <FieldInput name="address" className="col-span-full" />
    </>
  ),
}
