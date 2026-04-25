# Octane
# 🧾 Beneficiaries Dashboard

A simple and clean dashboard for managing beneficiaries and their families.  
Built with a focus on usability, performance, and clear data presentation.

---

## 🚀 Features

- View beneficiaries with pagination
- Search and filter by multiple fields
- Sort by monthly premium and last payment date
- Expand rows to view family members
- Summary cards for quick insights
- Loading skeletons for smooth UX
- Friendly empty states
- Error handling with retry support

---

## 🛠 Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Table
- Supabase

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone <https://github.com/MohamedElmahdy13/octane.git>
cd <octane>
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style local UI components
- TanStack Table
- next-intl with `proxy.ts`
- locale routes: `/en` and `/ar`
- English / Arabic support
- RTL / LTR handling
- fetch-based local mock API
- page 1: row selection
- page 2: expandable rows

## Install
```bash
npm install
npm run dev
```

## New files added
- `proxy.ts`
- `i18n/`
- `messages/`
- `mock/users.json`
- `app/[locale]/`
- `app/api/users/route.ts`
- `components/layout/`
- `components/data-table/`
- `features/beneficiaries/`

## Packages added
- `next-intl`
- `@tanstack/react-table`
