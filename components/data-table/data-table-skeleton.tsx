import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

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
          {Array.from({ length: columns }).map((_, columnIndex) => {
            const isFirstColumn = columnIndex === 0
            const isLastColumn = columnIndex === columns - 1

            return (
              <TableCell key={columnIndex}>
                {isFirstColumn || isLastColumn ? (
                  <Skeleton className="h-8 w-8 rounded-md" />
                ) : columnIndex === 1 ? (
                  <Skeleton className="h-4 w-full max-w-30" />
                ) : (
                  <Skeleton className="h-4 w-full max-w-22.5" />
                )}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </>
  )
}
