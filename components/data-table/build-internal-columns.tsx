import type { ColumnDef } from '@tanstack/react-table'
import type { LucideIcon } from 'lucide-react'
import { MoreVertical } from 'lucide-react'
import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface DataTableAction<T> {
  label: string
  icon?: LucideIcon
  onClick: (row: T) => void
}

interface BuildInternalColumnsParams<TData extends { id: number | string }> {
  columns: ColumnDef<TData>[]
  enableSelection: boolean
  enableExpandable: boolean
  actions: DataTableAction<TData>[]
  t: (key: string) => string
}

export function buildInternalColumns<TData extends { id: number | string }>({
                                                                              columns,
                                                                              enableSelection,
                                                                              enableExpandable,
                                                                              actions,
                                                                              t,
                                                                            }: BuildInternalColumnsParams<TData>): ColumnDef<TData>[] {
  const mappedColumns = [...columns]

  if (enableSelection) {
    mappedColumns.unshift({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onChange={(event) =>
            table.toggleAllPageRowsSelected(event.currentTarget.checked)
          }
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={(event) => row.toggleSelected(event.currentTarget.checked)}
        />
      ),
    })
  }

  if (enableExpandable) {
    mappedColumns.unshift({
      id: 'expander',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => row.toggleExpanded()}
          >
            {row.getIsExpanded() ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>
      ),
    })
  }

  if (actions.length > 0) {
    mappedColumns.push({
      id: 'rowActions',
      header: t('actions'),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open row actions">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {actions.map((action) => {
              const Icon = action.icon

              return (
                <DropdownMenuItem
                  key={action.label}
                  onClick={() => action.onClick(row.original)}
                >
                  {Icon ? <Icon className="me-2 h-4 w-4" /> : null}
                  {action.label}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    })
  }

  return mappedColumns
}