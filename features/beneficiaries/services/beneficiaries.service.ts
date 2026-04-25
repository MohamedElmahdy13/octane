import { supabase } from '@/lib/supabase'
import {
  mapSupabaseBeneficiary,
  type SupabaseBeneficiary,
} from '../mappers/beneficiary.mapper'
import type { PaginatedBeneficiariesResponse } from '../types/beneficiary.types'

export async function getBeneficiaries(
  searchParams: URLSearchParams
): Promise<PaginatedBeneficiariesResponse> {
  const page = Number(searchParams.get('page') ?? 1)
  const pageSize = Number(searchParams.get('pageSize') ?? 10)

  const search = (searchParams.get('search') ?? '').trim()
  const nationality = (searchParams.get('nationality') ?? '').trim()
  const plan = (searchParams.get('plan') ?? '').trim()
  const coverageStatus = (searchParams.get('coverageStatus') ?? '').trim()
  const paymentStatus = (searchParams.get('paymentStatus') ?? '').trim()

  // ✅ NEW: sorting
  const sortBy = (searchParams.get('sortBy') ?? '').trim()
  const sortOrder = (searchParams.get('sortOrder') ?? 'desc').trim()

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('beneficiaries')
    .select(
      `
        *,
        family_members (*)
      `,
      { count: 'exact' }
    )

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,email.ilike.%${search}%,nationality.ilike.%${search}%`
    )
  }

  if (nationality) {
    query = query.eq('nationality', nationality)
  }

  if (plan) {
    query = query.eq('plan', plan)
  }

  if (coverageStatus) {
    query = query.eq('coverage_status', coverageStatus)
  }

  if (paymentStatus) {
    query = query.eq('payment_status', paymentStatus)
  }

  // ✅ sorting mapping
  const sortColumnMap = {
    lastPaymentDate: 'last_payment_date',
    monthlyPremium: 'monthly_premium',
  } as const

  if (sortBy && sortBy in sortColumnMap) {
    query = query.order(sortColumnMap[sortBy as keyof typeof sortColumnMap], {
      ascending: sortOrder === 'asc',
    })
  } else {
    // default sorting
    query = query.order('created_at', { ascending: false })
  }

  const { data, count, error } = await query.range(from, to)

  if (error) {
    throw new Error(error.message)
  }

  const mappedData = (data as SupabaseBeneficiary[]).map(
    mapSupabaseBeneficiary
  )

  return {
    data: mappedData,
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
  }
}