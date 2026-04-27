import React, { ReactNode } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, type MenuItemProps } from '@headlessui/react'
import { cn } from '../../utils/cn'

export interface DropdownClassNames {
  root?: string
  trigger?: string
  menu?: string
  item?: string
  icon?: string
  label?: string
  divider?: string
}

export interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
  classNames?: DropdownClassNames
}

export interface DropdownMenuItemProps extends Omit<MenuItemProps<'button'>, 'children'> {
  label: ReactNode
  icon?: ReactNode
  variant?: 'default' | 'danger'
  className?: string
  classNames?: {
    root?: string
    icon?: string
    label?: string
  }
}

export function Dropdown({
  trigger,
  children,
  align = 'left',
  className,
  classNames = {},
}: DropdownProps) {
  return (
    <Menu
      as="div"
      className={cn(
        'relative inline-block text-left',
        className,
        classNames.root,
      )}
    >
      <MenuButton
        className={cn(
          'inline-flex items-center',
          classNames.trigger,
        )}
      >
        {trigger}
      </MenuButton>
      <MenuItems
        anchor={align === 'right' ? 'bottom end' : 'bottom start'}
        transition
        className={cn(
          'absolute z-50 w-56 origin-top-left bg-white rounded-lg shadow-lg dark:bg-neutral-900',
          'border border-neutral-200 py-1 px-1 text-sm/6 dark:border-neutral-700',
          'transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
          align === 'right' && 'origin-top-right',
          classNames.menu,
        )}
      >
        {children}
      </MenuItems>
    </Menu>
  )
}

export function DropdownItem({
  label,
  icon,
  variant = 'default',
  className,
  classNames = {},
  ...props
}: DropdownMenuItemProps) {
  return (
    <MenuItem
      as="button"
      className={cn(
        'group flex w-full items-center gap-3 rounded-md px-3 py-2 transition text-neutral-700 dark:text-neutral-300',
        'hover:bg-neutral-100 focus:outline-none dark:hover:bg-neutral-800',
        variant === 'danger' && 'text-danger-600 hover:bg-danger-50 dark:text-danger-400 dark:hover:bg-danger-950',
        className,
        classNames.root,
      )}
      {...props}
    >
      {icon && (
        <span className={cn('flex-shrink-0', classNames.icon)}>
          {icon}
        </span>
      )}
      <span className={cn('flex-1 text-left', classNames.label)}>
        {label}
      </span>
    </MenuItem>
  )
}

export interface DropdownDividerProps {
  className?: string
  classNames?: {
    root?: string
  }
}

export function DropdownDivider({ className, classNames = {} }: DropdownDividerProps) {
  return (
    <div
      className={cn(
        'my-1 h-px bg-neutral-200 dark:bg-neutral-700',
        className,
        classNames.root,
      )}
    />
  )
}
