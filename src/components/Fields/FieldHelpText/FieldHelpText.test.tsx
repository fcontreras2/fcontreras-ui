import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { FieldHelpText } from './FieldHelpText'
import { FieldsProvider } from '../FieldsProvider'

function Wrapper({ children, t }: { children: React.ReactNode; t?: (key: string) => string }) {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <FieldsProvider t={t}>{children}</FieldsProvider>
    </FormProvider>
  )
}

describe('FieldHelpText', () => {
  it('renders nothing when no text and no translation', () => {
    const { container } = render(
      <Wrapper>
        <FieldHelpText name="email" />
      </Wrapper>
    )
    expect(container.querySelector('p')).toBeNull()
  })

  it('renders explicit text when provided', () => {
    render(
      <Wrapper>
        <FieldHelpText name="email" text="We will never share your email." />
      </Wrapper>
    )
    expect(screen.getByText('We will never share your email.')).toBeInTheDocument()
  })

  it('resolves text from t using default key', () => {
    const t = (key: string) => {
      if (key === 'form.helpTexts.email') return 'Enter a valid email'
      throw new Error(`Missing: ${key}`)
    }
    render(
      <Wrapper t={t}>
        <FieldHelpText name="email" />
      </Wrapper>
    )
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
  })

  it('uses translationKey override when provided', () => {
    const t = (key: string) => {
      if (key === 'custom.help') return 'Custom help text'
      throw new Error(`Missing: ${key}`)
    }
    render(
      <Wrapper t={t}>
        <FieldHelpText name="email" translationKey="custom.help" />
      </Wrapper>
    )
    expect(screen.getByText('Custom help text')).toBeInTheDocument()
  })

  it('renders nothing when t throws and no text provided', () => {
    const t = () => { throw new Error('Missing') }
    const { container } = render(
      <Wrapper t={t}>
        <FieldHelpText name="email" />
      </Wrapper>
    )
    expect(container.querySelector('p')).toBeNull()
  })

  it('explicit text takes priority over translation', () => {
    const t = (key: string) => {
      if (key === 'form.helpTexts.email') return 'Translated help'
      throw new Error(`Missing: ${key}`)
    }
    render(
      <Wrapper t={t}>
        <FieldHelpText name="email" text="Manual help" />
      </Wrapper>
    )
    expect(screen.getByText('Manual help')).toBeInTheDocument()
    expect(screen.queryByText('Translated help')).not.toBeInTheDocument()
  })
})
