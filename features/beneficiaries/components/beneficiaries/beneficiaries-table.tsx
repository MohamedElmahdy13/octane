'use client'

import { useMemo } from 'react'
import { Ban, Edit, Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { DataTable } from '@/components/data-table/data-table'
import { getBeneficiaryColumns } from "@/features/beneficiaries/lib/get-beneficiary-columns"
import { useBeneficiariesTable } from "@/features/beneficiaries/hooks/use-beneficiaries-table"
import { BeneficiariesSummaryCards } from "@/features/beneficiaries/components/beneficiaries-summary-cards"
import { DataTableError } from "@/components/data-table/data-table-error"

export function BeneficiariesTable() {
  const t = useTranslations('table')

  const {
    query,
    setQuery,
    data,
    loading,
    error,
    nationalityOptions,
    planOptions,
    coverageOptions,
    paymentOptions,
  } = useBeneficiariesTable()

  const columns = useMemo(
    () => getBeneficiaryColumns(query, setQuery),
    [query.sortBy, query.sortOrder, setQuery]
  );

  return (
   <>
     <BeneficiariesSummaryCards beneficiaries={data?.data ?? []} />
     {
       error ? <DataTableError  message={error}/>:<DataTable
         data={data?.data ?? []}
         columns={columns}
         loading={loading}
         search={query.search}
         onSearchChange={(value) =>
           setQuery((prev) => ({
             ...prev,
             pageIndex: 0,
             search: value,
           }))
         }
         filters={[
           {
             key: 'nationality',
             label: 'All nationalities',
             value: query.nationality,
             options: nationalityOptions,
             onChange: (value) =>
               setQuery((prev) => ({
                 ...prev,
                 pageIndex: 0,
                 nationality: value,
               })),
           },
           {
             key: 'plan',
             label: 'All plans',
             value: query.plan,
             options: planOptions,
             onChange: (value) =>
               setQuery((prev) => ({
                 ...prev,
                 pageIndex: 0,
                 plan: value,
               })),
           },
           {
             key: 'coverageStatus',
             label: 'All coverage',
             value: query.coverageStatus,
             options: coverageOptions,
             onChange: (value) =>
               setQuery((prev) => ({
                 ...prev,
                 pageIndex: 0,
                 coverageStatus: value,
               })),
           },
           {
             key: 'paymentStatus',
             label: 'All payments',
             value: query.paymentStatus,
             options: paymentOptions,
             onChange: (value) =>
               setQuery((prev) => ({
                 ...prev,
                 pageIndex: 0,
                 paymentStatus: value,
               })),
           },
         ]}
         onResetFilters={() =>
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
         pagination={{
           pageIndex: query.pageIndex,
           pageSize: query.pageSize,
         }}
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
     }

   </>
  )
}