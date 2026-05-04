import { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { icons, type IconName, type IconVariant, type IconWeight } from './icons'

export type { IconName, IconVariant, IconWeight }

export interface IconClassNames {
  root?: string
}

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName
  variant?: IconVariant
  weight?: IconWeight
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  classNames?: IconClassNames
}

const sizeMap: Record<NonNullable<IconProps['size']>, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

const strokeWidthMap: Record<IconWeight, number> = {
  thin: 1,
  regular: 1.5,
  bold: 2.5,
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    name,
    variant = 'outline',
    weight = 'regular',
    size = 'md',
    classNames,
    className,
    ...props
  },
  ref,
) {
  const px = sizeMap[size]
  const path = icons[name][variant]
  const isOutline = variant === 'outline'

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={px}
      height={px}
      fill={isOutline ? 'none' : 'currentColor'}
      stroke={isOutline ? 'currentColor' : 'none'}
      strokeWidth={isOutline ? strokeWidthMap[weight] : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-icon={name}
      data-variant={variant}
      className={cn(className, classNames?.root)}
      {...props}
    >
      <path d={path} />
    </svg>
  )
})

Icon.displayName = 'Icon'
