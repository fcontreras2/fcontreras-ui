import { cn } from '../../utils/cn'

export interface CardClassNames {
  root?: string
  header?: string
  title?: string
  description?: string
  body?: string
  footer?: string
}

export interface CardProps {
  title?: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  classNames?: CardClassNames
}

const shadowStyles: Record<NonNullable<CardProps['shadow']>, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
}

export function Card({
  title,
  description,
  footer,
  children,
  shadow = 'sm',
  padding = 'md',
  className,
  classNames,
}: CardProps) {
  const hasHeader = title || description

  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white',
        shadowStyles[shadow],
        className,
        classNames?.root,
      )}
    >
      {hasHeader && (
        <div
          className={cn(
            paddingStyles[padding],
            children && 'border-b border-gray-200',
            classNames?.header,
          )}
        >
          {title && (
            <p className={cn('text-base font-semibold text-gray-900', classNames?.title)}>
              {title}
            </p>
          )}
          {description && (
            <p className={cn('text-sm text-gray-500', title && 'mt-1', classNames?.description)}>
              {description}
            </p>
          )}
        </div>
      )}
      {children && (
        <div className={cn(paddingStyles[padding], classNames?.body)}>{children}</div>
      )}
      {footer && (
        <div
          className={cn(
            paddingStyles[padding],
            'border-t border-gray-200 bg-gray-50 rounded-b-lg',
            classNames?.footer,
          )}
        >
          {footer}
        </div>
      )}
    </div>
  )
}
