import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { DataTableError } from '../DataTableError'

describe('DataTableError', () => {
  it('renders error message', () => {
    render(
      <DataTableError message="Something went wrong" />
    )

    expect(
      screen.getAllByText(/something went wrong/i).length
    ).toBeGreaterThan(0)
  })
})