import { NextRequest, NextResponse } from "next/server";
import beneficiariesJson from "@/mock/beneficiaries.json";
import type { Beneficiary } from "@/features/beneficiaries/types/beneficiary.types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);
  const search = (searchParams.get("search") ?? "").toLowerCase().trim();
  const plan = (searchParams.get("plan") ?? "").trim();
  const coverageStatus = (searchParams.get("coverageStatus") ?? "").trim();
  const paymentStatus = (searchParams.get("paymentStatus") ?? "").trim();
  const company = (searchParams.get("company") ?? "").trim();

  let filtered = [...(beneficiariesJson.beneficiaries as Beneficiary[])];

  if (search) {
    filtered = filtered.filter((beneficiary) =>
      [
        beneficiary.fullName,
        beneficiary.email,
        beneficiary.nationality,
        beneficiary.policyNumber,
      ].some((value) => value.toLowerCase().includes(search))
    )
  }

  if (plan) {
    filtered = filtered.filter((beneficiary) => beneficiary.plan === plan);
  }

  if (coverageStatus) {
    filtered = filtered.filter(
      (beneficiary) => beneficiary.coverageStatus === coverageStatus
    );
  }

  if (paymentStatus) {
    filtered = filtered.filter(
      (beneficiary) => beneficiary.payment.paymentStatus === paymentStatus
    );
  }

  if (company) {
    filtered = filtered.filter((beneficiary) => beneficiary.company === company);
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const normalizedPage = Math.min(Math.max(page, 1), totalPages);
  const start = (normalizedPage - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    data,
    total,
    page: normalizedPage,
    pageSize,
    totalPages,
  });
}