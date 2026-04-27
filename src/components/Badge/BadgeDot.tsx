import { cn } from '../../utils/cn'

export interface BadgeDotClassNames {
  root?: string
  dot?: string
  label?: string
}

export interface BadgeDotProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  label?: string
  className?: string
  classNames?: BadgeDotClassNames
}

const variantStyles: Record<NonNullable<BadgeDotProps['variant']>, string> = {
  default: 'bg-neutral-400',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger:  'bg-danger-500',
  info:    'bg-info-500',
}

const labelColorStyles: Record<NonNullable<BadgeDotProps['variant']>, string> = {
  default: 'text-neutral-600 dark:text-neutral-400',
  success: 'text-success-700 dark:text-success-400',
  warning: 'text-warning-700 dark:text-warning-400',
  danger:  'text-danger-700 dark:text-danger-400',
  info:    'text-info-700 dark:text-info-400',
}

const sizeStyles: Record<NonNullable<BadgeDotProps['size']>, { dot: string; text: string; gap: string }> = {
  sm: { dot: 'size-1.5', text: 'text-xs', gap: 'gap-1.5' },
  md: { dot: 'size-2',   text: 'text-sm', gap: 'gap-2'   },
  lg: { dot: 'size-2.5', text: 'text-sm', gap: 'gap-2'   },
}

export function BadgeDot({
  variant = 'default',
  size = 'md',
  pulse = false,
  label,
  className,
  classNames,
}: BadgeDotProps) {
  const sizes = sizeStyles[size]

  return (
    <span
      role="status"
      className={cn(
        'inline-flex items-center',
        sizes.gap,
        className,
        classNames?.root,
      )}
    >
      {/* dot */}
      <span className={cn('relative inline-flex shrink-0', sizes.dot)}>
        {pulse && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
              variantStyles[variant],
            )}
          />
        )}
        <span
          className={cn(
            'relative inline-flex rounded-full',
            variantStyles[variant],
            sizes.dot,
            classNames?.dot,
          )}
        />
      </span>

      {/* label */}
      {label && (
        <span
          className={cn(
            'font-medium leading-none',
            sizes.text,
            labelColorStyles[variant],
            classNames?.label,
          )}
        >
          {label}
        </span>
      )}
    </span>
  )
}
