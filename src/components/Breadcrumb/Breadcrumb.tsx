import { cn } from '../../utils/cn'

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

// ─── Default separator ────────────────────────────────────────────────────────

const ChevronRight = () => (
  <svg aria-hidden="true" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

export function Breadcrumb({
  items,
  separator,
  className,
  classNames,
}: BreadcrumbProps) {
  const sep = separator ?? <ChevronRight />

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
                  className={cn('font-medium text-gray-900 truncate', classNames?.current)}
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    'text-gray-500 hover:text-gray-700 transition-colors truncate',
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
                    'text-gray-500 hover:text-gray-700 transition-colors truncate',
                    classNames?.link,
                  )}
                >
                  {item.label}
                </button>
              )}
              {!isLast && (
                <span className={cn('text-gray-400 select-none', classNames?.separator)}>
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
