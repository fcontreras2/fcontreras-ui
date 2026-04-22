import { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'

export interface InputClassNames {
  wrapper?: string
  label?: string
  inputWrapper?: string
  input?: string
  leftAddon?: string
  rightAddon?: string
  helperText?: string
  errorText?: string
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  fullWidth?: boolean
  classNames?: InputClassNames
}

const sizeStyles: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-3 text-sm',
  lg: 'h-11 px-4 text-base',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helperText,
    error,
    size = 'md',
    leftAddon,
    rightAddon,
    fullWidth = false,
    classNames,
    className,
    id,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', classNames?.wrapper)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn('text-sm font-medium text-gray-700', classNames?.label)}
        >
          {label}
        </label>
      )}
      <div className={cn('relative flex items-center', classNames?.inputWrapper)}>
        {leftAddon && (
          <span
            className={cn(
              'absolute left-3 flex items-center text-gray-500 pointer-events-none',
              classNames?.leftAddon,
            )}
          >
            {leftAddon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-md border bg-white outline-none',
            'transition-colors duration-150',
            'placeholder:text-gray-400',
            'focus:ring-2 focus:ring-offset-0',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200',
            sizeStyles[size],
            leftAddon && 'pl-9',
            rightAddon && 'pr-9',
            className,
            classNames?.input,
          )}
          {...props}
        />
        {rightAddon && (
          <span
            className={cn(
              'absolute right-3 flex items-center text-gray-500 pointer-events-none',
              classNames?.rightAddon,
            )}
          >
            {rightAddon}
          </span>
        )}
      </div>
      {error ? (
        <p className={cn('text-xs text-red-600', classNames?.errorText)}>{error}</p>
      ) : helperText ? (
        <p className={cn('text-xs text-gray-500', classNames?.helperText)}>{helperText}</p>
      ) : null}
    </div>
  )
})
