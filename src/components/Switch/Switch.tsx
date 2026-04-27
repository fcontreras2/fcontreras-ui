import { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'

export interface SwitchClassNames {
  wrapper?: string
  track?: string
  thumb?: string
  label?: string
  helperText?: string
  errorText?: string
}

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  helperText?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  classNames?: SwitchClassNames
}

const sizeStyles: Record<NonNullable<SwitchProps['size']>, {
  track: string; thumb: string; thumbSize: number; thumbOffset: number; gap: number; label: string
}> = {
  sm: { track: 'h-4 w-7',  thumb: '', thumbSize: 12, thumbOffset: 2, gap: 16, label: 'text-xs' },
  md: { track: 'h-5 w-9',  thumb: '', thumbSize: 16, thumbOffset: 2, gap: 20, label: 'text-sm' },
  lg: { track: 'h-6 w-11', thumb: '', thumbSize: 20, thumbOffset: 2, gap: 24, label: 'text-base' },
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, helperText, error, size = 'md', classNames, className, id, checked, defaultChecked, onChange, ...props },
  ref,
) {
  const generatedId = useId()
  const switchId = id ?? generatedId
  const sizes = sizeStyles[size]

  // Use inline styles for the thumb to avoid Tailwind JIT purging dynamic translate classes
  const thumbStyle = {
    width:  sizes.thumbSize,
    height: sizes.thumbSize,
    top:    sizes.thumbOffset,
    left:   sizes.thumbOffset,
  }

  return (
    <div className={cn('flex flex-col gap-1', classNames?.wrapper)}>
      <label htmlFor={switchId} className="inline-flex items-start gap-2 cursor-pointer">
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
          {/* track */}
          <span
            className={cn(
              'block rounded-full transition-colors duration-200',
              'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
              error
                ? 'bg-danger-200 peer-checked:bg-danger-500 dark:bg-danger-900 dark:peer-checked:bg-danger-600'
                : 'bg-neutral-200 peer-checked:bg-primary-600 dark:bg-neutral-700 dark:peer-checked:bg-primary-500',
              sizes.track,
              classNames?.track,
            )}
          />
          {/* thumb — translated via CSS custom property set by peer */}
          <span
            style={thumbStyle}
            className={cn(
              'absolute rounded-full bg-white shadow-sm transition-transform duration-200',
              // peer-checked applies the translation equal to (track width - thumb size - 2*offset)
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
      {error ? (
        <p className={cn('text-xs text-danger-600 dark:text-danger-400', classNames?.errorText)}>{error}</p>
      ) : helperText ? (
        <p className={cn('text-xs text-neutral-500 dark:text-neutral-400', classNames?.helperText)}>{helperText}</p>
      ) : null}
    </div>
  )
})
