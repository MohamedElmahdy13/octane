import type { BeneficiariesQueryState } from '../types/beneficiary.types'

export function buildBeneficiariesParams(
  query: BeneficiariesQueryState,
  search: string
): URLSearchParams {
  const params = new URLSearchParams()

  params.set('page', String(query.pageIndex + 1))
  params.set('pageSize', String(query.pageSize))

  if (search) params.set('search', search)
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

export function paramsBuilder(
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