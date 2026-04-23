# Octane

This project now includes the requested task structure with:

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
- `features/users/`

## Packages added
- `next-intl`
- `@tanstack/react-table`
