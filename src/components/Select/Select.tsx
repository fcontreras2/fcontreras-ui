import { useId } from 'react'
import ReactSelect, { type Props as ReactSelectProps, type GroupBase } from 'react-select'
import { cn } from '../../utils/cn'

export type { SingleValue, MultiValue, ActionMeta } from 'react-select'

export interface SelectOption {
  label: string
  value: string | number
}

export interface SelectClassNames {
  wrapper?: string
  label?: string
  errorText?: string
  helperText?: string
}

export interface SelectProps<
  Option = SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<ReactSelectProps<Option, IsMulti, Group>, 'unstyled' | 'classNames'> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  classNames?: SelectClassNames
  selectClassNames?: ReactSelectProps<Option, IsMulti, Group>['classNames']
}

export function Select<
  Option = SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  label,
  error,
  helperText,
  fullWidth = false,
  classNames,
  selectClassNames,
  inputId,
  ...props
}: SelectProps<Option, IsMulti, Group>) {
  const generatedId = useId()
  const id = inputId ?? generatedId

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', classNames?.wrapper)}>
      {label && (
        <label
          htmlFor={id}
          className={cn('text-sm font-medium text-neutral-700 dark:text-neutral-300', classNames?.label)}
        >
          {label}
        </label>
      )}
      <ReactSelect<Option, IsMulti, Group>
        inputId={id}
        unstyled
        classNames={{
          control: (state) =>
            cn(
              'rounded-md border bg-white min-h-9 text-sm transition-colors cursor-pointer text-neutral-900',
              'dark:bg-neutral-900 dark:text-neutral-100',
              error
                ? cn('border-danger-500', state.isFocused && 'ring-2 ring-danger-200 dark:ring-danger-900')
                : cn(
                    'border-neutral-300 dark:border-neutral-700',
                    state.isFocused && 'border-primary-500 ring-2 ring-primary-200 dark:border-primary-400 dark:ring-primary-900',
                  ),
              selectClassNames?.control?.(state),
            ),
          menu: (state) =>
            cn(
              'mt-1 rounded-md border border-neutral-200 bg-white shadow-lg overflow-hidden z-50',
              'dark:border-neutral-700 dark:bg-neutral-900',
              selectClassNames?.menu?.(state),
            ),
          menuList: (state) =>
            cn('py-1', selectClassNames?.menuList?.(state)),
          option: (state) =>
            cn(
              'px-3 py-2 text-sm cursor-pointer',
              state.isSelected
                ? 'bg-primary-600 text-white dark:bg-primary-500'
                : state.isFocused
                  ? 'bg-primary-50 text-neutral-900 dark:bg-primary-950 dark:text-neutral-100'
                  : 'text-neutral-900 dark:text-neutral-100',
              selectClassNames?.option?.(state),
            ),
          placeholder: (state) =>
            cn('text-neutral-400 dark:text-neutral-600', selectClassNames?.placeholder?.(state)),
          singleValue: (state) =>
            cn('text-neutral-900 dark:text-neutral-100', selectClassNames?.singleValue?.(state)),
          multiValue: (state) =>
            cn('bg-primary-100 rounded mr-1 dark:bg-primary-900', selectClassNames?.multiValue?.(state)),
          multiValueLabel: (state) =>
            cn('text-primary-800 text-sm px-2 py-0.5 dark:text-primary-200', selectClassNames?.multiValueLabel?.(state)),
          multiValueRemove: (state) =>
            cn(
              'text-primary-600 hover:bg-primary-200 hover:text-primary-800 rounded-r px-1',
              'dark:text-primary-400 dark:hover:bg-primary-800 dark:hover:text-primary-200',
              selectClassNames?.multiValueRemove?.(state),
            ),
          valueContainer: (state) =>
            cn('px-3 py-1.5 gap-1 flex-wrap', selectClassNames?.valueContainer?.(state)),
          indicatorsContainer: (state) =>
            cn('pr-2', selectClassNames?.indicatorsContainer?.(state)),
          clearIndicator: (state) =>
            cn(
              'text-neutral-400 hover:text-neutral-600 cursor-pointer p-1 dark:text-neutral-500 dark:hover:text-neutral-300',
              selectClassNames?.clearIndicator?.(state),
            ),
          dropdownIndicator: (state) =>
            cn(
              'text-neutral-400 hover:text-neutral-600 cursor-pointer p-1 dark:text-neutral-500 dark:hover:text-neutral-300',
              selectClassNames?.dropdownIndicator?.(state),
            ),
          indicatorSeparator: (state) =>
            cn('bg-neutral-300 mx-1 dark:bg-neutral-700', selectClassNames?.indicatorSeparator?.(state)),
          noOptionsMessage: (state) =>
            cn(
              'text-sm text-neutral-500 py-2 px-3 text-center dark:text-neutral-400',
              selectClassNames?.noOptionsMessage?.(state),
            ),
          loadingMessage: (state) =>
            cn(
              'text-sm text-neutral-500 py-2 px-3 text-center dark:text-neutral-400',
              selectClassNames?.loadingMessage?.(state),
            ),
        }}
        {...props}
      />
      {error ? (
        <p className={cn('text-xs text-danger-600 dark:text-danger-400', classNames?.errorText)}>{error}</p>
      ) : helperText ? (
        <p className={cn('text-xs text-neutral-500 dark:text-neutral-400', classNames?.helperText)}>{helperText}</p>
      ) : null}
    </div>
  )
}
