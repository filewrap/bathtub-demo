"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useConsent } from "./ConsentProvider";

/**
 * First-visit consent prompt (AC-NYX-PC-001.1 to 001.4). Fixed to the bottom
 * edge so it never covers the sticky header nav, and it does not trap focus
 * or dim the page, so the visitor can keep reading. Renders nothing until
 * hydrated to avoid a flash for returning visitors.
 */
export function ConsentBanner() {
  const { choice, setChoice } = useConsent();

  if (choice !== null) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-30 p-3 sm:p-4"
    >
      <div className="container-content">
        <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface-raised p-4 shadow-lift sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface text-accent"
            >
              <Cookie size={18} strokeWidth={1.75} />
            </span>
            <p className="text-sm text-ink">
              We won&apos;t tell anyone you were here. We barely tell ourselves.
              Accept the crumbs?{" "}
              <Link
                href="/privacy"
                className="underline decoration-line-strong underline-offset-4 transition-colors duration-base ease-gravity hover:text-accent"
              >
                Read the Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setChoice("reject")}
              className="inline-flex h-tap items-center rounded-md border border-line bg-surface px-4 text-sm text-ink-muted transition-colors duration-base ease-gravity hover:border-line-strong hover:text-ink"
            >
              No crumbs
            </button>
            <button
              type="button"
              onClick={() => setChoice("accept")}
              className="inline-flex h-tap items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-ink shadow-glow transition-transform duration-base ease-gravity hover:-translate-y-px"
            >
              Accept the crumbs
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
