import { cn } from '../../utils/cn'
import { Icon } from '../Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc' | null

export interface TableColumn<T> {
  key: string
  header: React.ReactNode
  accessor: keyof T | ((row: T) => React.ReactNode)
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  className?: string
}

export interface TableClassNames {
  root?: string
  wrapper?: string
  table?: string
  thead?: string
  tbody?: string
  tr?: string
  th?: string
  td?: string
  emptyRow?: string
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  keyExtractor: (row: T, index: number) => string | number
  sortKey?: string
  sortDirection?: SortDirection
  onSort?: (key: string, direction: SortDirection) => void
  onRowClick?: (row: T) => void
  emptyText?: React.ReactNode
  loading?: boolean
  striped?: boolean
  bordered?: boolean
  size?: 'sm' | 'md' | 'lg'
  stickyHeader?: boolean
  className?: string
  classNames?: TableClassNames
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const sizeStyles: Record<'sm' | 'md' | 'lg', { th: string; td: string }> = {
  sm: { th: 'px-3 py-2 text-xs',  td: 'px-3 py-2 text-xs' },
  md: { th: 'px-4 py-3 text-xs',  td: 'px-4 py-3 text-sm' },
  lg: { th: 'px-5 py-4 text-sm',  td: 'px-5 py-4 text-sm' },
}

const alignStyles: Record<'left' | 'center' | 'right', string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === 'asc') return <Icon name="sort-asc" size="xs" className="ml-1 text-primary-600" />
  if (direction === 'desc') return <Icon name="sort-desc" size="xs" className="ml-1 text-primary-600" />
  return <Icon name="sort-asc" size="xs" className="ml-1 text-neutral-300 dark:text-neutral-600" />
}

// ─── Skeleton rows ────────────────────────────────────────────────────────────

function SkeletonRows({ cols, size }: { cols: number; size: 'sm' | 'md' | 'lg' }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className={sizeStyles[size].td}>
              <span className="block h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

// ─── Table ────────────────────────────────────────────────────────────────────

export function Table<T>({
  columns,
  data,
  keyExtractor,
  sortKey,
  sortDirection,
  onSort,
  onRowClick,
  emptyText = 'No data available',
  loading = false,
  striped = false,
  bordered = false,
  size = 'md',
  stickyHeader = false,
  className,
  classNames,
}: TableProps<T>) {
  const sizes = sizeStyles[size]

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable || !onSort) return
    if (sortKey !== col.key) return onSort(col.key, 'asc')
    if (sortDirection === 'asc') return onSort(col.key, 'desc')
    onSort(col.key, null)
  }

  const getCellValue = (row: T, col: TableColumn<T>): React.ReactNode => {
    if (typeof col.accessor === 'function') return col.accessor(row)
    return row[col.accessor] as React.ReactNode
  }

  return (
    <div
      className={cn(
        'w-full overflow-auto rounded-lg',
        bordered ? 'border border-neutral-200 dark:border-neutral-700' : '',
        className,
        classNames?.root,
      )}
    >
      <table
        className={cn('w-full border-collapse text-left', classNames?.table)}
      >
        <thead
          className={cn(
            'bg-neutral-50 border-b border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700',
            stickyHeader && 'sticky top-0 z-10',
            classNames?.thead,
          )}
        >
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                scope="col"
                style={{ width: col.width }}
                onClick={() => handleSort(col)}
                className={cn(
                  sizes.th,
                  'font-semibold text-neutral-600 uppercase tracking-wider select-none dark:text-neutral-400',
                  col.sortable && 'cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100',
                  col.align ? alignStyles[col.align] : 'text-left',
                  bordered && 'border-r border-neutral-200 last:border-r-0 dark:border-neutral-700',
                  col.className,
                  classNames?.th,
                )}
              >
                <span className="inline-flex items-center">
                  {col.header}
                  {col.sortable && (
                    <SortIcon direction={sortKey === col.key ? sortDirection ?? null : null} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn('divide-y divide-neutral-100 dark:divide-neutral-800', classNames?.tbody)}>
          {loading ? (
            <SkeletonRows cols={columns.length} size={size} />
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={cn(
                  sizes.td,
                  'text-center text-neutral-400 py-10',
                  classNames?.emptyRow,
                )}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={keyExtractor(row, index)}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'transition-colors',
                  striped && index % 2 === 1 && 'bg-neutral-50 dark:bg-neutral-800/50',
                  onRowClick && 'cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-950',
                  classNames?.tr,
                )}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={cn(
                      sizes.td,
                      'text-neutral-700 dark:text-neutral-300',
                      col.align ? alignStyles[col.align] : 'text-left',
                      bordered && 'border-r border-neutral-200 last:border-r-0 dark:border-neutral-700',
                      col.className,
                      classNames?.td,
                    )}
                  >
                    {getCellValue(row, col)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
