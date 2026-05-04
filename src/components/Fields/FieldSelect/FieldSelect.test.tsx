import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from 'react'
import { FieldSelect } from './FieldSelect'
import { FieldsProvider } from '../FieldsProvider'

const options = [
  { value: 'us', label: 'United States' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ca', label: 'Canada' },
]

const translations: Record<string, string> = {
  'form.fields.country': 'Country',
  'form.helpTexts.country': 'Select your country of residence.',
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

describe('FieldSelect', () => {
  it('renders label from t', () => {
    render(<Wrapper withT><FieldSelect name="country" options={options} /></Wrapper>)
    expect(screen.getByText('Country')).toBeInTheDocument()
  })

  it('renders explicit label when provided', () => {
    render(<Wrapper><FieldSelect name="country" label="Your Country" options={options} /></Wrapper>)
    expect(screen.getByText('Your Country')).toBeInTheDocument()
  })

  it('falls back to formatted name when no t', () => {
    render(<Wrapper><FieldSelect name="homeCountry" options={options} /></Wrapper>)
    expect(screen.getByText('Home Country')).toBeInTheDocument()
  })

  it('renders help text from t', () => {
    render(<Wrapper withT><FieldSelect name="country" options={options} /></Wrapper>)
    expect(screen.getByText('Select your country of residence.')).toBeInTheDocument()
  })

  it('renders explicit help text when provided', () => {
    render(<Wrapper><FieldSelect name="country" options={options} helpText="Pick one" /></Wrapper>)
    expect(screen.getByText('Pick one')).toBeInTheDocument()
  })

  it('renders error message when field has error', async () => {
    render(
      <Wrapper errors={{ country: 'Country is required' }}>
        <FieldSelect name="country" options={options} />
      </Wrapper>
    )
    expect(await screen.findByText('Country is required')).toBeInTheDocument()
  })

  it('renders required asterisk when required is true', () => {
    render(<Wrapper><FieldSelect name="country" label="Country" options={options} required /></Wrapper>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('has col-span-2 and lg:col-span-3 classes by default', () => {
    const { container } = render(<Wrapper><FieldSelect name="country" label="Country" options={options} /></Wrapper>)
    const wrapper = container.querySelector('.col-span-2')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('lg:col-span-3')
  })

  it('renders the select input', () => {
    render(<Wrapper><FieldSelect name="country" options={options} /></Wrapper>)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
