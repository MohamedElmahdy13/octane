'use client'

import {Link, usePathname} from '@/i18n/navigation'
import {routing, type AppLocale} from '@/i18n/routing'

export function LanguageSwitcher({locale}: {locale: AppLocale}) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-2 rounded-lg border px-2 py-1 text-sm">
      {routing.locales.map((item) => (
        <Link
          key={item}
          href={pathname}
          locale={item}
          className={
            item === locale
              ? 'rounded-md bg-primary px-2 py-1 text-primary-foreground'
              : 'rounded-md px-2 py-1 hover:bg-muted'
          }
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
