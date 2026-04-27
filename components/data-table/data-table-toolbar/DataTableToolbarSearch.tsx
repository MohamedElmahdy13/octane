import { memo, useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'

interface DataTableToolbarSearchProps {
  value: string
  resetKey: number
  placeholder: string
  onChange: (value: string) => void
}

export const DataTableToolbarSearch = memo(function DataTableToolbarSearch({
                                                                             value,
                                                                             resetKey,
                                                                             placeholder,
                                                                             onChange,
                                                                           }: DataTableToolbarSearchProps) {
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