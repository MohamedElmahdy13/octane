import type { PaginatedBeneficiariesResponse } from '../types/beneficiary.types'

export async function fetchBeneficiaries(
  params: URLSearchParams,
  signal?: AbortSignal
): Promise<PaginatedBeneficiariesResponse> {
  const response = await fetch(`/api/beneficiaries?${params.toString()}`, {
    signal,
  })

  if (!response.ok) {
    const errorResult = await response.json().catch(() => null)

    throw new Error(
      errorResult?.message ?? 'Failed to load beneficiaries. Please try again.'
    )
  }

  return response.json()
}

