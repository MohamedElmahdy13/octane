import * as React from 'react'
import { flexRender, type Table as TanstackTable } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTableSkeleton } from './data-table-skeleton'
interface DataTableBodyProps<TData extends { id: number | string }> {
  table: TanstackTable<TData>
  loading: boolean
  renderExpandedRow?: (row: TData) => React.ReactNode
  enableExpandable: boolean
  t: (key: string) => string
}

export function DataTableBody<TData extends { id: number | string }>({
                                                                       table,
                                                                       loading,
                                                                       renderExpandedRow,
                                                                       enableExpandable,
                                                                       t,
                                                                     }: DataTableBodyProps<TData>) {
  const visibleColumnCount = table.getVisibleLeafColumns().length

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading ? (
            <DataTableSkeleton columns={visibleColumnCount} rows={8} />
          ) : table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={visibleColumnCount}>{t('empty')}</TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() ? 'selected' : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>

                {enableExpandable && row.getIsExpanded() && renderExpandedRow ? (
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumnCount}
                      className="bg-muted/30"
                    >
                      {renderExpandedRow(row.original)}
                    </TableCell>
                  </TableRow>
                ) : null}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}