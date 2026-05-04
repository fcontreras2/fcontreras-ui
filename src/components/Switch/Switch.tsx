import { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'

export interface SwitchClassNames {
  wrapper?: string
  track?: string
  thumb?: string
  label?: string
}

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  isInvalid?: boolean
  size?: 'sm' | 'md' | 'lg'
  classNames?: SwitchClassNames
}

const sizeStyles: Record<NonNullable<SwitchProps['size']>, {
  track: string; thumbSize: number; thumbOffset: number; label: string
}> = {
  sm: { track: 'h-4 w-7',  thumbSize: 12, thumbOffset: 2, label: 'text-xs' },
  md: { track: 'h-5 w-9',  thumbSize: 16, thumbOffset: 2, label: 'text-sm' },
  lg: { track: 'h-6 w-11', thumbSize: 20, thumbOffset: 2, label: 'text-base' },
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, isInvalid = false, size = 'md', classNames, className, id, checked, defaultChecked, onChange, ...props },
  ref,
) {
  const generatedId = useId()
  const switchId = id ?? generatedId
  const sizes = sizeStyles[size]

  // Inline styles for thumb to avoid Tailwind JIT purging dynamic translate classes
  const thumbStyle = {
    width:  sizes.thumbSize,
    height: sizes.thumbSize,
    top:    sizes.thumbOffset,
    left:   sizes.thumbOffset,
  }

  return (
    <label htmlFor={switchId} className={cn('inline-flex items-start gap-2 cursor-pointer', classNames?.wrapper)}>
      <span className="relative inline-flex shrink-0 mt-0.5">
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          className={cn('peer sr-only', className)}
          {...props}
        />
        <span
          className={cn(
            'block rounded-full transition-colors duration-200',
            'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
            isInvalid
              ? 'bg-danger-200 peer-checked:bg-danger-500 dark:bg-danger-900 dark:peer-checked:bg-danger-600'
              : 'bg-neutral-200 peer-checked:bg-primary-600 dark:bg-neutral-700 dark:peer-checked:bg-primary-500',
            sizes.track,
            classNames?.track,
          )}
        />
        <span
          style={thumbStyle}
          className={cn(
            'absolute rounded-full bg-white shadow-sm transition-transform duration-200',
            size === 'sm' && 'peer-checked:translate-x-3',
            size === 'md' && 'peer-checked:translate-x-4',
            size === 'lg' && 'peer-checked:translate-x-5',
            classNames?.thumb,
          )}
        />
      </span>
      {label && (
        <span className={cn('text-neutral-700 leading-snug dark:text-neutral-300', sizes.label, classNames?.label)}>
          {label}
        </span>
      )}
    </label>
  )
})

Switch.displayName = 'Switch'
