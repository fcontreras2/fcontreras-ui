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
          className={cn('text-sm font-medium text-neutral-700 dark:text-neutral-300', classNames?.label)}
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'w-full rounded-md border bg-white px-3 py-2 text-sm outline-none text-neutral-900',
          'dark:bg-neutral-900 dark:text-neutral-100',
          'transition-colors duration-150 resize-y min-h-20',
          'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
          'focus:ring-2 focus:ring-offset-0',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50 dark:disabled:bg-neutral-800',
          error
            ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-200 dark:border-danger-400 dark:focus:ring-danger-900'
            : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-200 dark:border-neutral-700 dark:focus:border-primary-400 dark:focus:ring-primary-900',
          className,
          classNames?.textarea,
        )}
        {...props}
      />
      {error ? (
        <p className={cn('text-xs text-danger-600 dark:text-danger-400', classNames?.errorText)}>{error}</p>
      ) : helperText ? (
        <p className={cn('text-xs text-neutral-500 dark:text-neutral-400', classNames?.helperText)}>{helperText}</p>
      ) : null}
    </div>
  )
})
