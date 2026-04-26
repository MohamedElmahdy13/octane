
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

