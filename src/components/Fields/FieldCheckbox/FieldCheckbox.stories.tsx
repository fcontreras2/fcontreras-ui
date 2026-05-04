import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite'
import { useForm, FormProvider } from 'react-hook-form'
import { FieldCheckbox } from './FieldCheckbox'
import { FieldsProvider } from '../FieldsProvider'
import { FieldsGrid } from '../FieldsGrid'

const FormDecorator = (Story: StoryFn) => {
  const methods = useForm({ defaultValues: { terms: false, newsletter: false, privacy: false } })
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

const meta: Meta<typeof FieldCheckbox> = {
  title: 'Fields/FieldCheckbox',
  component: FieldCheckbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [FormDecorator],
}

export default meta
type Story = StoryObj<typeof FieldCheckbox>

export const Default: Story = {
  args: { name: 'terms', label: 'I agree to the terms and conditions' },
}

export const WithHelpText: Story = {
  args: {
    name: 'terms',
    label: 'I agree to the terms and conditions',
    helpText: 'You must accept to continue.',
  },
}

export const WithTooltip: Story = {
  args: {
    name: 'newsletter',
    label: 'Subscribe to newsletter',
    tooltip: 'Receive weekly updates about new features.',
  },
}

export const WithError: Story = {
  decorators: [
    (Story: StoryFn) => {
      const methods = useForm({ defaultValues: { terms: false } })
      methods.setError('terms', { message: 'You must accept the terms' })
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
  args: { name: 'terms', label: 'I agree to the terms and conditions' },
}

export const Sizes: Story = {
  render: () => (
    <>
      <FieldCheckbox name="terms" label="Small checkbox" size="sm" className="col-span-full" />
      <FieldCheckbox name="newsletter" label="Medium checkbox (default)" size="md" className="col-span-full" />
      <FieldCheckbox name="privacy" label="Large checkbox" size="lg" className="col-span-full" />
    </>
  ),
}

export const MultipleFields: Story = {
  render: () => (
    <>
      <FieldCheckbox name="terms" label="I agree to the terms and conditions" className="col-span-full" />
      <FieldCheckbox name="newsletter" label="Subscribe to newsletter" className="col-span-full" />
      <FieldCheckbox name="privacy" label="I have read the privacy policy" className="col-span-full" />
    </>
  ),
}
