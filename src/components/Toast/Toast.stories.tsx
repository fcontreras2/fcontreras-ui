import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast, ToastProvider } from './Toast'
import { Button } from '../Button'

const meta: Meta = {
  title: 'Components/Toast',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <ToastProvider position="top-right" />
        <Story />
      </>
    ),
  ],
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <Button onClick={() => toast('Something happened.')}>Show toast</Button>
  ),
}

export const Success: StoryObj = {
  render: () => (
    <Button variant="secondary" onClick={() => toast.success('Changes saved successfully.')}>
      Success
    </Button>
  ),
}

export const Warning: StoryObj = {
  render: () => (
    <Button variant="secondary" onClick={() => toast.warning('This action may have side effects.')}>
      Warning
    </Button>
  ),
}

export const Error: StoryObj = {
  render: () => (
    <Button variant="danger" onClick={() => toast.error('Something went wrong. Please try again.')}>
      Error
    </Button>
  ),
}

export const Info: StoryObj = {
  render: () => (
    <Button variant="outline" onClick={() => toast.info('Your session expires in 5 minutes.')}>
      Info
    </Button>
  ),
}

export const AllVariants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button size="sm" onClick={() => toast('Default notification')}>Default</Button>
      <Button size="sm" variant="secondary" onClick={() => toast.success('Saved!')}>Success</Button>
      <Button size="sm" variant="secondary" onClick={() => toast.warning('Watch out!')}>Warning</Button>
      <Button size="sm" variant="danger"    onClick={() => toast.error('Error occurred!')}>Error</Button>
      <Button size="sm" variant="outline"   onClick={() => toast.info('FYI!')}>Info</Button>
    </div>
  ),
}

export const WithPromise: StoryObj = {
  render: () => (
    <Button
      onClick={() =>
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
          pending: 'Saving changes…',
          success: 'Changes saved!',
          error: 'Failed to save.',
        })
      }
    >
      Save with promise
    </Button>
  ),
}

export const BottomCenter: StoryObj = {
  decorators: [
    (Story) => (
      <>
        <ToastProvider position="bottom-center" />
        <Story />
      </>
    ),
  ],
  render: () => (
    <Button onClick={() => toast.success('Bottom center toast!')}>Bottom center</Button>
  ),
}
