import { useId } from 'react'
import ReactSelect, { type Props as ReactSelectProps, type GroupBase } from 'react-select'
import { cn } from '../../utils/cn'
import type React from 'react'

export type { SingleValue, MultiValue, ActionMeta } from 'react-select'

export interface SelectOption {
  label: string
  value: string | number
}

export interface SelectClassNames {
  wrapper?: string
  leftIcon?: string
}

export interface SelectProps<
  Option = SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<ReactSelectProps<Option, IsMulti, Group>, 'unstyled' | 'classNames'> {
  isInvalid?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  classNames?: SelectClassNames
  selectClassNames?: ReactSelectProps<Option, IsMulti, Group>['classNames']
}

export function Select<
  Option = SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  isInvalid = false,
  fullWidth = false,
  leftIcon,
  classNames,
  selectClassNames,
  inputId,
  ...props
}: SelectProps<Option, IsMulti, Group>) {
  const generatedId = useId()
  const id = inputId ?? generatedId

  return (
    <div className={cn('relative', fullWidth && 'w-full', classNames?.wrapper)}>
      {leftIcon && (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center text-neutral-500 dark:text-neutral-400',
            classNames?.leftIcon,
          )}
        >
          {leftIcon}
        </span>
      )}
      <ReactSelect<Option, IsMulti, Group>
        inputId={id}
        unstyled
        classNames={{
          control: (state) =>
            cn(
              'rounded-md border bg-white min-h-9 text-sm transition-colors cursor-pointer text-neutral-900',
              'dark:bg-neutral-900 dark:text-neutral-100',
              isInvalid
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
          menuList: (state) => cn('py-1', selectClassNames?.menuList?.(state)),
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
            cn('px-3 py-1.5 gap-1 flex-wrap', leftIcon && 'pl-9', selectClassNames?.valueContainer?.(state)),
          indicatorsContainer: (state) => cn('pr-2', selectClassNames?.indicatorsContainer?.(state)),
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
    </div>
  )
}

Select.displayName = 'Select'
