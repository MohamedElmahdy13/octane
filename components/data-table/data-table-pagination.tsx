import type { OnChangeFn, PaginationState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

interface DataTablePaginationProps {
  pagination: PaginationState
  pageCount: number
  onPaginationChange: OnChangeFn<PaginationState>
  t: (key: string) => string
}

export function DataTablePagination({
  pagination,
  pageCount,
  onPaginationChange,
  t,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        {t("page")} {pagination.pageIndex + 1} {t("of")}{" "}
        {Math.max(1, pageCount)}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: Math.max(0, pagination.pageIndex - 1),
            })
          }
          disabled={pagination.pageIndex <= 0}
        >
          {t("previous")}
        </Button>

        <Button
          variant="primary"
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: pagination.pageIndex + 1,
            })
          }
          disabled={pagination.pageIndex + 1 >= Math.max(1, pageCount)}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  )
}
