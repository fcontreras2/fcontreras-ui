import { createContext, forwardRef, useContext, useId } from 'react'
import { cn } from '../../utils/cn'

// ─── Context ──────────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  name: string
  value?: string
  onChange?: (value: string) => void
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RadioGroupClassNames {
  root?: string
  label?: string
  group?: string
  helperText?: string
  errorText?: string
}

export interface RadioGroupProps {
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  helperText?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'vertical' | 'horizontal'
  disabled?: boolean
  children: React.ReactNode
  className?: string
  classNames?: RadioGroupClassNames
}

export interface RadioClassNames {
  wrapper?: string
  radio?: string
  label?: string
}

export interface RadioProps {
  value: string
  label?: string
  disabled?: boolean
  className?: string
  classNames?: RadioClassNames
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const sizeStyles: Record<'sm' | 'md' | 'lg', { box: string; label: string }> = {
  sm: { box: 'size-3.5', label: 'text-xs' },
  md: { box: 'size-4',   label: 'text-sm' },
  lg: { box: 'size-5',   label: 'text-base' },
}

// ─── Radio ────────────────────────────────────────────────────────────────────

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, disabled, className, classNames },
  ref,
) {
  const ctx = useContext(RadioGroupContext)
  const id = useId()
  const size = ctx?.size ?? 'md'
  const sizes = sizeStyles[size]
  const isDisabled = disabled ?? ctx?.disabled

  const handleChange = () => ctx?.onChange?.(value)

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-start gap-2',
        isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        classNames?.wrapper,
      )}
    >
      <input
        ref={ref}
        id={id}
        type="radio"
        name={ctx?.name}
        value={value}
        checked={ctx?.value !== undefined ? ctx.value === value : undefined}
        disabled={isDisabled}
        onChange={handleChange}
        className={cn(
          'shrink-0 mt-0.5 cursor-pointer accent-primary-600',
          'disabled:cursor-not-allowed',
          ctx?.error ? 'accent-red-500' : 'accent-primary-600',
          sizes.box,
          className,
          classNames?.radio,
        )}
      />
      {label && (
        <span className={cn('text-gray-700 leading-snug', sizes.label, classNames?.label)}>
          {label}
        </span>
      )}
    </label>
  )
})

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export function RadioGroup({
  name,
  value,
  onChange,
  label,
  helperText,
  error,
  size = 'md',
  orientation = 'vertical',
  disabled,
  children,
  className,
  classNames,
}: RadioGroupProps) {
  const generatedName = useId()
  const groupName = name ?? generatedName

  return (
    <RadioGroupContext.Provider
      value={{ name: groupName, value, onChange, size, disabled, error: !!error }}
    >
      <fieldset className={cn('flex flex-col gap-1', className, classNames?.root)}>
        {label && (
          <legend className={cn('text-sm font-medium text-gray-700 mb-1', classNames?.label)}>
            {label}
          </legend>
        )}
        <div
          className={cn(
            orientation === 'horizontal' ? 'flex flex-wrap gap-x-4 gap-y-2' : 'flex flex-col gap-2',
            classNames?.group,
          )}
        >
          {children}
        </div>
        {error ? (
          <p className={cn('text-xs text-red-600 mt-0.5', classNames?.errorText)}>{error}</p>
        ) : helperText ? (
          <p className={cn('text-xs text-gray-500 mt-0.5', classNames?.helperText)}>{helperText}</p>
        ) : null}
      </fieldset>
    </RadioGroupContext.Provider>
  )
}
