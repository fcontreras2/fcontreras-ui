import { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'

export interface CheckboxClassNames {
  wrapper?: string
  checkbox?: string
  label?: string
  helperText?: string
  errorText?: string
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  helperText?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  indeterminate?: boolean
  classNames?: CheckboxClassNames
}

const sizeStyles: Record<NonNullable<CheckboxProps['size']>, { box: string; label: string }> = {
  sm: { box: 'size-3.5', label: 'text-xs' },
  md: { box: 'size-4', label: 'text-sm' },
  lg: { box: 'size-5', label: 'text-base' },
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, helperText, error, size = 'md', indeterminate, classNames, className, id, ...props },
  ref,
) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const sizes = sizeStyles[size]

  return (
    <div className={cn('flex flex-col gap-1', classNames?.wrapper)}>
      <label htmlFor={checkboxId} className="inline-flex items-start gap-2 cursor-pointer">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          data-indeterminate={indeterminate}
          className={cn(
            'rounded border transition-colors duration-150 cursor-pointer shrink-0 mt-0.5',
            'accent-primary-600',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error ? 'border-danger-500 dark:border-danger-400' : 'border-neutral-300 dark:border-neutral-600',
            sizes.box,
            className,
            classNames?.checkbox,
          )}
          {...props}
        />
        {label && (
          <span className={cn('text-neutral-700 leading-snug dark:text-neutral-300', sizes.label, classNames?.label)}>
            {label}
          </span>
        )}
      </label>
      {error ? (
        <p className={cn('text-xs text-danger-600 dark:text-danger-400 ml-6', classNames?.errorText)}>{error}</p>
      ) : helperText ? (
        <p className={cn('text-xs text-neutral-500 dark:text-neutral-400 ml-6', classNames?.helperText)}>{helperText}</p>
      ) : null}
    </div>
  )
})
