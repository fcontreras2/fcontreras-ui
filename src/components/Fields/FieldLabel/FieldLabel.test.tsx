import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { FieldLabel } from './FieldLabel'
import { FieldsProvider } from '../FieldsProvider'

function Wrapper({ children, t }: { children: React.ReactNode; t?: (key: string) => string }) {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <FieldsProvider t={t}>{children}</FieldsProvider>
    </FormProvider>
  )
}

describe('FieldLabel', () => {
  it('renders explicit label when provided', () => {
    render(
      <Wrapper>
        <FieldLabel name="email" label="Email Address" />
      </Wrapper>
    )
    expect(screen.getByText('Email Address')).toBeInTheDocument()
  })

  it('resolves label from t when no label prop', () => {
    const t = (key: string) => {
      if (key === 'form.fields.email') return 'Correo Electrónico'
      throw new Error(`Missing: ${key}`)
    }
    render(
      <Wrapper t={t}>
        <FieldLabel name="email" />
      </Wrapper>
    )
    expect(screen.getByText('Correo Electrónico')).toBeInTheDocument()
  })

  it('uses translationKey override when provided', () => {
    const t = (key: string) => {
      if (key === 'custom.key') return 'Custom Label'
      throw new Error(`Missing: ${key}`)
    }
    render(
      <Wrapper t={t}>
        <FieldLabel name="email" translationKey="custom.key" />
      </Wrapper>
    )
    expect(screen.getByText('Custom Label')).toBeInTheDocument()
  })

  it('falls back to formatted name when t throws', () => {
    const t = () => { throw new Error('Missing') }
    render(
      <Wrapper t={t}>
        <FieldLabel name="firstName" />
      </Wrapper>
    )
    expect(screen.getByText('First Name')).toBeInTheDocument()
  })

  it('falls back to formatted name when no t', () => {
    render(
      <Wrapper>
        <FieldLabel name="billingAddress" />
      </Wrapper>
    )
    expect(screen.getByText('Billing Address')).toBeInTheDocument()
  })

  it('renders required asterisk when required is true', () => {
    render(
      <Wrapper>
        <FieldLabel name="email" label="Email" required />
      </Wrapper>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders tooltip when provided', () => {
    render(
      <Wrapper>
        <FieldLabel name="email" label="Email" tooltip="Your email" />
      </Wrapper>
    )
    expect(document.querySelector('[data-icon="help-circle"]')).toBeInTheDocument()
  })

  it('sets htmlFor to name', () => {
    render(
      <Wrapper>
        <FieldLabel name="email" label="Email" />
      </Wrapper>
    )
    expect(screen.getByText('Email').closest('label')).toHaveAttribute('for', 'email')
  })
})
