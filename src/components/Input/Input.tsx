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
          className={cn('text-sm font-medium text-neutral-700 dark:text-neutral-300', classNames?.label)}
        >
          {label}
        </label>
      )}
      <div className={cn('relative flex items-center', classNames?.inputWrapper)}>
        {leftAddon && (
          <span
            className={cn(
              'absolute left-3 flex items-center text-neutral-500 dark:text-neutral-400 pointer-events-none',
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
            'w-full rounded-md border bg-white outline-none text-neutral-900',
            'dark:bg-neutral-900 dark:text-neutral-100',
            'transition-colors duration-150',
            'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
            'focus:ring-2 focus:ring-offset-0',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50 dark:disabled:bg-neutral-800',
            error
              ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-200 dark:border-danger-400 dark:focus:ring-danger-900'
              : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-200 dark:border-neutral-700 dark:focus:border-primary-400 dark:focus:ring-primary-900',
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
              'absolute right-3 flex items-center text-neutral-500 dark:text-neutral-400 pointer-events-none',
              classNames?.rightAddon,
            )}
          >
            {rightAddon}
          </span>
        )}
      </div>
      {error ? (
        <p className={cn('text-xs text-danger-600 dark:text-danger-400', classNames?.errorText)}>{error}</p>
      ) : helperText ? (
        <p className={cn('text-xs text-neutral-500 dark:text-neutral-400', classNames?.helperText)}>{helperText}</p>
      ) : null}
    </div>
  )
})
