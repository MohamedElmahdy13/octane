# Octane

# Beneficiaries Dashboard

A clean and scalable dashboard for managing beneficiaries and their families.  
Built with a strong focus on performance, usability, and maintainable architecture.

---

## Features

- View beneficiaries with server-side pagination
- Search across multiple fields (name, email, policy number, etc.)
- Advanced filtering (plan, nationality, coverage, payment status)
- Sorting (monthly premium, last payment date)
- Expand rows to view family members
- Summary cards for quick insights
- Optimized UX (debounced search + request cancellation)
- Loading skeletons
- Friendly empty states
- Error handling with retry support
- Full i18n support (English / Arabic + RTL/LTR)

---

## Architecture Highlights

- Separation between:
  - Client service (API calls)
  - Server service (Supabase queries)
  - Mapper layer (data transformation)

- Reusable DataTable component:
  - Toolbar
  - Pagination
  - Expandable rows
  - Actions

- Data fetching strategy:
  - Beneficiaries table uses TanStack Query (caching + request cancellation)
  - Beneficiaries family table uses manual fetch with AbortController

- Performance optimizations:
  - React.memo
  - useMemo
  - Local state isolation (toolbar manages its own state)

---

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Table
- TanStack Query
- Supabase
- next-intl (i18n)

---

## Data Source

The app uses Supabase as the primary data source.

For backup and local testing, a mock dataset is included:
public/mock/beneficiaries.json
---

## Data Fetching Strategy

- Beneficiaries table:
  - Uses TanStack Query
  - Handles caching, request deduplication, and cancellation

- Beneficiaries family table:
  - Uses manual fetch
  - Uses AbortController for request cancellation

This demonstrates both advanced and simple data-fetching approaches in the same project.

---

## Fallback Data Strategy

The app supports a fallback mechanism in case Supabase is unavailable.

Flow:
Beneficiaries Table
→ Supabase API
→ if request fails
→ fallback to mock beneficiaries JSON

Notes:

- Supabase remains the primary source of truth
- Mock data is only used as a fallback
- Implemented via a custom hook

---

## Internationalization

- Languages: English / Arabic
- Routes:
  - /en
  - /ar
- Supports RTL / LTR
- Config:
  - proxy.ts
  - i18n/
  - messages/

---

## Project Structure
features/
beneficiaries/
components/
hooks/
services/
beneficiaries.service.ts
beneficiaries-client.service.ts
mappers/
lib/
components/
data-table/
data-table.tsx
data-table-toolbar/
data-table-pagination/
data-table-body/
app/
[locale]/
api/
beneficiaries/

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/MohamedElmahdy13/octane.git
cd octane
```
Testing

The project includes basic tests using Vitest and React Testing Library.

Current coverage includes:

* Data fetching hooks
* DataTable rendering
* Pagination behavior
* Error states
* Toolbar apply logic