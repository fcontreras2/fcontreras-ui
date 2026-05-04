import { FormHelperText, type FormHelperTextClassNames, type FormHelperTextProps } from '../../FormHelperText'
import { useFieldsContext } from '../FieldsContext'
import { tryTranslate } from '../utils/tryTranslate'

export interface FieldHelpTextClassNames extends FormHelperTextClassNames {}

export interface FieldHelpTextProps extends Omit<FormHelperTextProps, 'variant' | 'children'> {
  name: string
  text?: string
  translationKey?: string
  classNames?: FieldHelpTextClassNames
}

export function FieldHelpText({ name, text, translationKey, classNames, ...props }: FieldHelpTextProps) {
  const { t } = useFieldsContext()

  const resolved = text ?? tryTranslate(t, translationKey ?? `form.helpTexts.${name}`, '')

  if (!resolved) return null

  return (
    <FormHelperText variant="default" classNames={classNames} {...props}>
      {resolved}
    </FormHelperText>
  )
}

FieldHelpText.displayName = 'FieldHelpText'
