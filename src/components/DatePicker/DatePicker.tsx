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
            'bg-white text-gray-900 placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
            'transition-colors duration-150',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300 hover:border-gray-400',
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
