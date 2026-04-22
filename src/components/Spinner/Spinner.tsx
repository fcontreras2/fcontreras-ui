import { cn } from '../../utils/cn'

export interface SpinnerClassNames {
  root?: string
}

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  classNames?: SpinnerClassNames
  label?: string
}

const sizeStyles: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
}

export function Spinner({
  size = 'md',
  className,
  classNames,
  label = 'Loading...',
}: SpinnerProps) {
  return (
    <svg
      aria-label={label}
      className={cn('animate-spin text-current', sizeStyles[size], className, classNames?.root)}
      fill="none"
      role="status"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        fill="currentColor"
      />
    </svg>
  )
}
