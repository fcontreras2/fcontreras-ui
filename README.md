# fcontreras2-ui

A modern, accessible, and fully customizable React component library built with Tailwind CSS v4.

## Installation

```bash
npm install fcontreras2-ui
```

### Peer dependencies

```bash
npm install react react-dom
```

### Import styles

Add the following import once at the root of your application (e.g. `main.tsx` or `_app.tsx`):

```tsx
import 'fcontreras2-ui/styles.css'
```

---

## Usage

```tsx
import { Button, Input, Card } from 'fcontreras2-ui'

export function Example() {
  return (
    <Card title="Welcome">
      <Input label="Name" placeholder="John Doe" />
      <Button>Submit</Button>
    </Card>
  )
}
```

### Toast notifications

Render `ToastProvider` once at your app root, then call `toast()` anywhere:

```tsx
// main.tsx
import { ToastProvider } from 'fcontreras2-ui'

<ToastProvider position="top-right" />

// anywhere in your app
import { toast } from 'fcontreras2-ui'

toast.success('Saved!')
toast.error('Something went wrong.')
```

---

## Theming

The library uses a `primary` color scale. Override it in your global CSS using Tailwind v4 theme variables:

```css
@import 'tailwindcss';

@theme {
  --color-primary-50:  #fdf4ff;
  --color-primary-100: #fae8ff;
  --color-primary-200: #f5d0fe;
  --color-primary-300: #f0abfc;
  --color-primary-400: #e879f9;
  --color-primary-500: #d946ef;
  --color-primary-600: #c026d3;  /* main brand color */
  --color-primary-700: #a21caf;
  --color-primary-800: #86198f;
  --color-primary-900: #701a75;
  --color-primary-950: #4a044e;
}
```

---

## Components

### Form

| Component | Import |
|---|---|
| `Button` | `import { Button } from 'fcontreras2-ui'` |
| `Input` | `import { Input } from 'fcontreras2-ui'` |
| `Textarea` | `import { Textarea } from 'fcontreras2-ui'` |
| `Select` | `import { Select } from 'fcontreras2-ui'` |
| `Checkbox` | `import { Checkbox } from 'fcontreras2-ui'` |
| `RadioGroup`, `Radio` | `import { RadioGroup, Radio } from 'fcontreras2-ui'` |
| `Switch` | `import { Switch } from 'fcontreras2-ui'` |

### Feedback

| Component | Import |
|---|---|
| `Alert` | `import { Alert } from 'fcontreras2-ui'` |
| `toast`, `ToastProvider` | `import { toast, ToastProvider } from 'fcontreras2-ui'` |
| `Modal` | `import { Modal } from 'fcontreras2-ui'` |
| `Tooltip` | `import { Tooltip } from 'fcontreras2-ui'` |
| `Spinner` | `import { Spinner } from 'fcontreras2-ui'` |
| `Progress` | `import { Progress } from 'fcontreras2-ui'` |
| `Skeleton` | `import { Skeleton } from 'fcontreras2-ui'` |

### Display

| Component | Import |
|---|---|
| `Badge` | `import { Badge } from 'fcontreras2-ui'` |
| `BadgeDot` | `import { BadgeDot } from 'fcontreras2-ui'` |
| `Avatar` | `import { Avatar } from 'fcontreras2-ui'` |
| `Text` | `import { Text } from 'fcontreras2-ui'` |
| `Card` | `import { Card } from 'fcontreras2-ui'` |

### Navigation & Layout

| Component | Import |
|---|---|
| `Tabs`, `Tab`, `TabList`, `TabPanel` | `import { Tabs, Tab, TabList, TabPanel } from 'fcontreras2-ui'` |
| `Breadcrumb` | `import { Breadcrumb } from 'fcontreras2-ui'` |
| `Pagination` | `import { Pagination } from 'fcontreras2-ui'` |
| `Divider` | `import { Divider } from 'fcontreras2-ui'` |

### Data

| Component | Import |
|---|---|
| `Table` | `import { Table } from 'fcontreras2-ui'` |

---

## API conventions

Every component shares the same prop patterns:

```tsx
// Size
size?: 'sm' | 'md' | 'lg'

// Semantic color intent
variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'

// Form components
label?: string
error?: string
helperText?: string
fullWidth?: boolean

// Granular class overrides per slot
classNames?: {
  root?: string
  label?: string
  // ... component-specific slots
}
```

---

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run dev

# Build library
npm run build

# Run tests
npm test

# Type check
npm run typecheck
```

---

## Requirements

- React 18 or 19
- Tailwind CSS v4 (in the consuming app)

## License

MIT
