import { PageContainer } from '@/components/layout/page-container'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <PageContainer>
      <div className="space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-8 w-70" />
          <Skeleton className="h-4 w-105 max-w-full" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))}
        </div>

        <Skeleton className="h-140 rounded-xl" />
      </div>
    </PageContainer>
  )
}