import type { OnChangeFn, PaginationState } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { PaginationEllipsis } from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps {
  pagination: PaginationState
  pageCount: number
  total: number
  onPaginationChange: OnChangeFn<PaginationState>
}

type PageItem = number | 'ellipsis-start' | 'ellipsis-end'

const PAGE_SIZE_OPTIONS = [10, 20, 50]

function getVisiblePages(currentPage: number, pageCount: number): PageItem[] {
  if (pageCount <= 6) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 'ellipsis-end', pageCount]
  }

  if (currentPage >= pageCount - 2) {
    return [
      1,
      'ellipsis-start',
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ]
  }

  return [
    1,
    'ellipsis-start',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis-end',
    pageCount,
  ]
}

export function DataTablePagination({
                                      pagination,
                                      pageCount,
                                      total,
                                      onPaginationChange,
                                    }: DataTablePaginationProps) {
  const t = useTranslations('table')

  const currentPage = pagination.pageIndex + 1
  const pageSize = pagination.pageSize
  const pages = getVisiblePages(currentPage, pageCount)

  const start = total === 0 ? 0 : pagination.pageIndex * pageSize + 1
  const end = Math.min((pagination.pageIndex + 1) * pageSize, total)

  const goToPage = (page: number) => {
    onPaginationChange({
      ...pagination,
      pageIndex: page - 1,
    })
  }

  const goToPreviousPage = () => {
    onPaginationChange({
      ...pagination,
      pageIndex: Math.max(0, pagination.pageIndex - 1),
    })
  }

  const goToNextPage = () => {
    onPaginationChange({
      ...pagination,
      pageIndex: pagination.pageIndex + 1,
    })
  }

  const changePageSize = (value: string) => {
    onPaginationChange({
      pageIndex: 0,
      pageSize: Number(value),
    })
  }

  const isFirstPage = pagination.pageIndex <= 0
  const isLastPage = pagination.pageIndex + 1 >= Math.max(1, pageCount)

  return (
    <div className="flex flex-col gap-4 pt-4 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-center text-sm text-muted-foreground lg:text-start">
        {t.rich('showing', {
          start,
          end,
          total,
          span: (chunks) => (
            <span className="font-medium text-foreground">{chunks}</span>
          ),
        })}
      </p>

      <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t('rows')}</span>

          <Select value={String(pageSize)} onValueChange={changePageSize}>
            <SelectTrigger className="h-8 w-20">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="p-1">
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={goToPreviousPage}
            disabled={isFirstPage}
          >
            {t('previous')}
          </Button>

          <span className="text-sm text-muted-foreground lg:hidden">
            {currentPage} / {Math.max(1, pageCount)}
          </span>

          <div className="hidden items-center gap-2 lg:flex">
            {pages.map((page) => {
              if (typeof page === 'string') {
                return <PaginationEllipsis key={page} />
              }

              return (
                <Button
                  key={page}
                  variant={page === currentPage ? 'secondary' : 'ghost'}
                  size="sm"
                  disabled={page === currentPage}
                  className="h-8 w-8 px-0"
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              )
            })}
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={goToNextPage}
            disabled={isLastPage}
          >
            {t('next')}
          </Button>
        </div>
      </div>
    </div>
  )
}