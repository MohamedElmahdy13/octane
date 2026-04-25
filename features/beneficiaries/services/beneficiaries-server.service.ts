import 'server-only'

import { supabase } from '@/lib/supabase'
import {
  mapSupabaseBeneficiary,
  type SupabaseBeneficiary,
} from '../mappers/beneficiary.mapper'
import type { PaginatedBeneficiariesResponse } from '../types/beneficiary.types'

const SORT_COLUMN_MAP = {
  lastPaymentDate: 'last_payment_date',
  monthlyPremium: 'monthly_premium',
} as const

export async function getBeneficiaries(
  searchParams: URLSearchParams
): Promise<PaginatedBeneficiariesResponse> {
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const pageSize = Math.max(1, Number(searchParams.get('pageSize') ?? 10))

  const search = (searchParams.get('search') ?? '').trim()
  const nationality = (searchParams.get('nationality') ?? '').trim()
  const plan = (searchParams.get('plan') ?? '').trim()
  const coverageStatus = (searchParams.get('coverageStatus') ?? '').trim()
  const paymentStatus = (searchParams.get('paymentStatus') ?? '').trim()

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
      `full_name.ilike.%${search}%,email.ilike.%${search}%,nationality.ilike.%${search}%,policy_number.ilike.%${search}%`
    )
  }

  if (nationality) query = query.eq('nationality', nationality)
  if (plan) query = query.eq('plan', plan)
  if (coverageStatus) query = query.eq('coverage_status', coverageStatus)
  if (paymentStatus) query = query.eq('payment_status', paymentStatus)

  if (sortBy in SORT_COLUMN_MAP) {
    query = query.order(SORT_COLUMN_MAP[sortBy as keyof typeof SORT_COLUMN_MAP], {
      ascending: sortOrder === 'asc',
    })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const { data, count, error } = await query.range(from, to)

  if (error) {
    throw new Error(error.message)
  }

  return {
    data: (data as SupabaseBeneficiary[]).map(mapSupabaseBeneficiary),
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
  }
}