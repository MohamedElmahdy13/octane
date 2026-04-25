'use client'

import type { Dispatch, SetStateAction } from 'react'
import { ArrowUpDown } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/helpers/format-currency'
import { formatDate } from '@/helpers/format-date'
import type {
  Beneficiary,
  BeneficiariesQueryState,
} from '../types/beneficiary.types'

export function getBeneficiaryColumns(
  query: BeneficiariesQueryState,
  setQuery: Dispatch<SetStateAction<BeneficiariesQueryState>>
): ColumnDef<Beneficiary>[] {
  const toggleSort = (sortBy: 'monthlyPremium' | 'lastPaymentDate') => {
    setQuery((prev) => ({
      ...prev,
      pageIndex: 0,
      sortBy,
      sortOrder:
        prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }))
  }

  const sortIcon = (sortBy: 'monthlyPremium' | 'lastPaymentDate') => (
    <ArrowUpDown
      className={`h-3.5 w-3.5 ${
        query.sortBy === sortBy ? 'text-primary' : 'text-muted-foreground'
      }`}
    />
  )

  return [
    {
      accessorKey: 'fullName',
      header: 'Beneficiary',
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium">{row.original.fullName}</p>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.email}
        </span>
      ),
    },
    {
      accessorKey: 'policyNumber',
      header: 'Policy Number',
    },
    {
      accessorKey: 'company',
      header: 'Company',
    },
    {
      accessorKey: 'plan',
      header: 'Plan',
      cell: ({ row }) => {
        const plan = row.original.plan

        if (plan === 'Platinum') return <Badge>{plan}</Badge>
        if (plan === 'Gold') return <Badge variant="warning">{plan}</Badge>

        return <Badge variant="secondary">{plan}</Badge>
      },
    },
    {
      accessorKey: 'coverageStatus',
      header: 'Coverage',
      cell: ({ row }) => {
        const status = row.original.coverageStatus

        if (status === 'Active') return <Badge variant="success">{status}</Badge>
        if (status === 'Suspended') return <Badge variant="warning">{status}</Badge>

        return <Badge variant="secondary">{status}</Badge>
      },
    },
    {
      id: 'paymentStatus',
      header: 'Payment',
      cell: ({ row }) => {
        const status = row.original.payment.paymentStatus

        if (status === 'Paid') return <Badge variant="success">{status}</Badge>
        if (status === 'Pending') return <Badge variant="warning">{status}</Badge>

        return <Badge variant="destructive">{status}</Badge>
      },
    },
    {
      id: 'monthlyPremium',
      header: () => (
        <button
          type="button"
          onClick={() => toggleSort('monthlyPremium')}
          className="flex items-center gap-1 font-medium hover:text-primary"
        >
          Monthly Premium
          {sortIcon('monthlyPremium')}
        </button>
      ),
      cell: ({ row }) => formatCurrency(row.original.payment.monthlyPremium),
    },
    {
      id: 'lastPaymentDate',
      header: () => (
        <button
          type="button"
          onClick={() => toggleSort('lastPaymentDate')}
          className="flex items-center gap-1 font-medium hover:text-primary"
        >
          Last Payment
          {sortIcon('lastPaymentDate')}
        </button>
      ),
      cell: ({ row }) => formatDate(row.original.payment.lastPaymentDate),
    },
  ]
}