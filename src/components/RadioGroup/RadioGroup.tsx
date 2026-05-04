import { createContext, forwardRef, useContext, useId } from 'react'
import { cn } from '../../utils/cn'

// ─── Context ──────────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  name: string
  value?: string
  onChange?: (value: string) => void
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  isInvalid?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RadioGroupClassNames {
  root?: string
  group?: string
}

export interface RadioGroupProps {
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  isInvalid?: boolean
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
          'shrink-0 mt-0.5 cursor-pointer',
          'disabled:cursor-not-allowed',
          ctx?.isInvalid ? 'accent-danger-500' : 'accent-primary-600',
          sizes.box,
          className,
          classNames?.radio,
        )}
      />
      {label && (
        <span className={cn('text-neutral-700 leading-snug dark:text-neutral-300', sizes.label, classNames?.label)}>
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
  isInvalid = false,
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
      value={{ name: groupName, value, onChange, size, disabled, isInvalid }}
    >
      <div
        role="radiogroup"
        className={cn(
          orientation === 'horizontal' ? 'flex flex-wrap gap-x-4 gap-y-2' : 'flex flex-col gap-2',
          className,
          classNames?.root,
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

RadioGroup.displayName = 'RadioGroup'
