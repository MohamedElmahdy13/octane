import type { Beneficiary } from '../types/beneficiary.types'

type SupabaseFamilyMember = {
  id: string
  full_name: string
  relationship: Beneficiary['familyMembers'][number]['relationship']
  gender: Beneficiary['familyMembers'][number]['gender']
  date_of_birth: string
  is_covered: boolean
}

export type SupabaseBeneficiary = {
  id: string
  full_name: string
  email: string
  nationality: Beneficiary['nationality']
  policy_number: string
  company: string
  plan: Beneficiary['plan']
  coverage_status: Beneficiary['coverageStatus']
  start_date: string
  end_date: string
  monthly_premium: number
  outstanding_amount: number
  last_payment_date: string
  payment_status: Beneficiary['payment']['paymentStatus']
  family_members?: SupabaseFamilyMember[]
}

export function mapSupabaseBeneficiary(
  row: SupabaseBeneficiary
): Beneficiary {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    nationality: row.nationality,
    policyNumber: row.policy_number,
    company: row.company,
    plan: row.plan,
    coverageStatus: row.coverage_status,
    startDate: row.start_date,
    endDate: row.end_date,
    payment: {
      monthlyPremium: Number(row.monthly_premium),
      outstandingAmount: Number(row.outstanding_amount),
      lastPaymentDate: row.last_payment_date,
      paymentStatus: row.payment_status,
    },

    familyMembers:
      row.family_members?.map((member) => ({
        id: member.id,
        fullName: member.full_name,
        relationship: member.relationship,
        gender: member.gender,
        dateOfBirth: member.date_of_birth,
        isCovered: member.is_covered,
      })) ?? [],
  }
}