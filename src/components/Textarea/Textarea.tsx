import { forwardRef, useId } from 'react'
import { cn } from '../../utils/cn'

export interface TextareaClassNames {
  wrapper?: string
  label?: string
  textarea?: string
  helperText?: string
  errorText?: string
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
  classNames?: TextareaClassNames
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helperText, error, fullWidth = false, classNames, className, id, ...props },
  ref,
) {
  const generatedId = useId()
  const textareaId = id ?? generatedId

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', classNames?.wrapper)}>
      {label && (
        <label
          htmlFor={textareaId}
          className={cn('text-sm font-medium text-gray-700', classNames?.label)}
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'w-full rounded-md border bg-white px-3 py-2 text-sm outline-none',
          'transition-colors duration-150 resize-y min-h-20',
          'placeholder:text-gray-400',
          'focus:ring-2 focus:ring-offset-0',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200',
          className,
          classNames?.textarea,
        )}
        {...props}
      />
      {error ? (
        <p className={cn('text-xs text-red-600', classNames?.errorText)}>{error}</p>
      ) : helperText ? (
        <p className={cn('text-xs text-gray-500', classNames?.helperText)}>{helperText}</p>
      ) : null}
    </div>
  )
})
