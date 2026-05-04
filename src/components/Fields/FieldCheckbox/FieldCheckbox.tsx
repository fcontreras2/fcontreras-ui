import { useFormContext } from 'react-hook-form'
import { cn } from '../../../utils/cn'
import { Checkbox, type CheckboxProps } from '../../Checkbox'
import { FieldError } from '../FieldError'
import { FieldHelpText } from '../FieldHelpText'

export interface FieldCheckboxClassNames {
  fieldWrapper?: string
  checkbox?: string
  label?: string
}

export interface FieldCheckboxProps extends Omit<CheckboxProps, 'isInvalid' | 'name'> {
  name: string
  helpText?: string
  helpTextTranslationKey?: string
  classNames?: FieldCheckboxClassNames
}

export function FieldCheckbox({
  name,
  helpText,
  helpTextTranslationKey,
  className,
  classNames,
  ...checkboxProps
}: FieldCheckboxProps) {
  const { register, formState: { errors } } = useFormContext()
  const isInvalid = !!errors[name]

  const { fieldWrapper: fieldWrapperClass, ...checkboxClassNames } = classNames ?? {}

  return (
    <div className={cn('col-span-2 lg:col-span-3 flex flex-col gap-1', className, fieldWrapperClass)}>
      <Checkbox
        id={name}
        {...checkboxProps}
        {...register(name)}
        isInvalid={isInvalid}
        classNames={checkboxClassNames}
      />
      <FieldHelpText name={name} text={helpText} translationKey={helpTextTranslationKey} />
      <FieldError name={name} />
    </div>
  )
}

FieldCheckbox.displayName = 'FieldCheckbox'
