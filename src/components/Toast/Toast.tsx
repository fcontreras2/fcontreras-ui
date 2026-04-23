import { toast as _toast, ToastContainer, type ToastOptions as RTOptions, type ToastPosition } from 'react-toastify'
import { cn } from '../../utils/cn'

export type { ToastPosition }
export type ToastVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

export interface ToastOptions extends Omit<RTOptions, 'type'> {
  variant?: ToastVariant
}

export interface ToastProviderProps {
  position?: ToastPosition
  autoClose?: number
  className?: string
}

const variantTypeMap: Record<ToastVariant, RTOptions['type']> = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  danger:  'error',
  info:    'info',
}

// ─── toast() helper ───────────────────────────────────────────────────────────

function toastBase(
  message: React.ReactNode,
  { variant = 'default', ...options }: ToastOptions = {},
) {
  return _toast(message, { type: variantTypeMap[variant], ...options })
}

toastBase.success = (message: React.ReactNode, options?: Omit<ToastOptions, 'variant'>) =>
  _toast.success(message, options)

toastBase.warning = (message: React.ReactNode, options?: Omit<ToastOptions, 'variant'>) =>
  _toast.warning(message, options)

toastBase.error = (message: React.ReactNode, options?: Omit<ToastOptions, 'variant'>) =>
  _toast.error(message, options)

toastBase.info = (message: React.ReactNode, options?: Omit<ToastOptions, 'variant'>) =>
  _toast.info(message, options)

toastBase.dismiss = (id?: string | number) => _toast.dismiss(id)
toastBase.promise = _toast.promise

export const toast = toastBase

// ─── ToastProvider ────────────────────────────────────────────────────────────

export function ToastProvider({
  position = 'top-right',
  autoClose = 4000,
  className,
}: ToastProviderProps) {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
      className={cn(className)}
    />
  )
}
