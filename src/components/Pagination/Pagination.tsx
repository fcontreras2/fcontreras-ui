import { cn } from '../../utils/cn'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationClassNames {
  root?: string
  button?: string
  pageButton?: string
  info?: string
}

export interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
  siblings?: number
  showInfo?: boolean
  totalItems?: number
  pageSize?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  classNames?: PaginationClassNames
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-7 min-w-7 text-xs px-2',
  md: 'h-8 min-w-8 text-sm px-2.5',
  lg: 'h-10 min-w-10 text-sm px-3',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function buildPages(page: number, total: number, siblings: number): (number | '...')[] {
  const totalNumbers = siblings * 2 + 5 // siblings + first + last + current + 2 dots
  if (total <= totalNumbers) return getRange(1, total)

  const leftSibling  = Math.max(page - siblings, 2)
  const rightSibling = Math.min(page + siblings, total - 1)

  const showLeftDots  = leftSibling > 2
  const showRightDots = rightSibling < total - 1

  if (!showLeftDots && showRightDots)
    return [...getRange(1, 3 + siblings * 2), '...', total]

  if (showLeftDots && !showRightDots)
    return [1, '...', ...getRange(total - (2 + siblings * 2), total)]

  return [1, '...', ...getRange(leftSibling, rightSibling), '...', total]
}

// ─── Nav button ───────────────────────────────────────────────────────────────

function NavButton({
  onClick,
  disabled,
  size,
  className,
  children,
  'aria-label': ariaLabel,
}: {
  onClick: () => void
  disabled: boolean
  size: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
  'aria-label': string
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900',
        'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </button>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Pagination({
  page,
  totalPages,
  onChange,
  siblings = 1,
  showInfo = false,
  totalItems,
  pageSize,
  size = 'md',
  className,
  classNames,
}: PaginationProps) {
  const pages = buildPages(page, totalPages, siblings)

  const from = pageSize && totalItems ? (page - 1) * pageSize + 1 : null
  const to   = pageSize && totalItems ? Math.min(page * pageSize, totalItems) : null

  return (
    <div
      className={cn('flex flex-wrap items-center gap-2', className, classNames?.root)}
      role="navigation"
      aria-label="Pagination"
    >
      {/* Prev */}
      <NavButton
        aria-label="Previous page"
        disabled={page <= 1}
        size={size}
        onClick={() => onChange(page - 1)}
        className={classNames?.button}
      >
        <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavButton>

      {/* Pages */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`dots-${i}`}
            className={cn('inline-flex items-center justify-center text-neutral-400 dark:text-neutral-600', sizeStyles[size])}
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange(p)}
            className={cn(
              'inline-flex items-center justify-center rounded-md border transition-colors font-medium',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              p === page
                ? 'border-primary-600 bg-primary-600 text-white dark:border-primary-500 dark:bg-primary-500'
                : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800',
              sizeStyles[size],
              classNames?.pageButton,
            )}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <NavButton
        aria-label="Next page"
        disabled={page >= totalPages}
        size={size}
        onClick={() => onChange(page + 1)}
        className={classNames?.button}
      >
        <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavButton>

      {/* Info */}
      {showInfo && from && to && totalItems && (
        <span className={cn('text-xs text-neutral-500 dark:text-neutral-400 ml-1', classNames?.info)}>
          {from}–{to} of {totalItems}
        </span>
      )}
    </div>
  )
}
