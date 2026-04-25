import type { OnChangeFn, PaginationState } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PaginationEllipsis } from '@/components/ui/pagination'

interface DataTablePaginationProps {
  pagination: PaginationState
  pageCount: number
  total: number
  onPaginationChange: OnChangeFn<PaginationState>
}

type PageItem = number | 'ellipsis'

function getPages(currentPage: number, pageCount: number): PageItem[] {
  if (pageCount <= 3) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const startPage = Math.min(currentPage, Math.max(1, pageCount - 2))
  const pages = [startPage, startPage + 1, startPage + 2].filter(
    (page) => page <= pageCount
  )

  if (pages[pages.length - 1] < pageCount) {
    return [...pages, 'ellipsis']
  }

  return pages
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

  const start = total === 0 ? 0 : pagination.pageIndex * pageSize + 1
  const end = Math.min((pagination.pageIndex + 1) * pageSize, total)


  const goToPage = (page: number) => {
    onPaginationChange({
      ...pagination,
      pageIndex: page - 1,
    })
  }

  const changePageSize = (value: string) => {
    onPaginationChange({
      pageIndex: 0,
      pageSize: Number(value),
    })
  }

  const getPages = () => {
    if (pageCount <= 6) {
      return Array.from({ length: pageCount }, (_, i) => i + 1)
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

  const pages = getPages()

  return (
    <div className="flex flex-col items-start justify-center gap-3 pt-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-col gap-4 items-start justify-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between xl:justify-end">
        <p className="text-sm text-muted-foreground">
          {t.rich('showing', {
            start,
            end,
            total,
            span: (chunks) => (
              <span className="font-medium text-foreground">{chunks}</span>
            ),
          })}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t('rows')}</span>

          <Select value={String(pageSize)} onValueChange={changePageSize}>
            <SelectTrigger className="h-8 w-20">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="p-1">
              {[10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-start justify-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between xl:justify-end">
        <div className="flex flex-wrap items-center gap-2">
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
            {t('previous')}
          </Button>

          {pages.map((page, index) => {
            if (typeof page === 'string') {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex h-8 w-8 items-center justify-center"
                >
                  <PaginationEllipsis />
                </div>
              )
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
            {t('next')}
          </Button>
        </div>


      </div>
    </div>
  )
}