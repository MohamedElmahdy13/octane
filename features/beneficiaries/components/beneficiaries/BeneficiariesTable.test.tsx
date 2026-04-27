import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DataTableToolbar } from '@/components/data-table/data-table-toolbar/DataTableToolbar'
import { renderWithIntl } from '@/tests/test-utils'

describe('DataTableToolbar', () => {
  it('applies search value after clicking Apply', () => {
    const onApplyFilters = vi.fn()

    renderWithIntl(
      <DataTableToolbar
        search=""
        filters={[]}
        selectedCount={0}
        onApplyFilters={onApplyFilters}
        t={(key) => key}
      />
    )

    fireEvent.change(screen.getByPlaceholderText('searchPlaceholder'), {
      target: { value: 'ahmed' },
    })

    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(onApplyFilters).toHaveBeenCalledWith(
      expect.objectContaining({
        search: 'ahmed',
      })
    )
  })
})