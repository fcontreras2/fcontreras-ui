import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface LabelClassNames {
  root?: string
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  error?: boolean
  classNames?: LabelClassNames
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  {
    required = false,
    error = false,
    classNames,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium',
        error ? 'text-danger-600 dark:text-danger-400' : 'text-neutral-700 dark:text-neutral-300',
        className,
        classNames?.root,
      )}
      {...props}
    >
      {children}
      {required && <span className="text-danger-600 dark:text-danger-400 ml-0.5">*</span>}
    </label>
  )
})

Label.displayName = 'Label'
