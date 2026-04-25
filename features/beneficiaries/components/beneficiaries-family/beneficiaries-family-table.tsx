"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Ban, Edit, Eye } from 'lucide-react';
import { DataTable } from "@/components/data-table/data-table";
import { getBeneficiaryColumns } from "../../lib/get-beneficiary-columns";
import { BeneficiaryFamilyRow } from "./beneficiary-family-row";
import { useBeneficiariesTable } from "../../hooks/use-beneficiaries-table";
import { BeneficiariesSummaryCards } from "@/features/beneficiaries/components/beneficiaries-summary-cards"
import { DataTableError } from "@/components/data-table/tests/data-table-error"

export function BeneficiariesFamilyTable() {
  const t = useTranslations("table");
  const { query,
    setQuery,
    data,
    loading,
    error,
    retry,
    nationalityOptions,
    planOptions,
    coverageOptions,
    paymentOptions, } =
    useBeneficiariesTable();

  const columns = useMemo(
    () => getBeneficiaryColumns(query, setQuery),
    [query.sortBy, query.sortOrder, setQuery]
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

  return (
    <>
      <BeneficiariesSummaryCards beneficiaries={data?.data ?? []} />
      {error ? <DataTableError onRetry={retry} isRetrying={loading} message={error}/>:      <DataTable
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
            label: t('allNationalities'),
            value: query.nationality,
            options: nationalityOptions,
            onChange: (value) =>
              setQuery((prev) => ({ ...prev, pageIndex: 0, nationality: value })),
          },
          {
            key: 'plan',
            label: t('allPlans'),
            value: query.plan,
            options: planOptions,
            onChange: (value) =>
              setQuery((prev) => ({ ...prev, pageIndex: 0, plan: value })),
          },
          {
            key: 'coverageStatus',
            label: t('allCoverage'),
            value: query.coverageStatus,
            options: coverageOptions,
            onChange: (value) =>
              setQuery((prev) => ({ ...prev, pageIndex: 0, coverageStatus: value })),
          },
          {
            key: 'paymentStatus',
            label: t('allPayments'),
            value: query.paymentStatus,
            options: paymentOptions,
            onChange: (value) =>
              setQuery((prev) => ({ ...prev, pageIndex: 0, paymentStatus: value })),
          },
        ]}
        hasActiveFilters={hasActiveFilters}
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
        total={data?.total ?? 0}
        pageCount={data?.totalPages ?? 1}
        onPaginationChange={(updaterOrValue) => {
          setQuery((prev) => {
            const nextPagination =
              typeof updaterOrValue === "function"
                ? updaterOrValue({
                  pageIndex: prev.pageIndex,
                  pageSize: prev.pageSize,
                })
                : updaterOrValue;

            return {
              ...prev,
              pageIndex: nextPagination.pageIndex,
              pageSize: nextPagination.pageSize,
            };
          });
        }}
        enableExpandable
        renderExpandedRow={(row) => (
          <BeneficiaryFamilyRow beneficiary={row} />
        )}
        actions={[
          {
            label: t("view"),
            icon: Eye,
            onClick: (row) => alert(`View beneficiary ${row.fullName}`),
          },
          {
            label: t("edit"),
            icon: Edit,
            onClick: (row) => alert(`Edit beneficiary ${row.fullName}`),
          },
          {
            label: t("suspend"),
            icon: Ban,
            onClick: (row) => alert(`Suspend beneficiary ${row.fullName}`),
          },
        ]}
      />}
    </>

  );
}