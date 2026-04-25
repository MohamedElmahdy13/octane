import {Geist, Geist_Mono} from 'next/font/google'

import './globals.css'
import {ThemeProvider} from '@/components/providers/theme-provider'
import {cn} from '@/lib/utils'
import { QueryProvider } from "@/components/providers/query-provider"

const geist = Geist({subsets: ['latin'], variable: '--font-sans'})
const fontMono = Geist_Mono({subsets: ['latin'], variable: '--font-mono'})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      suppressHydrationWarning
      className={cn('antialiased', fontMono.variable, 'font-sans', geist.variable)}
    >
      <body>
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
