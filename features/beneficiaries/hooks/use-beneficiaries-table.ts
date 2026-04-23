"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  BeneficiariesQueryState,
  PaginatedBeneficiariesResponse,
} from "../types/beneficiary.types";

const initialState: BeneficiariesQueryState = {
  pageIndex: 0,
  pageSize: 10,
  search: "",
  plan: "",
  coverageStatus: "",
  paymentStatus: "",
  company: "",
  nationality: "",
};

export function useBeneficiariesTable() {
  const [query, setQuery] =
    useState<BeneficiariesQueryState>(initialState);
  const [debouncedSearch, setDebouncedSearch] = useState(query.search);
  const [data, setData] = useState<PaginatedBeneficiariesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(query.search), 350);
    return () => clearTimeout(timer);
  }, [query.search]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBeneficiaries() {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          page: String(query.pageIndex + 1),
          pageSize: String(query.pageSize),
          search: debouncedSearch,
        });

        if (query.plan) params.set("plan", query.plan);
        if (query.coverageStatus) {
          params.set("coverageStatus", query.coverageStatus);
        }
        if (query.paymentStatus) {
          params.set("paymentStatus", query.paymentStatus);
        }
        if (query.company) params.set("company", query.company);

        const response = await fetch(`/api/beneficiaries?${params.toString()}`, {
          signal: controller.signal,
        });

        const result: PaginatedBeneficiariesResponse = await response.json();
        setData(result);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }

    loadBeneficiaries();

    return () => controller.abort();
  }, [
    query.pageIndex,
    query.pageSize,
    query.plan,
    query.coverageStatus,
    query.paymentStatus,
    query.company,
    debouncedSearch,
  ]);

  const planOptions = useMemo(
    () => ["Silver", "Gold", "Platinum"],
    []
  );

  const coverageOptions = useMemo(
    () => ["Active", "Suspended", "Expired"],
    []
  );

  const paymentOptions = useMemo(
    () => ["Paid", "Pending", "Overdue"],
    []
  );
  const nationalityOptions = useMemo(
    () => ['Egyptian', 'Syrian', 'Lebanese', 'Saudi'],
    []
  )
  const companyOptions = useMemo(
    () => [
      "FinServe Egypt",
      "Nile Tech",
      "AXA Group",
      "MedCare Solutions",
      "Delta Finance",
    ],
    []
  );

  return {
    query,
    setQuery,
    data,
    loading,
    planOptions,
    coverageOptions,
    nationalityOptions,
    paymentOptions,
    companyOptions,
  };
}