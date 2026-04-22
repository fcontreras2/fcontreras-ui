import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table, type TableColumn, type SortDirection } from './Table'
import { Badge } from '../Badge'
import { Avatar } from '../Avatar'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 700 }}><Story /></div>],
  argTypes: {
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
}

const DATA: User[] = [
  { id: 1, name: 'Alice Johnson',  email: 'alice@example.com',  role: 'Admin',     status: 'active' },
  { id: 2, name: 'Bob Smith',      email: 'bob@example.com',    role: 'Editor',    status: 'inactive' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com',  role: 'Viewer',    status: 'active' },
  { id: 4, name: 'David Brown',    email: 'david@example.com',  role: 'Editor',    status: 'pending' },
  { id: 5, name: 'Eva Martinez',   email: 'eva@example.com',    role: 'Admin',     status: 'active' },
]

const statusVariant: Record<User['status'], 'success' | 'default' | 'warning'> = {
  active:   'success',
  inactive: 'default',
  pending:  'warning',
}

const COLUMNS: TableColumn<User>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    accessor: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar name={row.name} size="sm" />
        <div>
          <p style={{ fontWeight: 500, fontSize: 14 }}>{row.name}</p>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>{row.email}</p>
        </div>
      </div>
    ),
  },
  { key: 'role',   header: 'Role',   accessor: 'role',   sortable: true },
  {
    key: 'status',
    header: 'Status',
    accessor: (row) => (
      <Badge variant={statusVariant[row.status]} size="sm">
        {row.status}
      </Badge>
    ),
  },
]

export const Default: StoryObj = {
  render: () => (
    <Table columns={COLUMNS} data={DATA} keyExtractor={(r) => r.id} />
  ),
}

export const Striped: StoryObj = {
  render: () => (
    <Table columns={COLUMNS} data={DATA} keyExtractor={(r) => r.id} striped />
  ),
}

export const Bordered: StoryObj = {
  render: () => (
    <Table columns={COLUMNS} data={DATA} keyExtractor={(r) => r.id} bordered />
  ),
}

export const Loading: StoryObj = {
  render: () => (
    <Table columns={COLUMNS} data={[]} keyExtractor={(r: User) => r.id} loading />
  ),
}

export const Empty: StoryObj = {
  render: () => (
    <Table columns={COLUMNS} data={[]} keyExtractor={(r: User) => r.id} emptyText="No users found." />
  ),
}

export const WithSort: StoryObj = {
  render: () => {
    function Demo() {
      const [sortKey, setSortKey] = useState<string>('')
      const [sortDir, setSortDir] = useState<SortDirection>(null)

      const sorted = [...DATA].sort((a, b) => {
        if (!sortKey || !sortDir) return 0
        const av = a[sortKey as keyof User] as string
        const bv = b[sortKey as keyof User] as string
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      })

      return (
        <Table
          columns={COLUMNS}
          data={sorted}
          keyExtractor={(r) => r.id}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => { setSortKey(key); setSortDir(dir) }}
        />
      )
    }
    return <Demo />
  },
}

export const Clickable: StoryObj = {
  render: () => (
    <Table
      columns={COLUMNS}
      data={DATA}
      keyExtractor={(r) => r.id}
      onRowClick={(row) => alert(`Clicked: ${row.name}`)}
    />
  ),
}

export const Small: StoryObj = {
  render: () => <Table columns={COLUMNS} data={DATA} keyExtractor={(r) => r.id} size="sm" />,
}
