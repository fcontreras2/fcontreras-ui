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
      default: 'text-gray-500',
      error: 'text-red-600 font-medium',
      success: 'text-green-600 font-medium',
      warning: 'text-yellow-600 font-medium',
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
