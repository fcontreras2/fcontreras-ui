import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'

export interface ModalClassNames {
  overlay?: string
  panel?: string
  header?: string
  title?: string
  closeButton?: string
  body?: string
  footer?: string
}

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  hideCloseButton?: boolean
  className?: string
  classNames?: ModalClassNames
}

const sizeStyles: Record<NonNullable<ModalProps['size']>, string> = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  xl:   'max-w-xl',
  full: 'max-w-full mx-4',
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  hideCloseButton = false,
  className,
  classNames,
}: ModalProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [rendered, setRendered] = useState(false)

  // Mount first, then trigger animation on next frame
  useEffect(() => {
    if (open) {
      setRendered(true)
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    } else {
      setVisible(false)
      const t = setTimeout(() => setRendered(false), 200)
      return () => clearTimeout(t)
    }
  }, [open])

  // Focus management
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    panelRef.current?.focus()
    return () => { previous?.focus() }
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Scroll lock
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  if (!rendered) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={closeOnOverlayClick ? onClose : undefined}
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-200',
          visible ? 'opacity-100' : 'opacity-0',
          classNames?.overlay,
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          'relative w-full rounded-lg bg-white shadow-xl outline-none dark:bg-neutral-900',
          'flex flex-col max-h-[90vh]',
          'transition-all duration-200',
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          sizeStyles[size],
          className,
          classNames?.panel,
        )}
      >
        {(title || !hideCloseButton) && (
          <div
            className={cn(
              'flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-700',
              classNames?.header,
            )}
          >
            {title && (
              <h2
                id={titleId}
                className={cn('text-base font-semibold text-neutral-900 dark:text-neutral-100', classNames?.title)}
              >
                {title}
              </h2>
            )}
            {!hideCloseButton && (
              <button
                type="button"
                aria-label="Cerrar"
                onClick={onClose}
                className={cn(
                  'ml-auto rounded p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-800',
                  classNames?.closeButton,
                )}
              >
                <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        )}

        {children && (
          <div className={cn('flex-1 overflow-y-auto px-5 py-4', classNames?.body)}>
            {children}
          </div>
        )}

        {footer && (
          <div
            className={cn(
              'flex items-center justify-end gap-2 px-5 py-4 border-t border-neutral-200 bg-neutral-50 rounded-b-lg dark:border-neutral-700 dark:bg-neutral-800',
              classNames?.footer,
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
