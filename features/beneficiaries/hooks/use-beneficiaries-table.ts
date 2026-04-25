'use client'

import { useEffect, useMemo, useState } from "react"

import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import {
  COMPANY_OPTIONS,
  COVERAGE_OPTIONS,
  NATIONALITY_OPTIONS,
  PAYMENT_OPTIONS,
  PER_PAGE,
  PLAN_OPTIONS,
} from '@/helpers/constants'

import type {
  BeneficiariesQueryState,
  PaginatedBeneficiariesResponse,
} from '../types/beneficiary.types'
import { fetchBeneficiaries } from '../services/beneficiaries-client.service'
import { buildBeneficiariesParams, paramsBuilder } from "../lib/build-beneficiaries-params"

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

export function useBeneficiariesTable() {
  const [query, setQuery] = useState<BeneficiariesQueryState>(initialState)
  const debouncedSearch = useDebouncedValue(query.search)

  const [data, setData] = useState<PaginatedBeneficiariesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)
  const params = useMemo(
    () => paramsBuilder(query, debouncedSearch),
    [query, debouncedSearch]
  )
  useEffect(() => {
    if (query.search !== debouncedSearch) return

    const controller = new AbortController()

    async function loadBeneficiaries() {
      try {
        setLoading(true)
        setError(null)


        const result = await fetchBeneficiaries(params, controller.signal)

        if (!controller.signal.aborted) {
          setData(result)
        }
      } catch (error) {
        if (controller.signal.aborted) return

        setError(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'
        )
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

     loadBeneficiaries()

    return () => controller.abort()
  }, [query, debouncedSearch, retryKey])

  return {
    query,
    setQuery,
    data,
    loading,
    error,
    retry: () => setRetryKey((prev) => prev + 1),

    planOptions: PLAN_OPTIONS,
    coverageOptions: COVERAGE_OPTIONS,
    nationalityOptions: NATIONALITY_OPTIONS,
    paymentOptions: PAYMENT_OPTIONS,
    companyOptions: COMPANY_OPTIONS,
  }
}