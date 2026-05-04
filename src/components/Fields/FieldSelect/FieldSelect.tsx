import { useFormContext, Controller } from 'react-hook-form'
import { type GroupBase } from 'react-select'
import { cn } from '../../../utils/cn'
import { Select, type SelectOption, type SelectProps } from '../../Select'
import { FieldError } from '../FieldError'
import { FieldHelpText } from '../FieldHelpText'
import { FieldLabel } from '../FieldLabel'

export interface FieldSelectClassNames {
  fieldWrapper?: string
  selectWrapper?: string
}

export interface FieldSelectProps<
  Option = SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<SelectProps<Option, IsMulti, Group>, 'isInvalid' | 'name' | 'value' | 'onChange' | 'classNames' | 'fullWidth'> {
  name: string
  label?: string
  translationKey?: string
  tooltip?: string
  required?: boolean
  helpText?: string
  helpTextTranslationKey?: string
  classNames?: FieldSelectClassNames
}

export function FieldSelect<
  Option = SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  name,
  label,
  translationKey,
  tooltip,
  required,
  helpText,
  helpTextTranslationKey,
  className,
  classNames,
  ...selectProps
}: FieldSelectProps<Option, IsMulti, Group>) {
  const { control, formState: { errors } } = useFormContext()
  const isInvalid = !!errors[name]

  const { fieldWrapper: fieldWrapperClass, selectWrapper } = classNames ?? {}

  return (
    <div className={cn('col-span-2 lg:col-span-3 flex flex-col gap-1', className, fieldWrapperClass)}>
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
          <Select<Option, IsMulti, Group>
            {...selectProps}
            inputId={name}
            value={value}
            onChange={onChange}
            isInvalid={isInvalid}
            classNames={{ wrapper: selectWrapper }}
            fullWidth
          />
        )}
      />
      <FieldHelpText name={name} text={helpText} translationKey={helpTextTranslationKey} />
      <FieldError name={name} />
    </div>
  )
}

FieldSelect.displayName = 'FieldSelect'
