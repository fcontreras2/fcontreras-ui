import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from 'react'
import { FieldSwitch } from './FieldSwitch'
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

describe('FieldSwitch', () => {
  it('renders the switch input', () => {
    render(<Wrapper><FieldSwitch name="notifications" /></Wrapper>)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('renders inline label when provided', () => {
    render(<Wrapper><FieldSwitch name="notifications" label="Enable notifications" /></Wrapper>)
    expect(screen.getByText('Enable notifications')).toBeInTheDocument()
  })

  it('renders help text when provided', () => {
    render(<Wrapper><FieldSwitch name="notifications" helpText="You can change this later." /></Wrapper>)
    expect(screen.getByText('You can change this later.')).toBeInTheDocument()
  })

  it('renders error message when field has error', async () => {
    render(
      <Wrapper errors={{ notifications: 'This field is required' }}>
        <FieldSwitch name="notifications" />
      </Wrapper>
    )
    expect(await screen.findByText('This field is required')).toBeInTheDocument()
  })

  it('has col-span-2 and lg:col-span-3 classes by default', () => {
    const { container } = render(<Wrapper><FieldSwitch name="notifications" /></Wrapper>)
    const wrapper = container.querySelector('.col-span-2')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('lg:col-span-3')
  })
})
