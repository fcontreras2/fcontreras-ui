import { useFormContext } from 'react-hook-form'
import { cn } from '../../../utils/cn'
import { Switch, type SwitchProps } from '../../Switch'
import { FieldError } from '../FieldError'
import { FieldHelpText } from '../FieldHelpText'

export interface FieldSwitchClassNames {
  fieldWrapper?: string
  track?: string
  thumb?: string
  label?: string
}

export interface FieldSwitchProps extends Omit<SwitchProps, 'isInvalid' | 'name'> {
  name: string
  helpText?: string
  helpTextTranslationKey?: string
  classNames?: FieldSwitchClassNames
}

export function FieldSwitch({
  name,
  helpText,
  helpTextTranslationKey,
  className,
  classNames,
  ...switchProps
}: FieldSwitchProps) {
  const { register, formState: { errors } } = useFormContext()
  const isInvalid = !!errors[name]

  const { fieldWrapper: fieldWrapperClass, ...switchClassNames } = classNames ?? {}

  return (
    <div className={cn('col-span-2 lg:col-span-3 flex flex-col gap-1', className, fieldWrapperClass)}>
      <Switch
        id={name}
        {...switchProps}
        {...register(name)}
        isInvalid={isInvalid}
        classNames={switchClassNames}
      />
      <FieldHelpText name={name} text={helpText} translationKey={helpTextTranslationKey} />
      <FieldError name={name} />
    </div>
  )
}

FieldSwitch.displayName = 'FieldSwitch'
