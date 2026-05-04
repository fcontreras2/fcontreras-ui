import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface TextareaClassNames {
  textarea?: string
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean
  fullWidth?: boolean
  classNames?: TextareaClassNames
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { isInvalid = false, fullWidth = false, classNames, className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'rounded-md border bg-white px-3 py-2 text-sm outline-none text-neutral-900',
        'dark:bg-neutral-900 dark:text-neutral-100',
        'transition-colors duration-150 resize-y min-h-20',
        'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
        'focus:ring-2 focus:ring-offset-0',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50 dark:disabled:bg-neutral-800',
        isInvalid
          ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-200 dark:border-danger-400 dark:focus:ring-danger-900'
          : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-200 dark:border-neutral-700 dark:focus:border-primary-400 dark:focus:ring-primary-900',
        fullWidth && 'w-full',
        className,
        classNames?.textarea,
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'
