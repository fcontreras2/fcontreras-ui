import { cn } from '../../utils/cn'

export type SkeletonVariant = 'text' | 'circular' | 'rectangular'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: number | string
  height?: number | string
  lines?: number
  className?: string
}

const baseClass = 'animate-pulse bg-gray-200 rounded'

export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 3,
  className,
}: SkeletonProps) {
  const style = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  }

  if (variant === 'circular') {
    return (
      <span
        aria-hidden="true"
        style={style}
        className={cn(baseClass, 'rounded-full shrink-0', !width && 'w-10', !height && 'h-10', className)}
      />
    )
  }

  if (variant === 'rectangular') {
    return (
      <span
        aria-hidden="true"
        style={style}
        className={cn(baseClass, 'block', !width && 'w-full', !height && 'h-24', className)}
      />
    )
  }

  // text — renders multiple line bars
  if (lines > 1) {
    return (
      <div aria-hidden="true" className="flex flex-col gap-2" style={style}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={cn(
              baseClass,
              'block h-3',
              i === lines - 1 ? 'w-4/5' : 'w-full',
              className,
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn(baseClass, 'block h-3', !width && 'w-full', className)}
    />
  )
}
