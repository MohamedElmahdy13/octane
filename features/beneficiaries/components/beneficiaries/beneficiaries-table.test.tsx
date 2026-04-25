import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'

describe('DataTableToolbar', () => {
  it('should update search input', () => {
    const onSearchChange = vi.fn()

    render(
      <DataTableToolbar
        search=""
        onSearchChange={onSearchChange}
        filters={[]}
        selectedCount={0}
        t={(key) => key}
      />
    )

    const input = screen.getByPlaceholderText(/search/i)

    fireEvent.change(input, {
      target: { value: 'ahmed' },
    })

    expect(onSearchChange).toHaveBeenCalledWith('ahmed')
  })
})