import React from 'react'
import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

export function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider
      locale="en"
      messages={{
        table: {
          next: 'Next',
          previous: 'Previous',
          rows: 'Rows',
          searchPlaceholder: 'Search...',
          showing: 'Showing <span>{start}</span>-<span>{end}</span> of <span>{total}</span>',
          apply: 'Apply',
        },
      }}
    >
      {ui}
    </NextIntlClientProvider>
  )
}