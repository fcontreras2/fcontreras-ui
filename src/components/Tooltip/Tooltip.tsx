import { cloneElement, useId } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { cn } from '../../utils/cn'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content: React.ReactNode
  placement?: TooltipPlacement
  delayMs?: number
  children: React.ReactElement<Record<string, unknown>>
  className?: string
}

export function Tooltip({
  content,
  placement = 'top',
  delayMs = 300,
  children,
  className,
}: TooltipProps) {
  const id = useId()

  const trigger = cloneElement(children, {
    'data-tooltip-id': id,
    'data-tooltip-place': placement,
  })

  return (
    <>
      {trigger}
      <ReactTooltip
        id={id}
        delayShow={delayMs}
        className={cn(
          'rounded! px-2.5! py-1.5! text-xs! font-medium! bg-gray-900! text-white! shadow-lg!',
          className,
        )}
      >
        {content}
      </ReactTooltip>
    </>
  )
}
