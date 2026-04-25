import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, it, expect } from 'vitest'

import { useBeneficiariesQueryTable } from './use-beneficiaries-query-table'

// mock URL state hook
vi.mock('./use-beneficiaries-url-state', () => ({
  useBeneficiariesUrlState: () => ({
    query: {
      pageIndex: 0,
      pageSize: 10,
      search: '',
      plan: '',
      coverageStatus: '',
      paymentStatus: '',
      company: '',
      nationality: '',
      sortBy: '',
      sortOrder: 'desc',
    },
    setQuery: vi.fn(),
  }),
}))

// mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data: [],
        total: 0,
        totalPages: 1,
      }),
  })
) as any

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useBeneficiariesQueryTable', () => {
  it('returns initial structure', () => {
    const { result } = renderHook(() => useBeneficiariesQueryTable(), {
      wrapper: createWrapper(),
    })

    expect(result.current).toHaveProperty('query')
    expect(result.current).toHaveProperty('data')
    expect(result.current).toHaveProperty('loading')
    expect(result.current).toHaveProperty('error')
  })

  it('fetches data successfully', async () => {
    const { result } = renderHook(() => useBeneficiariesQueryTable(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual({
      data: [],
      total: 0,
      totalPages: 1,
    })
  })
})