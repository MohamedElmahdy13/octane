import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export interface DataTableFilter {
  key: string
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

interface DataTableToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  filters?: DataTableFilter[]
  selectedCount: number
  onResetFilters?: () => void
  t: (key: string) => string
  hasActiveFilters?: boolean
}

export function DataTableToolbar({
  search,
  onSearchChange,
  filters = [],
  onResetFilters,
  hasActiveFilters,
  t,
}: DataTableToolbarProps) {
  return (
    <div className="w-full">
      <div className="flex w-full flex-wrap items-center gap-3">
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t("searchPlaceholder")}
          className="h-10 min-w-[260px] flex-1"
        />

        {filters.map((filter) => (
          <Select
            key={filter.key}
            value={filter.value}
            onChange={(event) => filter.onChange(event.target.value)}
            className="h-10 min-w-[150px] flex-1 xl:flex-none"
          >
            <option value="">{filter.label}</option>

            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        ))}

        {onResetFilters ? (
          <Button
            type="button"
            variant="outline"
            onClick={onResetFilters}
            disabled={!hasActiveFilters}
            className="h-10 min-w-25"
          >
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  )
}
