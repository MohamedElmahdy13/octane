import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { BeneficiariesFamilyTable } from "@/features/beneficiaries/components/beneficiaries-family/beneficiaries-family-table";

export default async function BeneficiariesPage({
                                                  params,
                                                }: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "beneficiariesFamilyPage",
  });

  return (
    <PageContainer>
      <PageHeader title={t("title")} description={t("description")} />
      <BeneficiariesFamilyTable />
    </PageContainer>
  );
}