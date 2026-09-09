"use client";

import { useConsent } from "./ConsentProvider";

/**
 * Re-consent control (AC-NYX-PC-002.4). Shows the recorded choice and lets
 * the visitor flip it or clear it. Used on the Privacy Policy page.
 */
export function ConsentControls() {
  const { choice, setChoice, resetChoice } = useConsent();

  const status =
    choice === undefined
      ? "Checking what you told us."
      : choice === null
        ? "You have not decided yet. The banner is waiting, patiently."
        : choice === "accept"
          ? "You accepted the crumbs. Non-essential cookies are on."
          : "You declined the crumbs. Non-essential cookies are off.";

  return (
    <div className="rounded-lg border border-line bg-surface-raised p-5">
      <p className="text-sm text-ink-muted" aria-live="polite">
        {status}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setChoice("accept")}
          disabled={choice === "accept"}
          className="inline-flex h-tap items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-ink transition-transform duration-base ease-gravity hover:-translate-y-px disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Accept the crumbs
        </button>
        <button
          type="button"
          onClick={() => setChoice("reject")}
          disabled={choice === "reject"}
          className="inline-flex h-tap items-center rounded-md border border-line bg-surface px-4 text-sm text-ink-muted transition-colors duration-base ease-gravity hover:border-line-strong hover:text-ink disabled:opacity-50"
        >
          No crumbs
        </button>
        <button
          type="button"
          onClick={resetChoice}
          disabled={choice === null || choice === undefined}
          className="inline-flex h-tap items-center rounded-md px-3 text-sm text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors duration-base ease-gravity hover:text-ink disabled:opacity-50"
        >
          Forget my choice
        </button>
      </div>
    </div>
  );
}
