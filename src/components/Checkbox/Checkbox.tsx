import { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'

export interface CheckboxClassNames {
  wrapper?: string
  checkbox?: string
  label?: string
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  isInvalid?: boolean
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
  { label, isInvalid = false, size = 'md', indeterminate, classNames, className, id, ...props },
  ref,
) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const sizes = sizeStyles[size]

  return (
    <label htmlFor={checkboxId} className={cn('inline-flex items-start gap-2 cursor-pointer', classNames?.wrapper)}>
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        data-indeterminate={indeterminate}
        className={cn(
          'rounded border transition-colors duration-150 cursor-pointer shrink-0 mt-0.5',
          'accent-primary-600',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isInvalid ? 'border-danger-500 dark:border-danger-400' : 'border-neutral-300 dark:border-neutral-600',
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
  )
})

Checkbox.displayName = 'Checkbox'
