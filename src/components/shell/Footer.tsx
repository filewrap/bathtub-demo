import Link from "next/link";
import { PRIMARY_NAV } from "@/lib/nav";
import { CookieChoicesLink } from "@/components/consent/CookieChoicesLink";
import { Wordmark } from "./Wordmark";

const footerLink =
  "inline-flex min-h-tap items-center text-ink-muted transition-colors duration-base ease-gravity hover:text-ink";

/**
 * Footer: brand sign-off, Privacy Policy link, cookie choices, primary links
 * (AC-NYX-001.5, AC-NYX-PC-002.4, AC-NYX-PC-003.2).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-content grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-start">
        <div className="max-w-md space-y-3">
          <Wordmark />
          <p className="text-sm text-ink-muted">
            Your secrets soak with you. We keep nothing we don&apos;t have to.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className={footerLink}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <CookieChoicesLink className={footerLink} />
            </li>
          </ul>
        </nav>

        <p className="text-xs text-ink-faint md:col-span-2">
          &copy; {year} NYX ATLAS &mdash; good night.
        </p>
      </div>
    </footer>
  );
}
