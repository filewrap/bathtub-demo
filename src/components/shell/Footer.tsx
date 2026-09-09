import Link from "next/link";
import { PRIMARY_NAV } from "@/lib/nav";
import { CookieChoicesLink } from "@/components/consent/CookieChoicesLink";
import { Wordmark } from "./Wordmark";

const footerLink =
  "inline-flex min-h-tap items-center whitespace-nowrap text-sm text-ink-muted transition-colors duration-base ease-out hover:text-ink";

/**
 * Statement footer (Hallmark Ft5). The sign-off is the page's last display
 * moment. Carries the Privacy Policy link and cookie choices
 * (AC-NYX-001.5, AC-NYX-PC-002.4, AC-NYX-PC-003.2).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl"
      />
      <div className="container-content relative pb-10 pt-20 md:pt-28">
        <p className="label">NYX ATLAS</p>
        <p className="mt-4 font-display text-display leading-[0.9] text-ink">
          good night<span className="text-accent">.</span>
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-5 text-ink-muted">
              Your secrets soak with you. We keep nothing we don&apos;t have to.
            </p>
          </div>

          <nav aria-label="Footer, explore">
            <h2 className="label font-body">Explore</h2>
            <ul className="mt-3 flex flex-col">
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
            <h2 className="label font-body">Privacy</h2>
            <ul className="mt-3 flex flex-col">
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

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-baseline sm:justify-between">
          <p>&copy; {year} NYX ATLAS</p>
          <p>We answer between dusk and the hour no one admits to being awake.</p>
        </div>
      </div>
    </footer>
  );
}
