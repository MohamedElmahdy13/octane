import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface DataTableFilter {
  key: string
  label: string
  value: string
  options: string[]
}

export type FiltersDraft = {
  search: string
  [key: string]: string
}

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

const SearchInput = memo(function SearchInput({
                                                value,
                                                resetKey,
                                                placeholder,
                                                onChange,
                                              }: {
  value: string
  resetKey: number
  placeholder: string
  onChange: (value: string) => void
}) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value, resetKey])

  return (
    <Input
      value={localValue}
      onChange={(event) => {
        const nextValue = event.target.value
        setLocalValue(nextValue)
        onChange(nextValue)
      }}
      placeholder={placeholder}
      className="h-10 min-w-65 flex-1"
    />
  )
})

const FilterSelect = memo(function FilterSelect({
                                                  filter,
                                                  value,
                                                  resetKey,
                                                  onChange,
                                                }: {
  filter: DataTableFilter
  value: string
  resetKey: number
  onChange: (key: string, value: string) => void
}) {
  const [localValue, setLocalValue] = useState(value || 'all')

  useEffect(() => {
    setLocalValue(value || 'all')
  }, [value, resetKey])

  return (
    <Select
      value={localValue}
      onValueChange={(selectedValue) => {
        setLocalValue(selectedValue)
        onChange(filter.key, selectedValue === 'all' ? '' : selectedValue)
      }}
    >
      <SelectTrigger className="h-10 min-w-37.5 flex-1 px-3 xl:flex-none">
        <SelectValue placeholder={filter.label} />
      </SelectTrigger>

      <SelectContent className="p-1.5">
        <SelectItem value="all">{filter.label}</SelectItem>

        {filter.options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
})

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
    setIsDirty((prev) => prev || true)
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

  const handleApply = () => {
    onApplyFilters?.(draftRef.current)
  }

  const handleReset = () => {
    onResetFilters?.()
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          resetKey={resetKey}
          placeholder={t('searchPlaceholder')}
          onChange={handleSearchChange}
        />

        {filters.map((filter) => (
          <FilterSelect
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
            onClick={handleReset}
            disabled={!hasActiveFilters}
            className="h-10 min-w-25"
          >
            {t('reset')}
          </Button>
        ) : null}

        {onApplyFilters ? (
          <Button
            type="button"
            onClick={handleApply}
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