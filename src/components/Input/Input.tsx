import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface InputClassNames {
  inputWrapper?: string
  input?: string
  leftAddon?: string
  rightAddon?: string
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  isInvalid?: boolean
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

const leftAddonPadding: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'pl-8',
  md: 'pl-9',
  lg: 'pl-10',
}

const rightAddonPadding: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'pr-8',
  md: 'pr-9',
  lg: 'pr-10',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    isInvalid = false,
    size = 'md',
    leftAddon,
    rightAddon,
    fullWidth = false,
    classNames,
    className,
    ...props
  },
  ref
) {
  return (
    <div className={cn('relative flex items-center', fullWidth && 'w-full', classNames?.inputWrapper)}>
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
        className={cn(
          'w-full rounded-md border bg-white outline-none text-neutral-900',
          'dark:bg-neutral-900 dark:text-neutral-100',
          'transition-colors duration-150',
          'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
          'focus:ring-2 focus:ring-offset-0',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50 dark:disabled:bg-neutral-800',
          isInvalid
            ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-200 dark:border-danger-400 dark:focus:ring-danger-900'
            : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-200 dark:border-neutral-700 dark:focus:border-primary-400 dark:focus:ring-primary-900',
          sizeStyles[size],
          leftAddon && leftAddonPadding[size],
          rightAddon && rightAddonPadding[size],
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
  )
})

Input.displayName = 'Input'
