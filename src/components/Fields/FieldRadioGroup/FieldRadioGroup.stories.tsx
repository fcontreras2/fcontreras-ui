import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite'
import { useForm, FormProvider } from 'react-hook-form'
import { FieldRadioGroup } from './FieldRadioGroup'
import { Radio } from '../../RadioGroup'
import { FieldsProvider } from '../FieldsProvider'
import { FieldsGrid } from '../FieldsGrid'

const translations: Record<string, string> = {
  'form.fields.gender': 'Gender',
  'form.fields.plan': 'Plan',
  'form.fields.frequency': 'Billing Frequency',
  'form.helpTexts.plan': 'You can upgrade or downgrade at any time.',
}

const t = (key: string) => {
  if (key in translations) return translations[key]
  throw new Error(`Missing translation: ${key}`)
}

const FormDecorator = (Story: StoryFn) => {
  const methods = useForm({ defaultValues: { gender: '', plan: '', frequency: '' } })
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

const meta: Meta<typeof FieldRadioGroup> = {
  title: 'Fields/FieldRadioGroup',
  component: FieldRadioGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [FormDecorator],
}

export default meta
type Story = StoryObj<typeof FieldRadioGroup>

export const Default: Story = {
  args: { name: 'gender' },
  render: (args) => (
    <FieldRadioGroup {...args}>
      <Radio value="male" label="Male" />
      <Radio value="female" label="Female" />
      <Radio value="other" label="Other" />
    </FieldRadioGroup>
  ),
}

export const WithExplicitLabel: Story = {
  args: { name: 'gender', label: 'Your Gender' },
  render: (args) => (
    <FieldRadioGroup {...args}>
      <Radio value="male" label="Male" />
      <Radio value="female" label="Female" />
      <Radio value="other" label="Other" />
    </FieldRadioGroup>
  ),
}

export const WithHelpText: Story = {
  args: { name: 'plan', helpText: 'You can upgrade or downgrade at any time.' },
  render: (args) => (
    <FieldRadioGroup {...args}>
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="enterprise" label="Enterprise" />
    </FieldRadioGroup>
  ),
}

export const WithTooltip: Story = {
  args: { name: 'gender', tooltip: 'Used for personalization purposes only.' },
  render: (args) => (
    <FieldRadioGroup {...args}>
      <Radio value="male" label="Male" />
      <Radio value="female" label="Female" />
      <Radio value="other" label="Prefer not to say" />
    </FieldRadioGroup>
  ),
}

export const Horizontal: Story = {
  args: { name: 'frequency', orientation: 'horizontal' },
  render: (args) => (
    <FieldRadioGroup {...args}>
      <Radio value="monthly" label="Monthly" />
      <Radio value="yearly" label="Yearly" />
    </FieldRadioGroup>
  ),
}

export const WithError: Story = {
  decorators: [
    (Story: StoryFn) => {
      const methods = useForm({ defaultValues: { gender: '' } })
      methods.setError('gender', { message: 'Please select a gender' })
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
  args: { name: 'gender' },
  render: (args) => (
    <FieldRadioGroup {...args}>
      <Radio value="male" label="Male" />
      <Radio value="female" label="Female" />
      <Radio value="other" label="Other" />
    </FieldRadioGroup>
  ),
}

export const Required: Story = {
  args: { name: 'gender', required: true },
  render: (args) => (
    <FieldRadioGroup {...args}>
      <Radio value="male" label="Male" />
      <Radio value="female" label="Female" />
      <Radio value="other" label="Other" />
    </FieldRadioGroup>
  ),
}
