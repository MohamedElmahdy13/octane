'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { fetchBeneficiaries } from '../services/beneficiaries-client.service'
import type { BeneficiariesQueryState } from '../types/beneficiary.types'

const initialState: BeneficiariesQueryState = {
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
}

function buildBeneficiariesParams(
  query: BeneficiariesQueryState,
  debouncedSearch: string
) {
  const params = new URLSearchParams({
    page: String(query.pageIndex + 1),
    pageSize: String(query.pageSize),
    search: debouncedSearch,
  })

  if (query.plan) params.set('plan', query.plan)
  if (query.coverageStatus) params.set('coverageStatus', query.coverageStatus)
  if (query.paymentStatus) params.set('paymentStatus', query.paymentStatus)
  if (query.company) params.set('company', query.company)
  if (query.nationality) params.set('nationality', query.nationality)

  if (query.sortBy) {
    params.set('sortBy', query.sortBy)
    params.set('sortOrder', query.sortOrder)
  }

  return params
}

export function useBeneficiariesQueryTable() {
  const [query, setQuery] = useState<BeneficiariesQueryState>(initialState)
  const debouncedSearch = useDebouncedValue(query.search)

  const params = useMemo(
    () => buildBeneficiariesParams(query, debouncedSearch),
    [query, debouncedSearch]
  )
  const beneficiariesQuery = useQuery({
    queryKey: ['beneficiaries', params.toString()],
    queryFn: () => fetchBeneficiaries(params),
    enabled: query.search === debouncedSearch,
    placeholderData: (previousData) => previousData,
  })
  const planOptions = useMemo(() => ['Silver', 'Gold', 'Platinum'], [])
  const coverageOptions = useMemo(() => ['Active', 'Suspended', 'Expired'], [])
  const paymentOptions = useMemo(() => ['Paid', 'Pending', 'Overdue'], [])
  const nationalityOptions = useMemo(
    () => ['Egyptian', 'Syrian', 'Lebanese', 'Saudi'],
    []
  )
  const companyOptions = useMemo(
    () => [
      'FinServe Egypt',
      'Nile Tech',
      'AXA Group',
      'MedCare Solutions',
      'Delta Finance',
    ],
    []
  )

  return {
    query,
    setQuery,
    data: beneficiariesQuery.data ?? null,
    loading: beneficiariesQuery.isLoading || beneficiariesQuery.isFetching,
    error:
      beneficiariesQuery.error instanceof Error
        ? beneficiariesQuery.error.message
        : null,
    retry: beneficiariesQuery.refetch,
    planOptions,
    coverageOptions,
    nationalityOptions,
    paymentOptions,
    companyOptions,
  }
}