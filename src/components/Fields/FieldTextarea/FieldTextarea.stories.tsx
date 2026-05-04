import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite'
import { useForm, FormProvider } from 'react-hook-form'
import { FieldTextarea } from './FieldTextarea'
import { FieldsProvider } from '../FieldsProvider'
import { FieldsGrid } from '../FieldsGrid'

const translations: Record<string, string> = {
  'form.fields.bio': 'Biography',
  'form.fields.notes': 'Notes',
  'form.fields.description': 'Description',
  'form.placeholders.bio': 'Tell us about yourself...',
  'form.placeholders.notes': 'Add any additional notes...',
  'form.placeholders.description': 'Describe the item...',
  'form.helpTexts.bio': 'Maximum 500 characters.',
}

const t = (key: string) => {
  if (key in translations) return translations[key]
  throw new Error(`Missing translation: ${key}`)
}

const FormDecorator = (Story: StoryFn) => {
  const methods = useForm({ defaultValues: { bio: '', notes: '', description: '' } })
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

const meta: Meta<typeof FieldTextarea> = {
  title: 'Fields/FieldTextarea',
  component: FieldTextarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [FormDecorator],
}

export default meta
type Story = StoryObj<typeof FieldTextarea>

export const Default: Story = {
  args: { name: 'bio' },
}

export const WithExplicitLabel: Story = {
  args: { name: 'bio', label: 'About You' },
}

export const WithHelpText: Story = {
  args: { name: 'bio' },
}

export const WithTooltip: Story = {
  args: {
    name: 'bio',
    tooltip: 'This will be displayed on your public profile.',
  },
}

export const WithError: Story = {
  decorators: [
    (Story: StoryFn) => {
      const methods = useForm({ defaultValues: { bio: '' } })
      methods.setError('bio', { message: 'Biography is required' })
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
  args: { name: 'bio' },
}

export const Required: Story = {
  args: { name: 'bio', required: true },
}

export const FullWidth: Story = {
  args: {
    name: 'description',
    className: 'col-span-full',
    rows: 6,
  },
}

export const MultipleFields: Story = {
  render: () => (
    <>
      <FieldTextarea name="bio" rows={4} />
      <FieldTextarea name="notes" className="col-span-full" rows={3} />
    </>
  ),
}
