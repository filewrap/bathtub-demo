import Link from "next/link";
import { PRIMARY_NAV } from "@/lib/nav";
import { CookieChoicesLink } from "@/components/consent/CookieChoicesLink";
import { Wordmark } from "./Wordmark";

const footerLink =
  "inline-flex min-h-tap items-center text-sm text-ink-muted transition-colors duration-base ease-gravity hover:text-ink";

const colHeading = "text-xs uppercase tracking-[0.22em] text-ink-faint";

/**
 * Footer: brand sign-off, Privacy Policy link, cookie choices, primary links
 * (AC-NYX-001.5, AC-NYX-PC-002.4, AC-NYX-PC-003.2).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-content grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8 md:py-20">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-5 text-ink-muted">
            Your secrets soak with you. We keep nothing we don&apos;t have to.
          </p>
          <p className="mt-3 text-sm text-ink-faint">
            We answer between dusk and the hour no one admits to being awake.
          </p>
        </div>

        <nav aria-label="Footer, explore">
          <h2 className={colHeading}>Explore</h2>
          <ul className="mt-4 flex flex-col">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer, privacy">
          <h2 className={colHeading}>Privacy</h2>
          <ul className="mt-4 flex flex-col">
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
      </div>

      <div className="border-t border-line">
        <div className="container-content flex flex-col gap-3 py-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-display text-xl text-ink">
            NYX ATLAS <span className="display-italic text-ink-muted">good night.</span>
          </p>
          <p className="text-xs text-ink-faint">&copy; {year} NYX Atlas. All tubs fictional until built.</p>
        </div>
      </div>
    </footer>
  );
}
