import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { DataTablePagination } from '../data-table-pagination'
import { renderWithIntl } from '@/tests/test-utils'

describe('DataTablePagination', () => {
  it('should go to next page', () => {
    const onChange = vi.fn()

    renderWithIntl(
      <DataTablePagination
        pagination={{ pageIndex: 0, pageSize: 10 }}
        pageCount={5}
        total={50}
        onPaginationChange={onChange}
      />
    )

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[buttons.length - 1])

    expect(onChange).toHaveBeenCalled()
  })

  it('should render page numbers', () => {
    renderWithIntl(
      <DataTablePagination
        pagination={{ pageIndex: 0, pageSize: 10 }}
        pageCount={5}
        total={50}
        onPaginationChange={() => {}}
      />
    )

    expect(screen.getAllByText('1').length).toBeGreaterThan(0)
  })
})