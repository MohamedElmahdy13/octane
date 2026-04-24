import { Link } from "@/i18n/navigation"
import type { AppLocale } from "@/i18n/routing"

interface AnimatedLinkProps {
  href: string
  label: string
  locale: AppLocale
  isActive: boolean
  onClick?: () => void
  variant?: "desktop" | "mobile"
}

export function AnimatedLink({
                               href,
                               label,
                               locale,
                               isActive,
                               onClick,
                               variant = "desktop",
                             }: AnimatedLinkProps) {
  if (variant === "mobile") {
    return (
      <Link
        href={href}
        locale={locale}
        onClick={onClick}
        className={`rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground ${
          isActive
            ? "bg-muted font-medium text-foreground"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      locale={locale}
      className={`relative font-medium transition-all duration-200 hover:text-primary ${
        isActive ? "text-primary after:w-full" : "text-muted-foreground"
      } after:absolute after:-bottom-1.5 after:left-1/2 after:h-[2.5px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-all after:duration-300 after:content-[''] hover:after:w-full`}
    >
      {label}
    </Link>
  )
}