"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { button } from "@/components/ui/button";
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
    <aside className="card p-6" aria-labelledby="cfg-summary-heading">
      <p className="eyebrow eyebrow-plain">Summary</p>
      <h2 id="cfg-summary-heading" className="mt-3 text-2xl">
        Your tub, so far
      </h2>

      <dl className="mt-5 divide-y divide-line text-sm">
        {GROUPS.map((g) => (
          <div key={g.key} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="text-ink-muted">{g.label}</dt>
            <dd className="text-right text-ink">{optionLabel(g.key, config[g.key])}</dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-ink-muted">Estimated capacity</dt>
          <dd className="text-right font-display text-2xl tabular-nums text-ink">
            {cap.min}<span className="text-ink-faint">&ndash;</span>{cap.max}
            <span className="ml-1 text-sm text-ink-muted">gal</span>
          </dd>
        </div>
      </dl>

      <div className="mt-4 min-h-[1.5rem]" aria-live="polite">
        {notice ? <p className="text-xs text-accent">{notice.message}</p> : null}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button type="button" onClick={handoff} className={button("primary", "lg", "w-full")}>
          Send this tub to the night shift
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <button type="button" onClick={reset} className={button("ghost", "md", "w-full")}>
          <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
          Start over
        </button>
      </div>
      <p className="mt-4 text-xs text-ink-faint">
        We attach this to your message. You will not have to describe it.
      </p>
    </aside>
  );
}
