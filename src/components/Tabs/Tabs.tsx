import { createContext, useContext, useId, useState } from 'react'
import { cn } from '../../utils/cn'

// ─── Context ──────────────────────────────────────────────────────────────────

interface TabsContextValue {
  active: string
  setActive: (id: string) => void
  baseId: string
  variant: 'line' | 'pill' | 'enclosed'
  size: 'sm' | 'md' | 'lg'
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tab/TabPanel must be used inside <Tabs>')
  return ctx
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabsClassNames {
  root?: string
  list?: string
  panel?: string
}

export interface TabsProps {
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  variant?: 'line' | 'pill' | 'enclosed'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  classNames?: TabsClassNames
}

export interface TabProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export interface TabPanelProps {
  value: string
  children: React.ReactNode
  className?: string
}

export interface TabListProps {
  children: React.ReactNode
  className?: string
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

const tabVariantStyles: Record<'line' | 'pill' | 'enclosed', { active: string; inactive: string; list: string }> = {
  line: {
    list:     'border-b border-neutral-200 gap-0 dark:border-neutral-700',
    active:   'border-b-2 border-primary-600 text-primary-600 font-medium dark:border-primary-400 dark:text-primary-400',
    inactive: 'border-b-2 border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:border-neutral-600',
  },
  pill: {
    list:     'gap-1 bg-neutral-100 rounded-lg p-1 dark:bg-neutral-800',
    active:   'bg-white text-neutral-900 font-medium shadow-sm rounded-md dark:bg-neutral-700 dark:text-neutral-100',
    inactive: 'text-neutral-500 hover:text-neutral-700 rounded-md dark:text-neutral-400 dark:hover:text-neutral-200',
  },
  enclosed: {
    list:     'border-b border-neutral-200 gap-0 dark:border-neutral-700',
    active:   'border border-neutral-200 border-b-white -mb-px bg-white text-neutral-900 font-medium rounded-t-md dark:border-neutral-700 dark:border-b-neutral-900 dark:bg-neutral-900 dark:text-neutral-100',
    inactive: 'border border-transparent text-neutral-500 hover:text-neutral-700 rounded-t-md dark:text-neutral-400 dark:hover:text-neutral-200',
  },
}

// ─── Components ───────────────────────────────────────────────────────────────

export function TabList({ children, className }: TabListProps) {
  const { variant } = useTabsContext()
  const styles = tabVariantStyles[variant]

  return (
    <div role="tablist" className={cn('flex', styles.list, className)}>
      {children}
    </div>
  )
}

export function Tab({ value, children, disabled, className }: TabProps) {
  const { active, setActive, baseId, variant, size } = useTabsContext()
  const isActive = active === value
  const styles = tabVariantStyles[variant]

  return (
    <button
      role="tab"
      type="button"
      id={`${baseId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      disabled={disabled}
      onClick={() => !disabled && setActive(value)}
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-150 whitespace-nowrap',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1',
        sizeStyles[size],
        isActive ? styles.active : styles.inactive,
        className,
      )}
    >
      {children}
    </button>
  )
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { active, baseId } = useTabsContext()
  if (active !== value) return null

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      className={cn('pt-4', className)}
    >
      {children}
    </div>
  )
}

export function Tabs({
  defaultValue,
  value,
  onChange,
  variant = 'line',
  size = 'md',
  children,
  className,
  classNames,
}: TabsProps) {
  const baseId = useId()
  const [internalActive, setInternalActive] = useState(defaultValue ?? '')

  const active = value ?? internalActive
  const setActive = (v: string) => {
    if (!value) setInternalActive(v)
    onChange?.(v)
  }

  return (
    <TabsContext.Provider value={{ active, setActive, baseId, variant, size }}>
      <div className={cn('w-full', className, classNames?.root)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}
