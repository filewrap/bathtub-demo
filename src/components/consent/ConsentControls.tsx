"use client";

import { button } from "@/components/ui/button";
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
    <div className="card p-6">
      <p className="label">Your choice</p>
      <p className="mt-2 text-base text-ink" aria-live="polite">
        {status}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => setChoice("accept")} disabled={choice === "accept"} className={button("primary")}>
          Accept the crumbs
        </button>
        <button type="button" onClick={() => setChoice("reject")} disabled={choice === "reject"} className={button("secondary")}>
          No crumbs
        </button>
        <button
          type="button"
          onClick={resetChoice}
          disabled={choice === null || choice === undefined}
          className={button("ghost")}
        >
          Forget my choice
        </button>
      </div>
    </div>
  );
}
