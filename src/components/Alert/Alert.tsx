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
    root: 'bg-gray-50 border-gray-200 text-gray-800',
    icon: 'text-gray-500',
    defaultIcon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  success: {
    root: 'bg-green-50 border-green-200 text-green-800',
    icon: 'text-green-500',
    defaultIcon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  warning: {
    root: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: 'text-yellow-500',
    defaultIcon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  danger: {
    root: 'bg-red-50 border-red-200 text-red-800',
    icon: 'text-red-500',
    defaultIcon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  info: {
    root: 'bg-primary-50 border-primary-200 text-primary-800',
    icon: 'text-primary-500',
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
