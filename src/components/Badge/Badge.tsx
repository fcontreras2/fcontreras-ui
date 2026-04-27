import { cn } from '../../utils/cn'

export interface BadgeClassNames {
  root?: string
}

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
  classNames?: BadgeClassNames
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200',
  success: 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300',
  warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300',
  danger:  'bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-300',
  info:    'bg-info-100 text-info-700 dark:bg-info-900 dark:text-info-300',
}

const sizeStyles: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className,
  classNames,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className,
        classNames?.root,
      )}
    >
      {children}
    </span>
  )
}
