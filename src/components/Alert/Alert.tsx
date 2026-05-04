import { cn } from '../../utils/cn'
import { Icon, type IconName } from '../Icon'

export interface AlertClassNames {
  root?: string
  icon?: string
  content?: string
  title?: string
  description?: string
  closeButton?: string
}

export interface AlertProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  title?: string
  description?: React.ReactNode
  icon?: React.ReactNode
  onClose?: () => void
  className?: string
  classNames?: AlertClassNames
}

const variantStyles: Record<NonNullable<AlertProps['variant']>, {
  root: string; icon: string; defaultIcon: IconName
}> = {
  default: {
    root: 'bg-neutral-50 border-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200',
    icon: 'text-neutral-500 dark:text-neutral-400',
    defaultIcon: 'info',
  },
  success: {
    root: 'bg-success-50 border-success-200 text-success-800 dark:bg-success-950 dark:border-success-800 dark:text-success-300',
    icon: 'text-success-500 dark:text-success-400',
    defaultIcon: 'check',
  },
  warning: {
    root: 'bg-warning-50 border-warning-200 text-warning-800 dark:bg-warning-950 dark:border-warning-800 dark:text-warning-300',
    icon: 'text-warning-500 dark:text-warning-400',
    defaultIcon: 'warning',
  },
  danger: {
    root: 'bg-danger-50 border-danger-200 text-danger-800 dark:bg-danger-950 dark:border-danger-800 dark:text-danger-300',
    icon: 'text-danger-500 dark:text-danger-400',
    defaultIcon: 'alert-circle',
  },
  info: {
    root: 'bg-info-50 border-info-200 text-info-800 dark:bg-info-950 dark:border-info-800 dark:text-info-300',
    icon: 'text-info-500 dark:text-info-400',
    defaultIcon: 'info',
  },
}

export function Alert({
  variant = 'default',
  title,
  description,
  icon,
  onClose,
  className,
  classNames,
}: AlertProps) {
  const styles = variantStyles[variant]

  const renderedIcon = icon ?? (
    <Icon name={styles.defaultIcon} size="md" variant="outline" weight="bold" />
  )

  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-md border p-4',
        styles.root,
        className,
        classNames?.root,
      )}
    >
      <span className={cn('mt-0.5 shrink-0', styles.icon, classNames?.icon)}>
        {renderedIcon}
      </span>
      <div className={cn('flex-1 min-w-0', classNames?.content)}>
        {title && (
          <p className={cn('text-sm font-semibold', classNames?.title)}>{title}</p>
        )}
        {description && (
          <p className={cn('text-sm', title && 'mt-1', classNames?.description)}>
            {description}
          </p>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className={cn(
            'shrink-0 rounded p-0.5 -mt-0.5 -mr-0.5 opacity-60 hover:opacity-100 transition-opacity',
            classNames?.closeButton,
          )}
        >
          <Icon name="x" size="sm" weight="bold" />
        </button>
      )}
    </div>
  )
}
