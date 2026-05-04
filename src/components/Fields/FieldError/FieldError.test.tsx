import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from 'react'
import { FieldError } from './FieldError'

function Wrapper({ children, errors = {} }: { children: React.ReactNode; errors?: Record<string, string> }) {
  const methods = useForm()
  useEffect(() => {
    Object.entries(errors).forEach(([name, message]) => {
      methods.setError(name, { message })
    })
  }, [])
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('FieldError', () => {
  it('renders nothing when there is no error', () => {
    const { container } = render(
      <Wrapper>
        <FieldError name="email" />
      </Wrapper>
    )
    expect(container.querySelector('p')).toBeNull()
  })

  it('renders error message when error exists', async () => {
    render(
      <Wrapper errors={{ email: 'Invalid email address' }}>
        <FieldError name="email" />
      </Wrapper>
    )
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument()
  })

  it('only shows error for the given name', async () => {
    render(
      <Wrapper errors={{ email: 'Invalid email', phone: 'Invalid phone' }}>
        <FieldError name="email" />
      </Wrapper>
    )
    expect(await screen.findByText('Invalid email')).toBeInTheDocument()
    expect(screen.queryByText('Invalid phone')).not.toBeInTheDocument()
  })

  it('applies custom classNames', async () => {
    render(
      <Wrapper errors={{ email: 'Error' }}>
        <FieldError name="email" classNames={{ root: 'custom-error' }} />
      </Wrapper>
    )
    expect(await screen.findByText('Error')).toHaveClass('custom-error')
  })
})
