import { useFormContext } from 'react-hook-form'
import { Icon } from '../../Icon'
import { Label, type LabelClassNames, type LabelProps } from '../../Label'
import { Tooltip } from '../../Tooltip'
import { useFieldsContext } from '../FieldsContext'
import { tryTranslate } from '../utils/tryTranslate'
import { formatName } from '../utils/formatName'
import { cn } from '../../../utils/cn'

export interface FieldLabelClassNames extends LabelClassNames {
  tooltip?: string
}

export interface FieldLabelProps extends Omit<LabelProps, 'error' | 'children'> {
  name: string
  label?: string
  translationKey?: string
  tooltip?: string
  required?: boolean
  classNames?: FieldLabelClassNames
}

export function FieldLabel({
  name,
  label,
  translationKey,
  tooltip,
  required,
  classNames,
  ...labelProps
}: FieldLabelProps) {
  const { formState: { errors } } = useFormContext()
  const { t } = useFieldsContext()
  const hasError = !!errors[name]

  const resolvedLabel = label ?? tryTranslate(t, translationKey ?? `form.fields.${name}`, formatName(name))
  const resolvedTooltip = tooltip ?? (t ? tryTranslate(t, `form.tooltips.${name}`, '') || undefined : undefined)

  return (
    <Label
      htmlFor={name}
      required={required}
      error={hasError}
      classNames={{ root: cn('flex flec-col items-center gap-1',classNames?.root) }}
      {...labelProps}
    >
      {resolvedLabel}
        {resolvedTooltip && (
        <Tooltip content={resolvedTooltip} placement="top">
          <span className={classNames?.tooltip ?? 'ml-1 cursor-help text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'}>
            <Icon name="help-circle" size="xs" />
          </span>
        </Tooltip>
      )}
    </Label>
  )
}

FieldLabel.displayName = 'FieldLabel'
