import Link from "next/link";
import { PRIMARY_NAV } from "@/lib/nav";
import { Wordmark } from "./Wordmark";

/** Footer: brand sign-off, Privacy Policy link, primary links (AC-NYX-001.5). */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-content grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-start">
        <div className="max-w-md space-y-3">
          <Wordmark />
          <p className="text-sm text-ink-muted">
            The last light on in a dark house. Sink in when you are ready.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-tap items-center text-ink-muted transition-colors duration-base ease-gravity hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacy"
                className="inline-flex min-h-tap items-center text-ink-muted transition-colors duration-base ease-gravity hover:text-ink"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        <p className="text-xs text-ink-faint md:col-span-2">
          &copy; {year} NYX Atlas. Nothing here is urgent.
        </p>
      </div>
    </footer>
  );
}
