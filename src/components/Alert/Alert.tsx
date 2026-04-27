import { cn } from '../../utils/cn'

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
  root: string; icon: string; defaultIcon: string
}> = {
  default: {
    root: 'bg-neutral-50 border-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200',
    icon: 'text-neutral-500 dark:text-neutral-400',
    defaultIcon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  success: {
    root: 'bg-success-50 border-success-200 text-success-800 dark:bg-success-950 dark:border-success-800 dark:text-success-300',
    icon: 'text-success-500 dark:text-success-400',
    defaultIcon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  warning: {
    root: 'bg-warning-50 border-warning-200 text-warning-800 dark:bg-warning-950 dark:border-warning-800 dark:text-warning-300',
    icon: 'text-warning-500 dark:text-warning-400',
    defaultIcon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  danger: {
    root: 'bg-danger-50 border-danger-200 text-danger-800 dark:bg-danger-950 dark:border-danger-800 dark:text-danger-300',
    icon: 'text-danger-500 dark:text-danger-400',
    defaultIcon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  info: {
    root: 'bg-info-50 border-info-200 text-info-800 dark:bg-info-950 dark:border-info-800 dark:text-info-300',
    icon: 'text-info-500 dark:text-info-400',
    defaultIcon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
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
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={styles.defaultIcon} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
          <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
