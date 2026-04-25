/* eslint-disable react-hooks/incompatible-library */
"use client"

import * as React from "react"
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ExpandedState,
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
} from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import {
  buildInternalColumns,
  type DataTableAction,
} from "./build-internal-columns"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTableBody } from "./data-table-body"
import { DataTablePagination } from "./data-table-pagination"
import type { DataTableFilter } from "./data-table-toolbar"
interface DataTableProps<TData extends { id: number | string }> {
  data: TData[]
  columns: ColumnDef<TData>[]
  loading: boolean
  search: string
  onSearchChange: (value: string) => void
  filters?: DataTableFilter[]
  onResetFilters?: () => void
  pagination: PaginationState
  pageCount: number
  onPaginationChange: OnChangeFn<PaginationState>
  enableSelection?: boolean
  enableExpandable?: boolean
  renderExpandedRow?: (row: TData) => React.ReactNode
  actions?: DataTableAction<TData>[]
  hasActiveFilters?: boolean
  total: number
}

export function DataTable<TData extends { id: number | string }>({
  data,
  columns,
  loading,
  search,
  onSearchChange,
  filters,
  onResetFilters,
  hasActiveFilters=false,
  pagination,
  pageCount,
  total ,
  onPaginationChange,
  enableSelection = false,
  enableExpandable = false,
  renderExpandedRow,
  actions = [],
}: DataTableProps<TData>) {
  const t = useTranslations("table")
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const internalColumns = React.useMemo(
    () =>
      buildInternalColumns({
        columns,
        enableSelection,
        enableExpandable,
        actions,
        t,
      }),
    [actions, columns, enableExpandable, enableSelection, t]
  )

  const table = useReactTable({
    data,
    columns: internalColumns,
    pageCount,
    state: {
      rowSelection,
      expanded,
      pagination,
    },
    getRowId: (row) => String(row.id),
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
    enableRowSelection: enableSelection,
  })

  const selectedCount = Object.keys(rowSelection).length

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <DataTableToolbar
          search={search}
          onSearchChange={onSearchChange}
          filters={filters}
          selectedCount={selectedCount}
          onResetFilters={onResetFilters}
          hasActiveFilters={hasActiveFilters}
          t={t}
        />
        <DataTableBody
          table={table}
          loading={loading}
          renderExpandedRow={renderExpandedRow}
          enableExpandable={enableExpandable}
          t={t}
        />

        <DataTablePagination
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={onPaginationChange}
          total={total}
        />
      </CardContent>
    </Card>
  )
}
