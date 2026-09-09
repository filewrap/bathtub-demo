"use client";

import Link from "next/link";
import { button } from "@/components/ui/button";
import { useConsent } from "./ConsentProvider";

/**
 * First-visit consent prompt (AC-NYX-PC-001.1 to 001.4). Fixed to the bottom
 * edge so it never covers the header, and it does not trap focus or dim the
 * page, so the visitor can keep reading. Renders nothing until hydrated to
 * avoid a flash for returning visitors.
 */
export function ConsentBanner() {
  const { choice, setChoice } = useConsent();

  if (choice !== null) return null;

  return (
    <aside role="region" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-30 p-3 sm:p-5">
      <div className="container-content">
        <div className="glass card flex flex-col gap-5 p-5 shadow-lift sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
          <p className="max-w-xl text-sm text-ink">
            We won&apos;t tell anyone you were here. We barely tell ourselves. Accept the crumbs?{" "}
            <Link
              href="/privacy"
              className="underline decoration-line-strong underline-offset-4 transition-colors duration-base ease-out hover:text-accent"
            >
              Read the Privacy Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" onClick={() => setChoice("reject")} className={button("secondary")}>
              No crumbs
            </button>
            <button type="button" onClick={() => setChoice("accept")} className={button("primary")}>
              Accept the crumbs
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
