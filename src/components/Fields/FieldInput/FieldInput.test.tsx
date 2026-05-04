import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from 'react'
import { FieldInput } from './FieldInput'
import { FieldsProvider } from '../FieldsProvider'

const translations: Record<string, string> = {
  'form.fields.email': 'Email Address',
  'form.placeholders.email': 'e.g. john@example.com',
  'form.helpTexts.email': 'We will never share your email.',
}

const t = (key: string) => {
  if (key in translations) return translations[key]
  throw new Error(`Missing translation: ${key}`)
}

function Wrapper({
  children,
  withT = false,
  errors = {},
}: {
  children: React.ReactNode
  withT?: boolean
  errors?: Record<string, string>
}) {
  const methods = useForm()
  useEffect(() => {
    Object.entries(errors).forEach(([name, message]) => {
      methods.setError(name, { message })
    })
  }, [])
  return (
    <FormProvider {...methods}>
      <FieldsProvider t={withT ? t : undefined}>{children}</FieldsProvider>
    </FormProvider>
  )
}

describe('FieldInput', () => {
  it('renders label from t', () => {
    render(
      <Wrapper withT>
        <FieldInput name="email" />
      </Wrapper>
    )
    expect(screen.getByText('Email Address')).toBeInTheDocument()
  })

  it('renders explicit label when provided', () => {
    render(
      <Wrapper withT>
        <FieldInput name="email" label="Your Email" />
      </Wrapper>
    )
    expect(screen.getByText('Your Email')).toBeInTheDocument()
  })

  it('falls back to formatted name when no t', () => {
    render(
      <Wrapper>
        <FieldInput name="billingAddress" />
      </Wrapper>
    )
    expect(screen.getByText('Billing Address')).toBeInTheDocument()
  })

  it('renders placeholder from t', () => {
    render(
      <Wrapper withT>
        <FieldInput name="email" />
      </Wrapper>
    )
    expect(screen.getByPlaceholderText('e.g. john@example.com')).toBeInTheDocument()
  })

  it('renders explicit placeholder when provided', () => {
    render(
      <Wrapper withT>
        <FieldInput name="email" placeholder="Custom placeholder" />
      </Wrapper>
    )
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('renders help text from t', () => {
    render(
      <Wrapper withT>
        <FieldInput name="email" />
      </Wrapper>
    )
    expect(screen.getByText('We will never share your email.')).toBeInTheDocument()
  })

  it('renders explicit help text when provided', () => {
    render(
      <Wrapper>
        <FieldInput name="email" helpText="Custom help" />
      </Wrapper>
    )
    expect(screen.getByText('Custom help')).toBeInTheDocument()
  })

  it('renders error message when field has error', async () => {
    render(
      <Wrapper errors={{ email: 'Invalid email address' }}>
        <FieldInput name="email" />
      </Wrapper>
    )
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument()
  })

  it('input has isInvalid styles when field has error', async () => {
    render(
      <Wrapper errors={{ email: 'Required' }}>
        <FieldInput name="email" />
      </Wrapper>
    )
    const input = screen.getByRole('textbox')
    await screen.findByText('Required')
    expect(input).toHaveClass('border-danger-500')
  })

  it('renders required asterisk when required is true', () => {
    render(
      <Wrapper>
        <FieldInput name="email" label="Email" required />
      </Wrapper>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('has col-span-2 and lg:col-span-3 classes by default', () => {
    const { container } = render(
      <Wrapper>
        <FieldInput name="email" label="Email" />
      </Wrapper>
    )
    const wrapper = container.querySelector('.col-span-2')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('lg:col-span-3')
  })

  it('renders left addon when provided', () => {
    render(
      <Wrapper>
        <FieldInput name="email" label="Email" leftAddon={<span data-testid="icon">@</span>} />
      </Wrapper>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
