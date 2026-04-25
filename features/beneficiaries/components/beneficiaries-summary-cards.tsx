'use client'

import { AlertTriangle, CreditCard, ShieldCheck, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card, CardContent } from '@/components/ui/card'
import type { Beneficiary } from '../types/beneficiary.types'

interface BeneficiariesSummaryCardsProps {
  beneficiaries: Beneficiary[]
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function BeneficiariesSummaryCards({
                                            beneficiaries,
                                          }: BeneficiariesSummaryCardsProps) {
  const t = useTranslations('summary')

  const totalBeneficiaries = beneficiaries.length

  const activeCoverage = beneficiaries.filter(
    (beneficiary) => beneficiary.coverageStatus === 'Active'
  ).length

  const overduePayments = beneficiaries.filter(
    (beneficiary) => beneficiary.payment.paymentStatus === 'Overdue'
  ).length

  const totalMonthlyPremium = beneficiaries.reduce(
    (sum, beneficiary) => sum + beneficiary.payment.monthlyPremium,
    0
  )

  const cards = [
    {
      title: t('summaryTotalBeneficiaries'),
      value: totalBeneficiaries,
      icon: Users,
      description: t('summaryTotalBeneficiariesDescription'),
    },
    {
      title: t('summaryActiveCoverage'),
      value: activeCoverage,
      icon: ShieldCheck,
      description: t('summaryActiveCoverageDescription'),
    },
    {
      title: t('summaryOverduePayments'),
      value: overduePayments,
      icon: AlertTriangle,
      description: t('summaryOverduePaymentsDescription'),
    },
    {
      title: t('summaryMonthlyPremium'),
      value: formatCurrency(totalMonthlyPremium),
      icon: CreditCard,
      description: t('summaryMonthlyPremiumDescription'),
    },
  ]

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <Card key={card.title} className="border bg-card shadow-sm">
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {card.description}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}