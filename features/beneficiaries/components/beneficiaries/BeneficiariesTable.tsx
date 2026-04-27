'use client'

import { useMemo } from 'react'
import { Ban, Edit, Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { DataTable } from '@/components/data-table/DataTable'
import { DataTableError } from '@/components/data-table/DataTableError'

import { getBeneficiaryColumns } from '@/features/beneficiaries/lib/get-beneficiary-columns'
import { useBeneficiariesQueryTable as useBeneficiariesTable } from '@/features/beneficiaries/hooks/use-beneficiaries-query-table'
import { BeneficiariesSummaryCards } from '@/features/beneficiaries/components/BeneficiariesSummaryCards'
import type { DataTableFilter, FiltersDraft } from "@/components/data-table/data-table-toolbar/table.types"

export function BeneficiariesTable() {
  const t = useTranslations('table')

  const {
    query,
    setQuery,
    data,
    loading,
    error,
    retry,
    nationalityOptions,
    planOptions,
    coverageOptions,
    paymentOptions,
  } = useBeneficiariesTable()

  const columns = useMemo(
    () =>
      getBeneficiaryColumns(
        {
          sortBy: query.sortBy,
          sortOrder: query.sortOrder,
        },
        setQuery
      ),
    [query.sortBy, query.sortOrder, setQuery]
  )
  const filters: DataTableFilter[] = useMemo(
    () => [
      {
        key: 'nationality',
        label: t('allNationalities'),
        value: query.nationality,
        options: nationalityOptions,
      },
      {
        key: 'plan',
        label: t('allPlans'),
        value: query.plan,
        options: planOptions,
      },
      {
        key: 'coverageStatus',
        label: t('allCoverage'),
        value: query.coverageStatus,
        options: coverageOptions,
      },
      {
        key: 'paymentStatus',
        label: t('allPayments'),
        value: query.paymentStatus,
        options: paymentOptions,
      },
    ],
    [
      t,
      query.nationality,
      query.plan,
      query.coverageStatus,
      query.paymentStatus,
      nationalityOptions,
      planOptions,
      coverageOptions,
      paymentOptions,
    ]
  )

  const hasActiveFilters = Boolean(
    query.search ||
    query.nationality ||
    query.plan ||
    query.coverageStatus ||
    query.paymentStatus ||
    query.company ||
    query.sortBy
  )

  const applyFilters = (draft: FiltersDraft) => {
    setQuery((prev) => ({
      ...prev,
      pageIndex: 0,
      search: draft.search,
      nationality: draft.nationality ?? '',
      plan: draft.plan ?? '',
      coverageStatus: draft.coverageStatus ?? '',
      paymentStatus: draft.paymentStatus ?? '',
      company: draft.company ?? '',
    }))
  }

  const resetFilters = () => {
    setQuery((prev) => ({
      ...prev,
      pageIndex: 0,
      search: '',
      nationality: '',
      plan: '',
      coverageStatus: '',
      paymentStatus: '',
      company: '',
      sortBy: '',
      sortOrder: 'desc',
    }))
  }

  return (
    <>
      <BeneficiariesSummaryCards beneficiaries={data?.data ?? []} />

      {error ? (
        <DataTableError onRetry={retry} isRetrying={loading} message={error} />
      ) : (
        <DataTable
          data={data?.data ?? []}
          columns={columns}
          loading={loading}
          search={query.search}
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
          pagination={{
            pageIndex: query.pageIndex,
            pageSize: query.pageSize,
          }}
          total={data?.total ?? 0}
          pageCount={data?.totalPages ?? 1}
          onPaginationChange={(updaterOrValue) => {
            setQuery((prev) => {
              const nextPagination =
                typeof updaterOrValue === 'function'
                  ? updaterOrValue({
                    pageIndex: prev.pageIndex,
                    pageSize: prev.pageSize,
                  })
                  : updaterOrValue

              return {
                ...prev,
                pageIndex: nextPagination.pageIndex,
                pageSize: nextPagination.pageSize,
              }
            })
          }}
          enableSelection
          actions={[
            {
              label: t('view'),
              icon: Eye,
              onClick: (row) => alert(`View beneficiary ${row.fullName}`),
            },
            {
              label: t('edit'),
              icon: Edit,
              onClick: (row) => alert(`Edit beneficiary ${row.fullName}`),
            },
            {
              label: t('suspend'),
              icon: Ban,
              onClick: (row) => alert(`Suspend beneficiary ${row.fullName}`),
            },
          ]}
        />
      )}
    </>
  )
}