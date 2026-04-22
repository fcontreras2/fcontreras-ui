import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

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
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 border-transparent',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500 border-transparent',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 border-transparent',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500 border-transparent',
  outline:
    'bg-transparent text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500 border-primary-600',
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
        <svg
          aria-hidden="true"
          className={cn('animate-spin size-4 shrink-0', classNames?.spinner)}
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            fill="currentColor"
          />
        </svg>
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
