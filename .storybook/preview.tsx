import type { Preview } from '@storybook/react-vite'
import '../src/styles/index.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for stories',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light mode' },
          { value: 'dark', title: 'Dark mode' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    (Story, context) => {
      const isDarkMode = context.globals.theme === 'dark'

      if (typeof document !== 'undefined') {
        const backgroundColor = isDarkMode ? 'var(--color-neutral-950)' : '#ffffff'
        const textColor = isDarkMode ? 'var(--color-neutral-100)' : 'var(--color-neutral-900)'

        document.documentElement.classList.toggle('dark', isDarkMode)
        document.body.classList.toggle('dark', isDarkMode)
        document.documentElement.style.backgroundColor = backgroundColor
        document.body.style.backgroundColor = backgroundColor
        document.body.style.color = textColor
        document.body.style.margin = '0'
        document.body.style.minHeight = '100vh'

        const storyRoot = document.getElementById('storybook-root')
        if (storyRoot) {
          storyRoot.style.backgroundColor = backgroundColor
          storyRoot.style.minHeight = '100vh'
        }
      }

      return (
        <div
          className={isDarkMode ? 'dark min-h-screen w-full bg-neutral-950 text-neutral-100' : 'min-h-screen w-full bg-white text-neutral-900'}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
