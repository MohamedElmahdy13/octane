import { TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

interface DataTableSkeletonProps {
  rows?: number
  columns: number
}

export function DataTableSkeleton({
                                    rows = 8,
                                    columns,
                                  }: DataTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <TableCell key={columnIndex}>
              <Skeleton className="h-4 w-full max-w-35" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}