import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from 'react'
import { FieldCheckbox } from './FieldCheckbox'
import { FieldsProvider } from '../FieldsProvider'

function Wrapper({
  children,
  errors = {},
}: {
  children: React.ReactNode
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
      <FieldsProvider>{children}</FieldsProvider>
    </FormProvider>
  )
}

describe('FieldCheckbox', () => {
  it('renders the checkbox input', () => {
    render(<Wrapper><FieldCheckbox name="terms" /></Wrapper>)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders inline label when provided', () => {
    render(<Wrapper><FieldCheckbox name="terms" label="I agree to the terms" /></Wrapper>)
    expect(screen.getByText('I agree to the terms')).toBeInTheDocument()
  })

  it('renders help text when provided', () => {
    render(<Wrapper><FieldCheckbox name="terms" helpText="Required to continue." /></Wrapper>)
    expect(screen.getByText('Required to continue.')).toBeInTheDocument()
  })

  it('renders error message when field has error', async () => {
    render(
      <Wrapper errors={{ terms: 'You must accept the terms' }}>
        <FieldCheckbox name="terms" />
      </Wrapper>
    )
    expect(await screen.findByText('You must accept the terms')).toBeInTheDocument()
  })

  it('applies invalid border when field has error', async () => {
    render(
      <Wrapper errors={{ terms: 'Required' }}>
        <FieldCheckbox name="terms" />
      </Wrapper>
    )
    await screen.findByText('Required')
    expect(screen.getByRole('checkbox')).toHaveClass('border-danger-500')
  })

  it('has col-span-2 and lg:col-span-3 classes by default', () => {
    const { container } = render(<Wrapper><FieldCheckbox name="terms" /></Wrapper>)
    const wrapper = container.querySelector('.col-span-2')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('lg:col-span-3')
  })
})
