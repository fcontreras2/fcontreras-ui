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
          className={cn('text-sm font-medium text-gray-700', classNames?.label)}
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
              'rounded-md border bg-white min-h-9 text-sm transition-colors cursor-pointer',
              error
                ? cn('border-red-500', state.isFocused && 'ring-2 ring-red-200')
                : cn(
                    'border-gray-300',
                    state.isFocused && 'border-primary-500 ring-2 ring-primary-200',
                  ),
              selectClassNames?.control?.(state),
            ),
          menu: (state) =>
            cn(
              'mt-1 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden z-50',
              selectClassNames?.menu?.(state),
            ),
          menuList: (state) =>
            cn('py-1', selectClassNames?.menuList?.(state)),
          option: (state) =>
            cn(
              'px-3 py-2 text-sm cursor-pointer',
              state.isSelected
                ? 'bg-primary-600 text-white'
                : state.isFocused
                  ? 'bg-primary-50 text-gray-900'
                  : 'text-gray-900',
              selectClassNames?.option?.(state),
            ),
          placeholder: (state) =>
            cn('text-gray-400', selectClassNames?.placeholder?.(state)),
          singleValue: (state) =>
            cn('text-gray-900', selectClassNames?.singleValue?.(state)),
          multiValue: (state) =>
            cn('bg-primary-100 rounded mr-1', selectClassNames?.multiValue?.(state)),
          multiValueLabel: (state) =>
            cn('text-primary-800 text-sm px-2 py-0.5', selectClassNames?.multiValueLabel?.(state)),
          multiValueRemove: (state) =>
            cn(
              'text-primary-600 hover:bg-primary-200 hover:text-primary-800 rounded-r px-1',
              selectClassNames?.multiValueRemove?.(state),
            ),
          valueContainer: (state) =>
            cn('px-3 py-1.5 gap-1 flex-wrap', selectClassNames?.valueContainer?.(state)),
          indicatorsContainer: (state) =>
            cn('pr-2', selectClassNames?.indicatorsContainer?.(state)),
          clearIndicator: (state) =>
            cn(
              'text-gray-400 hover:text-gray-600 cursor-pointer p-1',
              selectClassNames?.clearIndicator?.(state),
            ),
          dropdownIndicator: (state) =>
            cn(
              'text-gray-400 hover:text-gray-600 cursor-pointer p-1',
              selectClassNames?.dropdownIndicator?.(state),
            ),
          indicatorSeparator: (state) =>
            cn('bg-gray-300 mx-1', selectClassNames?.indicatorSeparator?.(state)),
          noOptionsMessage: (state) =>
            cn(
              'text-sm text-gray-500 py-2 px-3 text-center',
              selectClassNames?.noOptionsMessage?.(state),
            ),
          loadingMessage: (state) =>
            cn(
              'text-sm text-gray-500 py-2 px-3 text-center',
              selectClassNames?.loadingMessage?.(state),
            ),
        }}
        {...props}
      />
      {error ? (
        <p className={cn('text-xs text-red-600', classNames?.errorText)}>{error}</p>
      ) : helperText ? (
        <p className={cn('text-xs text-gray-500', classNames?.helperText)}>{helperText}</p>
      ) : null}
    </div>
  )
}
