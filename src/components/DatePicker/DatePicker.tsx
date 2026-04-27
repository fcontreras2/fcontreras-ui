import { forwardRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import { cn } from '../../utils/cn'
import { Label } from '../Label'
import { FormHelperText } from '../FormHelperText'

export interface DatePickerClassNames {
  root?: string
  label?: string
  wrapper?: string
  input?: string
  error?: string
  helperText?: string
}

export interface DatePickerProps {
  selected?: Date | null
  onChange?: (date: Date | null) => void
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  disabled?: boolean
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  dateFormat?: string
  selectsStart?: boolean
  selectsEnd?: boolean
  startDate?: Date | null
  endDate?: Date | null
  classNames?: DatePickerClassNames
  [key: string]: any
}

export const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>(function DatePicker(
  {
    label,
    error,
    helperText,
    fullWidth = false,
    classNames,
    selected,
    onChange,
    disabled,
    ...props
  },
  ref
) {

  return (
    <div
      className={cn(
        'flex flex-col gap-1.5',
        fullWidth && 'w-full',
        classNames?.root,
      )}
    >
      {label && (
        <Label
          error={!!error}
          classNames={{ root: classNames?.label }}
        >
          {label}
        </Label>
      )}

      <div
        className={cn(
          'relative',
          fullWidth && 'w-full',
          classNames?.wrapper,
        )}
      >
        <ReactDatePicker
          ref={ref}
          selected={selected}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            'w-full h-9 px-3 py-2 text-sm rounded-md border',
            'bg-white text-neutral-900 placeholder:text-neutral-400',
            'dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-600',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'transition-colors duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50 dark:disabled:bg-neutral-800',
            error
              ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-200 dark:border-danger-400 dark:focus:ring-danger-900'
              : 'border-neutral-300 hover:border-neutral-400 focus:border-primary-500 focus:ring-primary-200 dark:border-neutral-700 dark:hover:border-neutral-500 dark:focus:border-primary-400 dark:focus:ring-primary-900',
            classNames?.input,
          )}
          popperClassName="!w-80"
          calendarClassName="react-datepicker-custom"
          {...props}
        />
      </div>

      {error && (
        <FormHelperText
          variant="error"
          classNames={{ root: classNames?.error }}
        >
          {error}
        </FormHelperText>
      )}

      {helperText && !error && (
        <FormHelperText
          variant="default"
          classNames={{ root: classNames?.helperText }}
        >
          {helperText}
        </FormHelperText>
      )}
    </div>
  )
})

DatePicker.displayName = 'DatePicker'
