import { cn } from '../../utils/cn'

export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'
export type ProgressSize = 'sm' | 'md' | 'lg'

export interface ProgressProps {
  value: number
  variant?: ProgressVariant
  size?: ProgressSize
  label?: boolean | string
  className?: string
}

const variantStyles: Record<ProgressVariant, string> = {
  default: 'bg-primary-600',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger:  'bg-danger-500',
  info:    'bg-info-500',
}

const sizeStyles: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export function Progress({
  value,
  variant = 'default',
  size = 'md',
  label,
  className,
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const labelText = typeof label === 'string' ? label : `${clamped}%`

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{labelText}</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={typeof label === 'string' ? label : undefined}
        className={cn('w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700', sizeStyles[size])}
      >
        <div
          style={{ width: `${clamped}%` }}
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantStyles[variant],
          )}
        />
      </div>
    </div>
  )
}
