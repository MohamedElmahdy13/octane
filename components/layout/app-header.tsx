"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

import { Link } from "@/i18n/navigation"
import type { AppLocale } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./language-switcher"
import { AnimatedLink } from "@/components/ui/animated-link"
import { ThemeToggle } from "@/components/layout/theme-toggle"

interface AppHeaderProps {
  locale: AppLocale
}

export function AppHeader({ locale }: AppHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname()
  const normalizedPath = pathname.replace(`/${locale}`, "") || "/"

  const tNav = useTranslations("nav")
  const tApp = useTranslations("app")

  const links = [
    {
      href: "/",
      label: tNav("home"),
    },
    {
      href: "/beneficiaries",
      label: tNav("beneficiaries"),
    },
    {
      href: "/beneficiaries-family",
      label: tNav("beneficiariesFamily"),
    },
  ]

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return normalizedPath === "/"
    }

    return normalizedPath === href || normalizedPath.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-screen-2xl items-center justify-between gap-4 px-4 md:px-6">
        <Link
          href="/"
          locale={locale}
          className="max-w-47.5 truncate text-base font-semibold tracking-tight sm:max-w-none"
        >
          {tApp("title")}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <AnimatedLink
              key={link.href}
              href={link.href}
              label={link.label}
              locale={locale}
              isActive={isActiveLink(link.href)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/*<div className="origin-right scale-90 md:scale-100">*/}
          {/*  <LanguageSwitcher locale={locale} />*/}
          {/*</div>*/}
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <X className="h-5 w-5 rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="h-5 w-5 transition-transform duration-300" />
            )}
          </Button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "max-h-105 translate-y-0 opacity-100"
            : "max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <div className="border-t bg-background">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 px-4 py-4">
            <nav className="flex flex-col gap-2 text-sm">
              {links.map((link) => (
                <AnimatedLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  locale={locale}
                  isActive={isActiveLink(link.href)}
                  onClick={() => setIsOpen(false)}
                  variant="mobile"
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
