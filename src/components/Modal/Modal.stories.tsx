import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'
import { Button } from '../Button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
}

export default meta

function ModalDemo(props: Partial<React.ComponentProps<typeof Modal>>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} {...props} />
    </>
  )
}

export const Default: StoryObj = {
  render: () => (
    <ModalDemo
      title="Modal title"
      children={<p style={{ fontSize: 14, color: '#6b7280' }}>Modal body content goes here.</p>}
    />
  ),
}

export const WithFooter: StoryObj = {
  render: () => (
    <ModalDemo
      title="Confirm action"
      children={
        <p style={{ fontSize: 14, color: '#6b7280' }}>
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
      }
      footer={
        <>
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="danger" size="sm">Delete</Button>
        </>
      }
    />
  ),
}

export const Small: StoryObj = {
  render: () => (
    <ModalDemo size="sm" title="Small modal" children={<p style={{ fontSize: 14 }}>Compact content.</p>} />
  ),
}

export const Large: StoryObj = {
  render: () => (
    <ModalDemo
      size="lg"
      title="Large modal"
      children={
        <p style={{ fontSize: 14, color: '#6b7280' }}>
          This modal has more horizontal space for complex content like forms or data tables.
        </p>
      }
    />
  ),
}

export const NoOverlayClose: StoryObj = {
  render: () => (
    <ModalDemo
      title="Persistent modal"
      closeOnOverlayClick={false}
      children={
        <p style={{ fontSize: 14, color: '#6b7280' }}>
          This modal only closes via the X button or Escape key, not by clicking the overlay.
        </p>
      }
    />
  ),
}
