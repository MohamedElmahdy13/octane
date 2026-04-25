"use client"

import { Link, usePathname } from "@/i18n/navigation"
import { routing, type AppLocale } from "@/i18n/routing"

export function LanguageSwitcher({ locale }: { locale: AppLocale }) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-1 rounded-xl border bg-muted/40 p-1 text-sm shadow-sm">
      {routing.locales.map((item) => {
        const isActive = item === locale

        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            className={`rounded-lg px-3 py-1.5 font-medium transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background hover:text-primary"
            }`}
          >
            {item.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
