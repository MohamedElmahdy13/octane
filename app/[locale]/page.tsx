import {getTranslations, setRequestLocale} from 'next-intl/server'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Link} from '@/i18n/navigation'
import type {AppLocale} from '@/i18n/routing'
import {PageContainer} from '@/components/layout/page-container'
import {PageHeader} from '@/components/layout/page-header'

export default async function HomePage({
  params,
}: {
  params: Promise<{locale: AppLocale}>
}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations({locale, namespace: 'home'})

  return (
    <PageContainer>
      <PageHeader title={t('title')} description={t('description')} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('selectionTitle')}</CardTitle>
            <CardDescription>{t('selectionDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/beneficiaries" locale={locale}>
              <Button variant={"primary"}>{t('open')}</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('expandableTitle')}</CardTitle>
            <CardDescription>{t('expandableDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/beneficiaries-family" locale={locale}>
              <Button variant={"primary"}>{t('open')}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
