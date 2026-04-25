import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
interface DataTableErrorProps {
  message: string
  onRetry?: () => void
}
export function DataTableError({ message, onRetry }: DataTableErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-5 w-5" />
      </div>

      <div>
        <p className="font-semibold text-destructive">
          Failed to load data
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {message}
        </p>
      </div>

      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}