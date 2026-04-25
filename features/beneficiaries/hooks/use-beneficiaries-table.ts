"use client"

import { useEffect, useMemo, useState } from "react"
import type {
  BeneficiariesQueryState,
  PaginatedBeneficiariesResponse,
} from "../types/beneficiary.types"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"

const initialState: BeneficiariesQueryState = {
  pageIndex: 0,
  pageSize: 10,
  search: "",
  plan: "",
  coverageStatus: "",
  paymentStatus: "",
  company: "",
  nationality: "",
  sortBy: "",
  sortOrder: "desc",
}

export function useBeneficiariesTable() {
  const [query, setQuery] = useState<BeneficiariesQueryState>(initialState)
  const debouncedSearch = useDebouncedValue(query.search)

  const [data, setData] = useState<PaginatedBeneficiariesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    if (query.search !== debouncedSearch) {
      return
    }

    const controller = new AbortController()

    async function loadBeneficiaries() {
      try {
        setError(null)
        setLoading(true)

        const params = new URLSearchParams({
          page: String(query.pageIndex + 1),
          pageSize: String(query.pageSize),
          search: debouncedSearch,
        })

        if (query.plan) params.set("plan", query.plan)
        if (query.coverageStatus)
          params.set("coverageStatus", query.coverageStatus)
        if (query.paymentStatus)
          params.set("paymentStatus", query.paymentStatus)
        if (query.company) params.set("company", query.company)
        if (query.nationality) params.set("nationality", query.nationality)

        if (query.sortBy) {
          params.set("sortBy", query.sortBy)
          params.set("sortOrder", query.sortOrder)
        }

        const response = await fetch(
          `/api/beneficiaries?${params.toString()}`,
          {
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          const errorResult = await response.json().catch(() => null)

          throw new Error(
            errorResult?.message ??
              "Failed to load beneficiaries. Please try again."
          )
        }

        const result: PaginatedBeneficiariesResponse = await response.json()

        if (!controller.signal.aborted) {
          setData(result)
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
        )
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadBeneficiaries()

    return () => controller.abort()
  }, [
    query.pageIndex,
    query.pageSize,
    query.search,
    query.plan,
    query.coverageStatus,
    query.paymentStatus,
    query.company,
    query.nationality,
    query.sortBy,
    query.sortOrder,
    debouncedSearch,
    retryKey,
  ])

  const planOptions = useMemo(() => ["Silver", "Gold", "Platinum"], [])
  const coverageOptions = useMemo(() => ["Active", "Suspended", "Expired"], [])
  const paymentOptions = useMemo(() => ["Paid", "Pending", "Overdue"], [])
  const nationalityOptions = useMemo(
    () => ["Egyptian", "Syrian", "Lebanese", "Saudi"],
    []
  )
  const companyOptions = useMemo(
    () => [
      "FinServe Egypt",
      "Nile Tech",
      "AXA Group",
      "MedCare Solutions",
      "Delta Finance",
    ],
    []
  )

  return {
    query,
    setQuery,
    data,
    loading,
    error,
    retry: () => setRetryKey((prev) => prev + 1),
    planOptions,
    coverageOptions,
    nationalityOptions,
    paymentOptions,
    companyOptions,
  }
}
