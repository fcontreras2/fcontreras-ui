# fcontreras2-ui Component Library

## Tech Stack
- Frontend: React 18+, Tailwind CSS v4
- Language: TypeScript
- UI Framework: HeadlessUI (for complex components)
- Component Library: react-toastify, react-tooltip, react-select

## Coding Standards
- Use functional components with Tailwind for styling
- **ALWAYS export types from components**
- **ALWAYS include `classNames` pattern for slot customization**
- **Use `cn()` utility from `../../utils/cn`**
- **Use `forwardRef` for DOM-encapsulating components**
- Extend React HTML attributes (e.g., `ButtonHTMLAttributes<HTMLButtonElement>`)

## Essential Commands
- Build: `npm run build`
- Dev (Storybook): `npm run dev`
- Test: `npm test`
- Type check: `npm run typecheck`

## Project Structure
- `src/components`: UI components
- `src/utils`: Utilities (`cn`, etc.)
- `src/styles`: Global CSS

---

## Component Development Pattern

### Directory Structure

Each component must follow this structure:

```
src/components/ComponentName/
├── ComponentName.tsx          # Component implementation
├── index.ts                   # Exports
├── ComponentName.stories.tsx  # Storybook stories
└── ComponentName.test.tsx     # Tests (optional)
```

### Component Template

#### 1. **ComponentName.tsx**

```tsx
import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

// ALWAYS define ClassNames interface
export interface ComponentNameClassNames {
  root?: string
  // Add all internal slots here
}

// Props interface extending HTML element
export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'variant2'
  size?: 'sm' | 'md' | 'lg'
  classNames?: ComponentNameClassNames
}

// Style maps
const variantStyles: Record<NonNullable<ComponentNameProps['variant']>, string> = {
  default: 'bg-white border-gray-200',
  variant2: 'bg-gray-50 border-gray-300',
}

const sizeStyles: Record<NonNullable<ComponentNameProps['size']>, string> = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg',
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  function ComponentName(
    {
      variant = 'default',
      size = 'md',
      classNames,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'base-styles',
          variantStyles[variant],
          sizeStyles[size],
          className,
          classNames?.root,
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ComponentName.displayName = 'ComponentName'
```

#### 2. **index.ts**

```tsx
export { ComponentName } from './ComponentName'
export type { ComponentNameProps, ComponentNameClassNames } from './ComponentName'
```

#### 3. **ComponentName.stories.tsx**

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './ComponentName'

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'variant2'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Content' } }
export const Variant2: Story = { args: { variant: 'variant2', children: 'Content' } }
export const Small: Story = { args: { size: 'sm', children: 'Small' } }
```

### Requirements Checklist

- ✅ ClassNames interface with all slots
- ✅ Props interface extending HTML attributes
- ✅ forwardRef for DOM components
- ✅ displayName set
- ✅ Use cn() for class composition
- ✅ Style maps for variants/sizes (if applicable)
- ✅ Export types in index.ts
- ✅ Storybook stories (minimum 3)
- ✅ Add to src/components/index.ts

### ClassNames Pattern

ALL components must support `classNames` for customizing internal elements:

```tsx
// Good - provides slot customization
<Button classNames={{ root: 'custom-btn', leftIcon: 'icon-color' }} />

// Bad - no way to customize internals
<Button />
```

### HeadlessUI Components

For complex interactive components using HeadlessUI:

1. Import components from `@headlessui/react`
2. Wrap with classNames support
3. Use `anchor` prop for positioning
4. Add `transition` for animations

Example:
```tsx
import { Menu, MenuButton, MenuItems } from '@headlessui/react'

export function Dropdown({ trigger, children, classNames }: DropdownProps) {
  return (
    <Menu as="div" className={classNames?.root}>
      <MenuButton className={classNames?.trigger}>{trigger}</MenuButton>
      <MenuItems className={classNames?.menu}>{children}</MenuItems>
    </Menu>
  )
}
```

---

## Key Principles

1. **Consistency** — All components follow the same structure and patterns
2. **Customization** — Every component supports `classNames` for slot customization
3. **Type Safety** — Export all types, use TypeScript strictly
4. **Documentation** — Every component has Storybook stories
5. **Accessibility** — Use semantic HTML, support refs, extend native attributes
