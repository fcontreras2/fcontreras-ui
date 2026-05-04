import { useFormContext } from 'react-hook-form'
import { cn } from '../../../utils/cn'
import { Input, type InputProps } from '../../Input'
import { FieldError } from '../FieldError'
import { FieldHelpText } from '../FieldHelpText'
import { FieldLabel } from '../FieldLabel'
import { useFieldsContext } from '../FieldsContext'
import { formatName } from '../utils/formatName'
import { tryTranslate } from '../utils/tryTranslate'

export interface FieldInputClassNames {
  fieldWrapper?: string
  inputWrapper?: string
  input?: string
  leftAddon?: string
  rightAddon?: string
}

export interface FieldInputProps extends Omit<InputProps, 'isInvalid' | 'name'> {
  name: string
  label?: string
  translationKey?: string
  tooltip?: string
  required?: boolean
  helpText?: string
  helpTextTranslationKey?: string
  classNames?: FieldInputClassNames
}

export function FieldInput({
  name,
  label,
  translationKey,
  tooltip,
  required,
  helpText,
  helpTextTranslationKey,
  placeholder,
  className,
  classNames,
  ...inputProps
}: FieldInputProps) {
  const { register, formState: { errors } } = useFormContext()
  const { t } = useFieldsContext()
  const isInvalid = !!errors[name]

  const resolvedPlaceholder = placeholder ?? tryTranslate(t, `form.placeholders.${name}`, formatName(name))

  const { fieldWrapper: fieldWrapperClass, ...inputClassNames } = classNames ?? {}

  return (
    <div className={cn('col-span-2 lg:col-span-3 flex flex-col gap-1', className, fieldWrapperClass)}>
      <FieldLabel
        name={name}
        label={label}
        translationKey={translationKey}
        tooltip={tooltip}
        required={required}
      />
      <Input
        id={name}
        {...inputProps}
        {...register(name)}
        isInvalid={isInvalid}
        placeholder={resolvedPlaceholder}
        classNames={inputClassNames}
        fullWidth
      />
      <FieldHelpText name={name} text={helpText} translationKey={helpTextTranslationKey} />
      <FieldError name={name} />
    </div>
  )
}

FieldInput.displayName = 'FieldInput'
