import { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { Spinner } from '../Spinner'

export interface ButtonClassNames {
  root?: string
  leftIcon?: string
  rightIcon?: string
  spinner?: string
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  classNames?: ButtonClassNames
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 border-transparent dark:bg-primary-500 dark:hover:bg-primary-400',
  secondary:
    'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500 border-transparent dark:bg-secondary-500 dark:hover:bg-secondary-400',
  danger:
    'bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-500 border-transparent dark:bg-danger-500 dark:hover:bg-danger-400',
  ghost:
    'bg-transparent text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-500 border-transparent dark:text-neutral-300 dark:hover:bg-neutral-800',
  outline:
    'bg-transparent text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500 border-primary-600 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-950',
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-6 text-base gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    classNames,
    children,
    disabled,
    className,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium border',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'transition-colors duration-150',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className,
        classNames?.root,
      )}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" className={cn('shrink-0', classNames?.spinner)} />
      ) : (
        leftIcon && (
          <span className={cn('shrink-0 inline-flex', classNames?.leftIcon)}>
            {leftIcon}
          </span>
        )
      )}
      {children}
      {!loading && rightIcon && (
        <span className={cn('shrink-0 inline-flex', classNames?.rightIcon)}>
          {rightIcon}
        </span>
      )}
    </button>
  )
})
