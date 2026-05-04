import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite'
import { useForm, FormProvider } from 'react-hook-form'
import { Icon } from '../../Icon'
import { FieldSelect } from './FieldSelect'
import { FieldsProvider } from '../FieldsProvider'
import { FieldsGrid } from '../FieldsGrid'

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
]

const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]

const skillOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
]

const translations: Record<string, string> = {
  'form.fields.country': 'Country',
  'form.fields.role': 'Role',
  'form.fields.skills': 'Skills',
  'form.helpTexts.country': 'Select your country of residence.',
  'form.helpTexts.skills': 'You can select multiple skills.',
}

const t = (key: string) => {
  if (key in translations) return translations[key]
  throw new Error(`Missing translation: ${key}`)
}

const FormDecorator = (Story: StoryFn) => {
  const methods = useForm({ defaultValues: { country: null, role: null, skills: [] } })
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

const meta: Meta<typeof FieldSelect> = {
  title: 'Fields/FieldSelect',
  component: FieldSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [FormDecorator],
}

export default meta
type Story = StoryObj<typeof FieldSelect>

export const Default: Story = {
  args: { name: 'country', options: countryOptions },
}

export const WithExplicitLabel: Story = {
  args: { name: 'country', label: 'Your Country', options: countryOptions },
}

export const WithHelpText: Story = {
  args: { name: 'country', options: countryOptions },
}

export const WithTooltip: Story = {
  args: {
    name: 'country',
    options: countryOptions,
    tooltip: 'Used to determine your tax region.',
  },
}

export const WithError: Story = {
  decorators: [
    (Story: StoryFn) => {
      const methods = useForm({ defaultValues: { country: null } })
      methods.setError('country', { message: 'Country is required' })
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
  args: { name: 'country', options: countryOptions },
}

export const Required: Story = {
  args: { name: 'country', options: countryOptions, required: true },
}

export const MultiSelect: Story = {
  args: {
    name: 'skills',
    options: skillOptions,
    isMulti: true as never,
    helpText: 'You can select multiple skills.',
  },
}

export const WithIcon: Story = {
  args: {
    name: 'country',
    options: countryOptions,
    leftIcon: <Icon name="home" size="sm" />,
  },
}

export const MultipleFields: Story = {
  render: () => (
    <>
      <FieldSelect name="country" options={countryOptions} />
      <FieldSelect name="role" options={roleOptions} />
    </>
  ),
}
