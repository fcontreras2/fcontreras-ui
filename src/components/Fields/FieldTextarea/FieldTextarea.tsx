import { useFormContext } from 'react-hook-form'
import { cn } from '../../../utils/cn'
import { Textarea, type TextareaProps } from '../../Textarea'
import { FieldError } from '../FieldError'
import { FieldHelpText } from '../FieldHelpText'
import { FieldLabel } from '../FieldLabel'
import { useFieldsContext } from '../FieldsContext'
import { formatName } from '../utils/formatName'
import { tryTranslate } from '../utils/tryTranslate'

export interface FieldTextareaClassNames {
  fieldWrapper?: string
  textarea?: string
}

export interface FieldTextareaProps extends Omit<TextareaProps, 'isInvalid' | 'name'> {
  name: string
  label?: string
  translationKey?: string
  tooltip?: string
  required?: boolean
  helpText?: string
  helpTextTranslationKey?: string
  classNames?: FieldTextareaClassNames
}

export function FieldTextarea({
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
  ...textareaProps
}: FieldTextareaProps) {
  const { register, formState: { errors } } = useFormContext()
  const { t } = useFieldsContext()
  const isInvalid = !!errors[name]

  const resolvedPlaceholder = placeholder ?? tryTranslate(t, `form.placeholders.${name}`, formatName(name))

  const { fieldWrapper: fieldWrapperClass, ...textareaClassNames } = classNames ?? {}

  return (
    <div className={cn('col-span-2 lg:col-span-3 flex flex-col gap-1', className, fieldWrapperClass)}>
      <FieldLabel
        name={name}
        label={label}
        translationKey={translationKey}
        tooltip={tooltip}
        required={required}
      />
      <Textarea
        id={name}
        {...textareaProps}
        {...register(name)}
        isInvalid={isInvalid}
        placeholder={resolvedPlaceholder}
        classNames={textareaClassNames}
        fullWidth
      />
      <FieldHelpText name={name} text={helpText} translationKey={helpTextTranslationKey} />
      <FieldError name={name} />
    </div>
  )
}

FieldTextarea.displayName = 'FieldTextarea'
