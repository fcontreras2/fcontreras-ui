import { useFormContext, Controller } from 'react-hook-form'
import { cn } from '../../../utils/cn'
import { RadioGroup, type RadioGroupProps } from '../../RadioGroup'
import { FieldError } from '../FieldError'
import { FieldHelpText } from '../FieldHelpText'
import { FieldLabel } from '../FieldLabel'

export interface FieldRadioGroupClassNames {
  fieldWrapper?: string
  root?: string
  group?: string
}

export interface FieldRadioGroupProps extends Omit<RadioGroupProps, 'isInvalid' | 'name' | 'value' | 'onChange'> {
  name: string
  label?: string
  translationKey?: string
  tooltip?: string
  required?: boolean
  helpText?: string
  helpTextTranslationKey?: string
  classNames?: FieldRadioGroupClassNames
}

export function FieldRadioGroup({
  name,
  label,
  translationKey,
  tooltip,
  required,
  helpText,
  helpTextTranslationKey,
  className,
  classNames,
  children,
  ...radioGroupProps
}: FieldRadioGroupProps) {
  const { control, formState: { errors } } = useFormContext()
  const isInvalid = !!errors[name]

  const { fieldWrapper: fieldWrapperClass, ...radioGroupClassNames } = classNames ?? {}

  return (
    <fieldset className={cn('col-span-2 lg:col-span-3 flex flex-col gap-1', className, fieldWrapperClass)}>
      <FieldLabel
        name={name}
        label={label}
        translationKey={translationKey}
        tooltip={tooltip}
        required={required}
      />
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            {...radioGroupProps}
            name={name}
            value={value}
            onChange={onChange}
            isInvalid={isInvalid}
            classNames={radioGroupClassNames}
          >
            {children}
          </RadioGroup>
        )}
      />
      <FieldHelpText name={name} text={helpText} translationKey={helpTextTranslationKey} />
      <FieldError name={name} />
    </fieldset>
  )
}

FieldRadioGroup.displayName = 'FieldRadioGroup'
