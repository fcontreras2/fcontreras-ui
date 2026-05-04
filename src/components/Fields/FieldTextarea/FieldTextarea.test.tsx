import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from 'react'
import { FieldTextarea } from './FieldTextarea'
import { FieldsProvider } from '../FieldsProvider'

const translations: Record<string, string> = {
  'form.fields.bio': 'Biography',
  'form.placeholders.bio': 'Tell us about yourself...',
  'form.helpTexts.bio': 'Maximum 500 characters.',
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

describe('FieldTextarea', () => {
  it('renders label from t', () => {
    render(<Wrapper withT><FieldTextarea name="bio" /></Wrapper>)
    expect(screen.getByText('Biography')).toBeInTheDocument()
  })

  it('renders explicit label when provided', () => {
    render(<Wrapper><FieldTextarea name="bio" label="Your Bio" /></Wrapper>)
    expect(screen.getByText('Your Bio')).toBeInTheDocument()
  })

  it('falls back to formatted name when no t', () => {
    render(<Wrapper><FieldTextarea name="shortBio" /></Wrapper>)
    expect(screen.getByText('Short Bio')).toBeInTheDocument()
  })

  it('renders placeholder from t', () => {
    render(<Wrapper withT><FieldTextarea name="bio" /></Wrapper>)
    expect(screen.getByPlaceholderText('Tell us about yourself...')).toBeInTheDocument()
  })

  it('renders explicit placeholder when provided', () => {
    render(<Wrapper><FieldTextarea name="bio" placeholder="Custom placeholder" /></Wrapper>)
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('renders help text from t', () => {
    render(<Wrapper withT><FieldTextarea name="bio" /></Wrapper>)
    expect(screen.getByText('Maximum 500 characters.')).toBeInTheDocument()
  })

  it('renders explicit help text when provided', () => {
    render(<Wrapper><FieldTextarea name="bio" helpText="Custom help" /></Wrapper>)
    expect(screen.getByText('Custom help')).toBeInTheDocument()
  })

  it('renders error message when field has error', async () => {
    render(
      <Wrapper errors={{ bio: 'Bio is required' }}>
        <FieldTextarea name="bio" />
      </Wrapper>
    )
    expect(await screen.findByText('Bio is required')).toBeInTheDocument()
  })

  it('applies invalid styles when field has error', async () => {
    render(
      <Wrapper errors={{ bio: 'Required' }}>
        <FieldTextarea name="bio" />
      </Wrapper>
    )
    await screen.findByText('Required')
    expect(screen.getByRole('textbox')).toHaveClass('border-danger-500')
  })

  it('renders required asterisk when required is true', () => {
    render(<Wrapper><FieldTextarea name="bio" label="Bio" required /></Wrapper>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('has col-span-2 and lg:col-span-3 classes by default', () => {
    const { container } = render(<Wrapper><FieldTextarea name="bio" label="Bio" /></Wrapper>)
    const wrapper = container.querySelector('.col-span-2')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('lg:col-span-3')
  })
})
