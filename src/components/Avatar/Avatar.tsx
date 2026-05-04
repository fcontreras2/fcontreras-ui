import { useState } from 'react'
import { cn } from '../../utils/cn'
import { Icon } from '../Icon'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarShape = 'circle' | 'square'
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

export interface AvatarClassNames {
  root?: string
  image?: string
  fallback?: string
  status?: string
}

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  shape?: AvatarShape
  status?: AvatarStatus
  className?: string
  classNames?: AvatarClassNames
}

const sizeStyles: Record<AvatarSize, { root: string; text: string; status: string; statusPos: string }> = {
  xs: { root: 'size-6',  text: 'text-xs',   status: 'size-1.5', statusPos: 'bottom-0 right-0' },
  sm: { root: 'size-8',  text: 'text-sm',   status: 'size-2',   statusPos: 'bottom-0 right-0' },
  md: { root: 'size-10', text: 'text-sm',   status: 'size-2.5', statusPos: 'bottom-0 right-0' },
  lg: { root: 'size-12', text: 'text-base', status: 'size-3',   statusPos: 'bottom-0.5 right-0.5' },
  xl: { root: 'size-16', text: 'text-lg',   status: 'size-3.5', statusPos: 'bottom-0.5 right-0.5' },
}

const statusStyles: Record<AvatarStatus, string> = {
  online:  'bg-success-500',
  offline: 'bg-neutral-400',
  away:    'bg-warning-500',
  busy:    'bg-danger-500',
}

const PALETTE = [
  'bg-red-500',    'bg-orange-500', 'bg-amber-500',  'bg-lime-600',
  'bg-green-600',  'bg-teal-500',   'bg-cyan-600',   'bg-sky-500',
  'bg-blue-600',   'bg-indigo-500', 'bg-violet-500', 'bg-purple-500',
  'bg-fuchsia-500','bg-pink-500',   'bg-rose-500',   'bg-slate-500',
]

function getInitials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

function pickColor(name: string): string {
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return PALETTE[hash % PALETTE.length]
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className,
  classNames,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const sizes = sizeStyles[size]
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md'
  const showImage = src && !imgError

  return (
    <span className={cn('relative inline-flex shrink-0', sizes.root, className, classNames?.root)}>
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? 'avatar'}
          onError={() => setImgError(true)}
          className={cn('size-full object-cover', shapeClass, classNames?.image)}
        />
      ) : (
        <span
          aria-label={alt ?? name}
          className={cn(
            'inline-flex size-full items-center justify-center font-medium text-white select-none',
            shapeClass,
            name ? pickColor(name) : 'bg-neutral-300 dark:bg-neutral-600',
            sizes.text,
            classNames?.fallback,
          )}
        >
          {name ? getInitials(name) : (
            <Icon name="user" variant="solid" className="size-1/2 text-white" />
          )}
        </span>
      )}
      {status && (
        <span
          aria-label={status}
          className={cn(
            'absolute rounded-full ring-2 ring-white',
            sizes.status,
            sizes.statusPos,
            statusStyles[status],
            classNames?.status,
          )}
        />
      )}
    </span>
  )
}
