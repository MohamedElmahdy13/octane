"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { Beneficiary } from "../types/beneficiary.types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString();
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getBeneficiaryColumns(): ColumnDef<Beneficiary>[] {
  return [
    {
      accessorKey: "fullName",
      header: "Beneficiary",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium">{row.original.fullName}</p>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
      {row.original.email}
    </span>
      ),
    },
    {
      accessorKey: "policyNumber",
      header: "Policy Number",
    },
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => {
        const plan = row.original.plan;

        if (plan === "Platinum") {
          return <Badge variant="default">{plan}</Badge>;
        }

        if (plan === "Gold") {
          return <Badge variant="warning">{plan}</Badge>;
        }

        return <Badge variant="secondary">{plan}</Badge>;
      },
    },
    {
      accessorKey: "coverageStatus",
      header: "Coverage",
      cell: ({ row }) => {
        const status = row.original.coverageStatus;

        if (status === "Active") {
          return <Badge variant="success">{status}</Badge>;
        }

        if (status === "Suspended") {
          return <Badge variant="warning">{status}</Badge>;
        }

        return <Badge variant="secondary">{status}</Badge>;
      },
    },
    {
      id: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => {
        const status = row.original.payment.paymentStatus;

        if (status === "Paid") {
          return <Badge variant="success">{status}</Badge>;
        }

        if (status === "Pending") {
          return <Badge variant="warning">{status}</Badge>;
        }

        return <Badge variant="destructive">{status}</Badge>;
      },
    },
    {
      id: "monthlyPremium",
      header: "Monthly Premium",
      cell: ({ row }) => formatCurrency(row.original.payment.monthlyPremium),
    },
    {
      id: "lastPaymentDate",
      header: "Last Payment",
      cell: ({ row }) => formatDate(row.original.payment.lastPaymentDate),
    },
  ];
}