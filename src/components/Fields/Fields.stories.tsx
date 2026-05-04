import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm, FormProvider } from 'react-hook-form'
import { Icon } from '../Icon'
import { Radio, RadioGroup } from '../RadioGroup'
import { FieldCheckbox } from './FieldCheckbox'
import { FieldError } from './FieldError'
import { FieldHelpText } from './FieldHelpText'
import { FieldInput } from './FieldInput'
import { FieldLabel } from './FieldLabel'
import { FieldRadioGroup } from './FieldRadioGroup'
import { FieldSelect } from './FieldSelect'
import { FieldSwitch } from './FieldSwitch'
import { FieldTextarea } from './FieldTextarea'
import { FieldsGrid } from './FieldsGrid'
import { FieldsProvider } from './FieldsProvider'

const translations: Record<string, string> = {
  // Labels
  'form.fields.first_name': 'First Name',
  'form.fields.last_name': 'Last Name',
  'form.fields.email': 'Email Address',
  'form.fields.phone': 'Phone Number',
  'form.fields.country': 'Country',
  'form.fields.gender': 'Gender',
  'form.fields.plan': 'Plan',
  'form.fields.bio': 'Biography',
  'form.fields.notifications': 'Push Notifications',
  'form.fields.terms': 'Terms & Conditions',
  // Placeholders
  'form.placeholders.first_name': 'Enter your first name',
  'form.placeholders.last_name': 'Enter your last name',
  'form.placeholders.email': 'e.g. john@example.com',
  'form.placeholders.phone': '+1 (555) 000-0000',
  'form.placeholders.bio': 'Tell us about yourself...',
  // Help texts
  'form.helpTexts.email': 'We will never share your email with anyone.',
  'form.helpTexts.bio': 'Maximum 500 characters.',
  'form.helpTexts.plan': 'You can upgrade or downgrade at any time.',
}

const t = (key: string) => {
  if (key in translations) return translations[key]
  throw new Error(`Missing translation: ${key}`)
}

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
]

type FormValues = {
  first_name: string
  last_name: string
  email: string
  phone: string
  country: { value: string; label: string } | null
  gender: string
  plan: string
  bio: string
  notifications: boolean
  terms: boolean
}

function CompleteForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      country: null,
      gender: '',
      plan: '',
      bio: '',
      notifications: false,
      terms: false,
    },
  })

  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log('Form submitted:', data)
  }

  return (
    <FormProvider {...methods}>
      <FieldsProvider t={t}>
        <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: 720 }}>
          <FieldsGrid className="mb-6">
            {/* Personal info */}
            <FieldInput name="first_name" required />
            <FieldInput name="last_name" required />
            <FieldInput
              name="email"
              type="email"
              required
              tooltip="We will never share your email."
            />
            <FieldInput
              name="phone"
              type="tel"
              leftAddon={<Icon name="phone" size="xs" />}
            />
            <FieldSelect name="country" options={countryOptions} required />
            <FieldRadioGroup name="gender" orientation="horizontal">
              <Radio value="male" label="Male" />
              <Radio value="female" label="Female" />
              <Radio value="other" label="Other" />
            </FieldRadioGroup>
            <FieldRadioGroup name="plan" className="col-span-full">
              <RadioGroup
                name="plan"
                orientation="horizontal"
                value={methods.watch('plan')}
                onChange={(v) => methods.setValue('plan', v)}
              >
                <Radio value="free" label="Free" />
                <Radio value="pro" label="Pro" />
                <Radio value="enterprise" label="Enterprise" />
              </RadioGroup>
            </FieldRadioGroup>
            <FieldTextarea name="bio" className="col-span-full" rows={4} />
          </FieldsGrid>

          {/* Preferences */}
          <div className="flex flex-col gap-3 mb-6">
            <FieldLabel name="preferences" label="Preferences" />
            <FieldSwitch name="notifications" label="Enable push notifications" />
            <FieldCheckbox name="terms" label="I agree to the Terms of Service and Privacy Policy" required />
            <FieldError name="terms" />
            <FieldHelpText name="terms" text="Required to create your account." />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Create Account
          </button>
        </form>
      </FieldsProvider>
    </FormProvider>
  )
}

const meta: Meta = {
  title: 'Fields/Complete Form',
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <CompleteForm />,
}

export const WithErrors: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const methods = useForm<FormValues>({
      defaultValues: {
        first_name: '',
        last_name: '',
        email: 'not-an-email',
        phone: '',
        country: null,
        gender: '',
        plan: '',
        bio: '',
        notifications: false,
        terms: false,
      },
    })

    methods.setError('first_name', { message: 'First name is required' })
    methods.setError('email', { message: 'Enter a valid email address' })
    methods.setError('country', { message: 'Country is required' })
    methods.setError('gender', { message: 'Please select a gender' })
    methods.setError('terms', { message: 'You must accept the terms' })

    return (
      <FormProvider {...methods}>
        <FieldsProvider t={t}>
          <form style={{ width: 720 }}>
            <FieldsGrid className="mb-6">
              <FieldInput name="first_name" required />
              <FieldInput name="last_name" required />
              <FieldInput name="email" type="email" required />
              <FieldInput name="phone" type="tel" />
              <FieldSelect name="country" options={countryOptions} required />
              <FieldRadioGroup name="gender" orientation="horizontal">
                <Radio value="male" label="Male" />
                <Radio value="female" label="Female" />
                <Radio value="other" label="Other" />
              </FieldRadioGroup>
              <FieldTextarea name="bio" className="col-span-full" rows={4} />
            </FieldsGrid>
            <div className="flex flex-col gap-3 mb-6">
              <FieldSwitch name="notifications" label="Enable push notifications" />
              <FieldCheckbox name="terms" label="I agree to the Terms of Service and Privacy Policy" required />
            </div>
            <button
              type="button"
              className="px-6 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Create Account
            </button>
          </form>
        </FieldsProvider>
      </FormProvider>
    )
  },
}
