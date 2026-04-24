import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'

interface AnimatedLinkProps {
  href: string
  label: string
  locale: AppLocale
  isActive: boolean
  onClick?: () => void
  variant?: 'desktop' | 'mobile'
}

export function AnimatedLink({
                                  href,
                                  label,
                                  locale,
                                  isActive,
                                  onClick,
                                  variant = 'desktop',
                                }: AnimatedLinkProps) {
  if (variant === 'mobile') {
    return (
      <Link
        href={href}
        locale={locale}
        onClick={onClick}
        className={`rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground ${
          isActive
            ? 'bg-muted font-medium text-foreground'
            : 'text-muted-foreground'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      locale={locale}
      className={`relative transition-colors hover:text-foreground ${
        isActive
          ? 'font-medium text-foreground after:w-full'
          : 'text-muted-foreground'
      } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:content-[''] hover:after:w-full`}
    >
      {label}
    </Link>
  )
}