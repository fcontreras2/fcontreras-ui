import { useFormContext } from 'react-hook-form'
import { FormHelperText, type FormHelperTextClassNames, type FormHelperTextProps } from '../../FormHelperText'

export interface FieldErrorClassNames extends FormHelperTextClassNames {}

export interface FieldErrorProps extends Omit<FormHelperTextProps, 'variant' | 'children'> {
  name: string
  classNames?: FieldErrorClassNames
}

export function FieldError({ name, classNames, ...props }: FieldErrorProps) {
  const { formState: { errors } } = useFormContext()
  const message = errors[name]?.message as string | undefined

  if (!message) return null

  return (
    <FormHelperText variant="error" classNames={classNames} {...props}>
      {message}
    </FormHelperText>
  )
}

FieldError.displayName = 'FieldError'
