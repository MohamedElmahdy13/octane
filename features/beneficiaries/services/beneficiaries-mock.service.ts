import type { PaginatedBeneficiariesResponse } from '../types/beneficiary.types'

export async function fetchMockBeneficiaries(
  params: URLSearchParams
): Promise<PaginatedBeneficiariesResponse> {
  const response = await fetch(`/mock/beneficiaries.json`)

  if (!response.ok) {
    throw new Error('Failed to load fallback mock data.')
  }

  const data = await response.json()

  const page = Number(params.get('page') ?? 1)
  const pageSize = Number(params.get('pageSize') ?? 10)

  const start = (page - 1) * pageSize
  const end = start + pageSize

  const paginatedData = data.slice(start, end)

  return {
    data: paginatedData,
    total: data.length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(data.length / pageSize)),
  }
}