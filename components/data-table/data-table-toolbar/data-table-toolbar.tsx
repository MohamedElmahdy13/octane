import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

import { DataTableToolbarSearch } from './data-table-toolbar-search'
import { DataTableToolbarSelect } from './data-table-toolbar-select'
import type {
  DataTableFilter,
  FiltersDraft,
} from './table.types'

interface DataTableToolbarProps {
  search: string
  filters?: DataTableFilter[]
  selectedCount: number
  onResetFilters?: () => void
  onApplyFilters?: (draft: FiltersDraft) => void
  t: (key: string) => string
  hasActiveFilters?: boolean
}

function buildDraft(search: string, filters: DataTableFilter[]): FiltersDraft {
  return {
    search,
    ...Object.fromEntries(filters.map((filter) => [filter.key, filter.value])),
  }
}

export function DataTableToolbar({
                                   search,
                                   filters = [],
                                   onResetFilters,
                                   onApplyFilters,
                                   hasActiveFilters,
                                   t,
                                 }: DataTableToolbarProps) {
  const draftRef = useRef<FiltersDraft>(buildDraft(search, filters))
  const [isDirty, setIsDirty] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const initialDraft = useMemo(
    () => buildDraft(search, filters),
    [search, filters]
  )

  useEffect(() => {
    draftRef.current = initialDraft
    setIsDirty(false)
    setResetKey((prev) => prev + 1)
  }, [initialDraft])

  const markDirty = useCallback(() => {
    setIsDirty(true)
  }, [])

  const handleSearchChange = useCallback(
    (value: string) => {
      draftRef.current.search = value
      markDirty()
    },
    [markDirty]
  )

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      draftRef.current[key] = value
      markDirty()
    },
    [markDirty]
  )

  return (
    <div className="w-full">
      <div className="flex w-full flex-wrap items-center gap-3">
        <DataTableToolbarSearch
          value={search}
          resetKey={resetKey}
          placeholder={t('searchPlaceholder')}
          onChange={handleSearchChange}
        />

        {filters.map((filter) => (
          <DataTableToolbarSelect
            key={filter.key}
            filter={filter}
            value={filter.value}
            resetKey={resetKey}
            onChange={handleFilterChange}
          />
        ))}

        {onResetFilters ? (
          <Button
            type="button"
            variant="outline"
            onClick={onResetFilters}
            disabled={!hasActiveFilters}
            className="h-10 min-w-25"
          >
            {t('reset')}
          </Button>
        ) : null}

        {onApplyFilters ? (
          <Button
            type="button"
            onClick={() => onApplyFilters(draftRef.current)}
            disabled={!isDirty}
            className="h-10 min-w-24"
          >
            {t('apply')}
          </Button>
        ) : null}
      </div>
    </div>
  )
}