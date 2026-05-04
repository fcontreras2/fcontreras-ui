import { cn } from '../../utils/cn'
import { Icon } from '../Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: React.ReactNode
  href?: string
  onClick?: () => void
}

export interface BreadcrumbClassNames {
  root?: string
  list?: string
  item?: string
  link?: string
  current?: string
  separator?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
  classNames?: BreadcrumbClassNames
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Breadcrumb({
  items,
  separator,
  className,
  classNames,
}: BreadcrumbProps) {
  const sep = separator ?? <Icon name="chevron-right" size="sm" weight="bold" />

  return (
    <nav aria-label="Breadcrumb" className={cn(className, classNames?.root)}>
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm', classNames?.list)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={index}
              className={cn('flex items-center gap-1.5', classNames?.item)}
            >
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn('font-medium text-neutral-900 dark:text-neutral-100 truncate', classNames?.current)}
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors truncate',
                    classNames?.link,
                  )}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={cn(
                    'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors truncate',
                    classNames?.link,
                  )}
                >
                  {item.label}
                </button>
              )}
              {!isLast && (
                <span className={cn('text-neutral-400 dark:text-neutral-600 select-none', classNames?.separator)}>
                  {sep}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
