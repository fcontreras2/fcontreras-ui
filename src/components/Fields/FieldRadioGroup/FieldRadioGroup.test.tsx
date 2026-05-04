import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from 'react'
import { FieldRadioGroup } from './FieldRadioGroup'
import { Radio } from '../../RadioGroup'
import { FieldsProvider } from '../FieldsProvider'

const translations: Record<string, string> = {
  'form.fields.gender': 'Gender',
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

describe('FieldRadioGroup', () => {
  it('renders label from t', () => {
    render(
      <Wrapper withT>
        <FieldRadioGroup name="gender">
          <Radio value="male" label="Male" />
          <Radio value="female" label="Female" />
        </FieldRadioGroup>
      </Wrapper>
    )
    expect(screen.getByText('Gender')).toBeInTheDocument()
  })

  it('renders explicit label when provided', () => {
    render(
      <Wrapper>
        <FieldRadioGroup name="gender" label="Your Gender">
          <Radio value="male" label="Male" />
        </FieldRadioGroup>
      </Wrapper>
    )
    expect(screen.getByText('Your Gender')).toBeInTheDocument()
  })

  it('falls back to formatted name when no t', () => {
    render(
      <Wrapper>
        <FieldRadioGroup name="maritalStatus">
          <Radio value="single" label="Single" />
        </FieldRadioGroup>
      </Wrapper>
    )
    expect(screen.getByText('Marital Status')).toBeInTheDocument()
  })

  it('renders radio options', () => {
    render(
      <Wrapper>
        <FieldRadioGroup name="gender" label="Gender">
          <Radio value="male" label="Male" />
          <Radio value="female" label="Female" />
          <Radio value="other" label="Other" />
        </FieldRadioGroup>
      </Wrapper>
    )
    expect(screen.getAllByRole('radio')).toHaveLength(3)
    expect(screen.getByText('Male')).toBeInTheDocument()
    expect(screen.getByText('Female')).toBeInTheDocument()
    expect(screen.getByText('Other')).toBeInTheDocument()
  })

  it('renders help text when provided', () => {
    render(
      <Wrapper>
        <FieldRadioGroup name="gender" label="Gender" helpText="Select one option.">
          <Radio value="male" label="Male" />
        </FieldRadioGroup>
      </Wrapper>
    )
    expect(screen.getByText('Select one option.')).toBeInTheDocument()
  })

  it('renders error message when field has error', async () => {
    render(
      <Wrapper errors={{ gender: 'Please select a gender' }}>
        <FieldRadioGroup name="gender" label="Gender">
          <Radio value="male" label="Male" />
        </FieldRadioGroup>
      </Wrapper>
    )
    expect(await screen.findByText('Please select a gender')).toBeInTheDocument()
  })

  it('renders required asterisk when required is true', () => {
    render(
      <Wrapper>
        <FieldRadioGroup name="gender" label="Gender" required>
          <Radio value="male" label="Male" />
        </FieldRadioGroup>
      </Wrapper>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('has col-span-2 and lg:col-span-3 classes by default', () => {
    const { container } = render(
      <Wrapper>
        <FieldRadioGroup name="gender" label="Gender">
          <Radio value="male" label="Male" />
        </FieldRadioGroup>
      </Wrapper>
    )
    const wrapper = container.querySelector('.col-span-2')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('lg:col-span-3')
  })
})
