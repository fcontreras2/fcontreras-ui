import { cn } from '../../utils/cn'

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption' | 'overline' | 'code'
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
export type TextColor = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger' | 'inherit'
export type TextAlign = 'left' | 'center' | 'right'

export interface TextProps {
  as?: React.ElementType
  variant?: TextVariant
  weight?: TextWeight
  color?: TextColor
  align?: TextAlign
  truncate?: boolean
  children: React.ReactNode
  className?: string
}

const defaultElements: Record<TextVariant, React.ElementType> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  body: 'p', 'body-sm': 'p', caption: 'span', overline: 'span', code: 'code',
}

const variantStyles: Record<TextVariant, string> = {
  h1: 'text-4xl font-bold leading-tight tracking-tight',
  h2: 'text-3xl font-bold leading-tight tracking-tight',
  h3: 'text-2xl font-semibold leading-snug',
  h4: 'text-xl font-semibold leading-snug',
  h5: 'text-lg font-medium leading-snug',
  h6: 'text-base font-medium leading-snug',
  body: 'text-base leading-relaxed',
  'body-sm': 'text-sm leading-relaxed',
  caption: 'text-xs leading-normal',
  overline: 'text-xs font-medium uppercase tracking-widest leading-normal',
  code: 'text-sm font-mono bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded dark:bg-neutral-800 dark:text-neutral-200',
}

const weightStyles: Record<TextWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const colorStyles: Record<TextColor, string> = {
  default: 'text-neutral-900 dark:text-neutral-100',
  muted: 'text-neutral-500 dark:text-neutral-400',
  primary: 'text-primary-600 dark:text-primary-400',
  success: 'text-success-600 dark:text-success-400',
  warning: 'text-warning-600 dark:text-warning-400',
  danger: 'text-danger-600 dark:text-danger-400',
  inherit: 'text-inherit',
}

const alignStyles: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export function Text({
  as,
  variant = 'body',
  weight,
  color = 'default',
  align,
  truncate = false,
  children,
  className,
}: TextProps) {
  const Component = as ?? defaultElements[variant]

  return (
    <Component
      className={cn(
        variantStyles[variant],
        colorStyles[color],
        weight && weightStyles[weight],
        align && alignStyles[align],
        truncate && 'truncate',
        className,
      )}
    >
      {children}
    </Component>
  )
}
