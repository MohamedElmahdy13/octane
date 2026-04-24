import {getTranslations} from 'next-intl/server'
import {Link} from '@/i18n/navigation'
import type {AppLocale} from '@/i18n/routing'
import {LanguageSwitcher} from './language-switcher'

export async function AppHeader({locale}: {locale: AppLocale}) {
  const tNav = await getTranslations({locale, namespace: 'nav'})
  const tApp = await getTranslations({locale, namespace: 'app'})

  return (
    <header className="border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" locale={locale} className="text-lg font-semibold tracking-tight">
            {tApp('title')}
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/" locale={locale} className="transition-colors hover:text-foreground">
              {tNav('home')}
            </Link>
            <Link href="/beneficiaries" locale={locale}>
              {tNav('beneficiaries')}
            </Link>
            <Link
              href="/beneficiaries-family"
              locale={locale}
              className="transition-colors hover:text-foreground"
            >
              {tNav("beneficiariesFamily")}
            </Link>
          </nav>
        </div>

        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  )
}
