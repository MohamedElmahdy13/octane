'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import {
  COMPANY_OPTIONS,
  COVERAGE_OPTIONS,
  NATIONALITY_OPTIONS,
  PAYMENT_OPTIONS,
  PER_PAGE,
  PLAN_OPTIONS,
} from '@/helpers/constants'

import { paramsBuilder } from '../lib/build-beneficiaries-params'
import { fetchBeneficiaries } from '../services/beneficiaries-client.service'
import { fetchMockBeneficiaries } from '../services/beneficiaries-mock.service'
import type { BeneficiariesQueryState } from '../types/beneficiary.types'

const initialState: BeneficiariesQueryState = {
  pageIndex: 0,
  pageSize: PER_PAGE,
  search: '',
  plan: '',
  coverageStatus: '',
  paymentStatus: '',
  company: '',
  nationality: '',
  sortBy: '',
  sortOrder: 'desc',
}

async function fetchWithFallback(params: URLSearchParams, signal?: AbortSignal) {
  try {
    return await fetchBeneficiaries(params, signal)
  } catch (error) {
    console.warn('Supabase API failed. Falling back to mock data.', error)
    return fetchMockBeneficiaries(params)
  }
}

export function useBeneficiariesWithFallback() {
  const [query, setQuery] = useState<BeneficiariesQueryState>(initialState)
  const debouncedSearch = useDebouncedValue(query.search)

  const params = useMemo(
    () => paramsBuilder(query, debouncedSearch),
    [query, debouncedSearch]
  )

  const beneficiariesQuery = useQuery({
    queryKey: ['beneficiaries-fallback', params.toString()],
    queryFn: ({ signal }) => fetchWithFallback(params, signal),
    placeholderData: (previousData) => previousData,
  })

  return {
    query,
    setQuery,
    data: beneficiariesQuery.data ?? null,
    loading: beneficiariesQuery.isPending || beneficiariesQuery.isFetching,
    error:
      beneficiariesQuery.error instanceof Error
        ? beneficiariesQuery.error.message
        : null,
    retry: beneficiariesQuery.refetch,
    planOptions: PLAN_OPTIONS,
    coverageOptions: COVERAGE_OPTIONS,
    nationalityOptions: NATIONALITY_OPTIONS,
    paymentOptions: PAYMENT_OPTIONS,
    companyOptions: COMPANY_OPTIONS,
  }
}