import { cn } from '../../utils/cn'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerLabelAlign = 'left' | 'center' | 'right'

export interface DividerProps {
  orientation?: DividerOrientation
  label?: React.ReactNode
  labelAlign?: DividerLabelAlign
  className?: string
}

const labelAlignStyles: Record<DividerLabelAlign, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

export function Divider({
  orientation = 'horizontal',
  label,
  labelAlign = 'center',
  className,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block self-stretch w-px bg-neutral-200 dark:bg-neutral-700 mx-2', className)}
      />
    )
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn('flex items-center gap-3 w-full', labelAlignStyles[labelAlign], className)}
      >
        {labelAlign !== 'left' && <span className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />}
        <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400 font-medium">{label}</span>
        {labelAlign !== 'right' && <span className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />}
      </div>
    )
  }

  return (
    <hr
      role="separator"
      className={cn('w-full border-none h-px bg-neutral-200 dark:bg-neutral-700', className)}
    />
  )
}
