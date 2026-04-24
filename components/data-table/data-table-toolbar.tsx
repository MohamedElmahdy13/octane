import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

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
  enableSelection: boolean
  enableExpandable: boolean
  selectedCount: number
  t: (key: string) => string
}

export function DataTableToolbar({
                                   search,
                                   onSearchChange,
                                   filters = [],
                                   enableSelection,
                                   enableExpandable,
                                   selectedCount,
                                   t,
                                 }: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-[minmax(280px,1.4fr)_repeat(4,minmax(170px,1fr))]">
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('searchPlaceholder')}
          className="min-w-65"
        />

        {filters.map((filter) => (
          <Select
            key={filter.key}
            value={filter.value}
            onChange={(event) => filter.onChange(event.target.value)}
          >
            <option value="">{filter.label}</option>
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        ))}
      </div>

      {/*<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">*/}
      {/*  {enableSelection ? <span>{t('selectionEnabled')}</span> : null}*/}
      {/*  {enableExpandable ? <span>{t('expandableEnabled')}</span> : null}*/}
      {/*  {enableSelection && selectedCount > 0 ? (*/}
      {/*    <span>*/}
      {/*      {selectedCount} {t('rowsSelected')}*/}
      {/*    </span>*/}
      {/*  ) : null}*/}
      {/*</div>*/}
    </div>
  )
}