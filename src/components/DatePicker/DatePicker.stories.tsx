import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DatePicker } from './DatePicker'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)
    return <DatePicker selected={date} onChange={setDate} />
  },
}

export const WithLabel: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)
    return (
      <DatePicker
        label="Select a date"
        selected={date}
        onChange={setDate}
      />
    )
  },
}

export const WithHelperText: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)
    return (
      <DatePicker
        label="Birth Date"
        helperText="Please select your date of birth"
        selected={date}
        onChange={setDate}
      />
    )
  },
}

export const WithError: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)
    return (
      <DatePicker
        label="Event Date"
        error="Date is required"
        selected={date}
        onChange={setDate}
      />
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date())
    return (
      <DatePicker
        label="Disabled"
        selected={date}
        onChange={setDate}
        disabled
      />
    )
  },
}

export const FullWidth: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)
    return (
      <div className="w-96">
        <DatePicker
          label="Full Width Date"
          selected={date}
          onChange={setDate}
          fullWidth
        />
      </div>
    )
  },
}

export const WithDateRange: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    return (
      <div className="flex gap-4">
        <DatePicker
          label="Start Date"
          selected={startDate}
          onChange={setStartDate}
          selectsStart
          endDate={endDate}
        />
        <DatePicker
          label="End Date"
          selected={endDate}
          onChange={setEndDate}
          selectsEnd
          startDate={startDate}
          minDate={startDate}
        />
      </div>
    )
  },
}

export const CustomClassNames: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)
    return (
      <DatePicker
        label="Custom Styled"
        selected={date}
        onChange={setDate}
        classNames={{
          root: 'gap-2',
          label: 'text-primary-600 font-bold',
          input: 'border-2 border-primary-500',
        }}
      />
    )
  },
}
