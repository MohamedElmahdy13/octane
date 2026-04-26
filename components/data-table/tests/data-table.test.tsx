import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { DataTable } from '../data-table'
import { renderWithIntl } from '@/tests/test-utils'

describe('DataTable', () => {
  const mockData = [
    {
      id: '1',
      fullName: 'Mohamed Ahmed',
      email: 'mohamed@test.com',
    },
  ]

  const columns = [
    {
      accessorKey: 'fullName',
      header: 'Name',
      cell: ({ row }: any) => row.original.fullName,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }: any) => row.original.email,
    },
  ]

  it('renders columns and data correctly', () => {
    renderWithIntl(
      <DataTable
        data={mockData}
        columns={columns}
        loading={false}
        search=""
        filters={[]}
        onApplyFilters={() => {}}
        pagination={{ pageIndex: 0, pageSize: 10 }}
        total={1}
        pageCount={1}
        onPaginationChange={() => {}}
      />
    )

    // ✅ check headers (columns)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()

    // ✅ check row data
    expect(screen.getByText('Mohamed Ahmed')).toBeInTheDocument()
    expect(screen.getByText('mohamed@test.com')).toBeInTheDocument()
  })
})