import { memo, useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { DataTableFilter } from './table.types'

interface DataTableToolbarSelectProps {
  filter: DataTableFilter
  value: string
  resetKey: number
  onChange: (key: string, value: string) => void
}

export const DataTableToolbarSelect = memo(function DataTableToolbarSelect({
                                                                             filter,
                                                                             value,
                                                                             resetKey,
                                                                             onChange,
                                                                           }: DataTableToolbarSelectProps) {
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