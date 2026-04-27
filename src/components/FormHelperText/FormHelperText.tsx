import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface FormHelperTextClassNames {
  root?: string
}

export interface FormHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'error' | 'success' | 'warning'
  classNames?: FormHelperTextClassNames
}

export const FormHelperText = forwardRef<HTMLParagraphElement, FormHelperTextProps>(
  function FormHelperText(
    {
      variant = 'default',
      classNames,
      className,
      children,
      ...props
    },
    ref
  ) {
    const variantStyles: Record<NonNullable<FormHelperTextProps['variant']>, string> = {
      default: 'text-neutral-500 dark:text-neutral-400',
      error: 'text-danger-600 font-medium dark:text-danger-400',
      success: 'text-success-600 font-medium dark:text-success-400',
      warning: 'text-warning-600 font-medium dark:text-warning-400',
    }

    return (
      <p
        ref={ref}
        className={cn(
          'text-sm',
          variantStyles[variant],
          className,
          classNames?.root,
        )}
        {...props}
      >
        {children}
      </p>
    )
  }
)

FormHelperText.displayName = 'FormHelperText'
