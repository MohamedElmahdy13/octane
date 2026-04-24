import { getTranslations, setRequestLocale } from "next-intl/server"
import type { AppLocale } from "@/i18n/routing"

import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"
import { BeneficiariesTable } from "@/features/beneficiaries/components/beneficiaries/beneficiaries-table"

export default async function BeneficiariesPage({
                                                  params,
                                                }: {
  params: Promise<{ locale: AppLocale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({
    locale,
    namespace: "beneficiariesPage",
  })

  return (
    <PageContainer>
      <div className="flex flex-col gap-3.5">
        <PageHeader title={t("title")} description={t("description")} />
        <BeneficiariesTable />
      </div>
    </PageContainer>
  )
}