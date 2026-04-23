// ==============================
//? enums
// ==============================

export type Plan = "Silver" | "Gold" | "Platinum";
export type CoverageStatus = "Active" | "Suspended" | "Expired";
export type PaymentStatus = "Paid" | "Pending" | "Overdue";
export type Gender = "Male" | "Female";
export type Relationship =
  | "Self"
  | "Spouse"
  | "Son"
  | "Daughter"
  | "Father"
  | "Mother";
// ==============================
// ? sub types
// ==============================
export interface FamilyMember {
  id: string;
  fullName: string;
  relationship: Relationship;
  gender: Gender;
  dateOfBirth: string;
  isCovered: boolean;
}
export interface PaymentInfo {
  monthlyPremium: number;
  outstandingAmount: number;
  lastPaymentDate: string;
  paymentStatus: PaymentStatus;
}
// ==============================
//? main data
// ==============================
export interface Beneficiary {
  id: string;
  fullName: string;
  nationality: string;
  policyNumber: string;
  company: string;
  plan: Plan;
  email: string;
  coverageStatus: CoverageStatus;
  startDate: string;
  endDate: string;
  payment: PaymentInfo;
  familyMembers: FamilyMember[];
}
// ==============================
// ?API
// ==============================
export interface PaginatedBeneficiariesResponse {
  data: Beneficiary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
// ==============================
// ?query state
// ==============================
export interface BeneficiariesQueryState {
  pageIndex: number;
  pageSize: number;
  search: string;
  plan: string;
  coverageStatus: string;
  paymentStatus: string;
  company: string;
  nationality: string;
}