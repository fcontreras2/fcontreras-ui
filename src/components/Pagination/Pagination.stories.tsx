import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './Pagination'
import { Table, type TableColumn } from '../Table'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta

function PaginationDemo(props: Partial<React.ComponentProps<typeof Pagination>>) {
  const [page, setPage] = useState(1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
      <Pagination page={page} totalPages={10} onChange={setPage} {...props} />
      <p style={{ fontSize: 12, color: '#9ca3af' }}>Current page: {page}</p>
    </div>
  )
}

export const Default: StoryObj = { render: () => <PaginationDemo /> }
export const WithInfo: StoryObj = {
  render: () => <PaginationDemo showInfo totalItems={200} pageSize={20} />,
}
export const FewPages: StoryObj = { render: () => <PaginationDemo totalPages={3} /> }
export const ManyPages: StoryObj = { render: () => <PaginationDemo totalPages={50} /> }
export const Small: StoryObj  = { render: () => <PaginationDemo size="sm" /> }
export const Large: StoryObj  = { render: () => <PaginationDemo size="lg" /> }
export const MoreSiblings: StoryObj = { render: () => <PaginationDemo siblings={2} /> }

interface Item { id: number; name: string; email: string }

const ALL_ITEMS: Item[] = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}))

const PAGE_SIZE = 10

const COLS: TableColumn<Item>[] = [
  { key: 'id',    header: '#',     accessor: 'id',    width: 60 },
  { key: 'name',  header: 'Name',  accessor: 'name'  },
  { key: 'email', header: 'Email', accessor: 'email' },
]

export const WithTable: StoryObj = {
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
  render: () => {
    function Demo() {
      const [page, setPage] = useState(1)
      const totalPages = Math.ceil(ALL_ITEMS.length / PAGE_SIZE)
      const slice = ALL_ITEMS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Table columns={COLS} data={slice} keyExtractor={(r) => r.id} bordered />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
              showInfo
              totalItems={ALL_ITEMS.length}
              pageSize={PAGE_SIZE}
            />
          </div>
        </div>
      )
    }
    return <Demo />
  },
}
