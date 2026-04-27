import { ReactNode } from 'react'
import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { cn } from '../../utils/cn'

export interface PopoverClassNames {
  root?: string
  trigger?: string
  panel?: string
}

export interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
  classNames?: PopoverClassNames
}

export function Popover({
  trigger,
  children,
  align = 'left',
  className,
  classNames = {},
}: PopoverProps) {
  return (
    <HeadlessPopover
      as="div"
      className={cn(
        'relative inline-block',
        className,
        classNames.root,
      )}
    >
      <PopoverButton
        className={cn(
          'inline-flex items-center focus:outline-none',
          classNames.trigger,
        )}
      >
        {trigger}
      </PopoverButton>
      <PopoverPanel
        anchor={align === 'right' ? 'bottom end' : 'bottom start'}
        transition
        className={cn(
          'absolute z-50 bg-white dark:bg-neutral-900 rounded-lg shadow-lg',
          'border border-neutral-200 dark:border-neutral-700 p-4',
          'transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0',
          align === 'right' && 'origin-top-right',
          'origin-top-left',
          classNames.panel,
        )}
      >
        {children}
      </PopoverPanel>
    </HeadlessPopover>
  )
}
