import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'

export interface FieldsGridClassNames {
  root?: string
}

export interface FieldsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 2 | 4 | 6
  classNames?: FieldsGridClassNames
}

const colsStyles: Record<NonNullable<FieldsGridProps['cols']>, string> = {
  2: 'grid-cols-2',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
}

export const FieldsGrid = forwardRef<HTMLDivElement, FieldsGridProps>(
  function FieldsGrid({ cols = 4, classNames, className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('grid lg:grid-cols-6 gap-4', colsStyles[cols], className, classNames?.root)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FieldsGrid.displayName = 'FieldsGrid'
