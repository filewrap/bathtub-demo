"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { capacityRange, GROUPS, optionLabel } from "./config-rules";
import { useConfigurator } from "./ConfiguratorController";

/**
 * Running configuration and derived capacity (AC-NYX-TC-002.1, 002.2), the
 * in-voice Enquiry Handoff CTA (AC-NYX-TC-004.1), and reset (AC-NYX-TC-005.2).
 */
export function ConfiguratorSummary() {
  const { config, notice, reset, handoff } = useConfigurator();
  const cap = capacityRange(config);

  return (
    <aside className="rounded-lg border border-line bg-surface p-5" aria-labelledby="cfg-summary-heading">
      <h2 id="cfg-summary-heading" className="font-display text-xl text-ink">
        Your tub, so far
      </h2>

      <dl className="mt-4 divide-y divide-line text-sm">
        {GROUPS.map((g) => (
          <div key={g.key} className="flex items-baseline justify-between gap-4 py-2">
            <dt className="text-ink-muted">{g.label}</dt>
            <dd className="text-right text-ink">{optionLabel(g.key, config[g.key])}</dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 py-2">
          <dt className="text-ink-muted">Estimated capacity</dt>
          <dd className="text-right text-ink">
            {cap.min} to {cap.max} gal
          </dd>
        </div>
      </dl>

      <div className="mt-5 min-h-[1.5rem]" aria-live="polite">
        {notice ? <p className="text-xs text-accent">{notice.message}</p> : null}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={handoff}
          className="inline-flex h-tap items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-accent-ink shadow-glow transition-transform duration-base ease-gravity hover:-translate-y-px"
        >
          Send this tub to the night shift
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-tap items-center justify-center gap-2 rounded-md border border-line px-5 text-sm text-ink-muted transition-colors duration-base ease-gravity hover:border-line-strong hover:text-ink"
        >
          <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
          Start over
        </button>
      </div>
      <p className="mt-3 text-xs text-ink-faint">
        We attach this to your message. You will not have to describe it.
      </p>
    </aside>
  );
}
