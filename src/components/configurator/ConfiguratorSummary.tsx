"use client";

import { ArrowRight, Check, Copy, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { button } from "@/components/ui/button";
import { capacityRange, GROUPS, optionLabel, toConfigurationSummary } from "./config-rules";
import { useConfigurator } from "./ConfiguratorController";

/** Eases a number toward its target over ~500 ms; instant under reduced motion. */
function useCounted(target: number): number {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const begin = from.current;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 500);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(begin + (target - begin) * eased);
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(step);
      else from.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

/**
 * Running configuration and derived capacity (AC-NYX-TC-002.1, 002.2), the
 * in-voice Enquiry Handoff CTA (AC-NYX-TC-004.1), reset (AC-NYX-TC-005.2),
 * and a copy-to-clipboard of the plain-text summary.
 */
export function ConfiguratorSummary() {
  const { config, notice, reset, handoff } = useConfigurator();
  const cap = capacityRange(config);
  const min = useCounted(cap.min);
  const max = useCounted(cap.max);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toConfigurationSummary(config));
      setCopied(true);
    } catch {
      /* clipboard unavailable; nothing to do */
    }
  };

  return (
    <aside className="card p-6" aria-labelledby="cfg-summary-heading">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="cfg-summary-heading" className="text-2xl text-ink">
          Your tub, so far
        </h2>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Configuration copied" : "Copy configuration as text"}
          className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs text-ink-muted transition-colors duration-base ease-out hover:bg-surface-raised hover:text-ink"
        >
          {copied ? <Check size={13} strokeWidth={2} aria-hidden="true" /> : <Copy size={13} strokeWidth={2} aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <dl className="mt-5 divide-y divide-line text-sm">
        {GROUPS.map((g) => (
          <div key={g.key} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="text-ink-muted">{g.label}</dt>
            <dd className="text-right text-ink">{optionLabel(g.key, config[g.key])}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-line pt-5">
        <p className="label">Estimated capacity</p>
        <p className="mt-2 font-display text-5xl leading-none text-ink">
          <span className="spec font-display">{min}</span>
          <span className="text-ink-faint"> to </span>
          <span className="spec font-display">{max}</span>
          <span className="ml-2 font-body text-sm text-ink-muted">gal</span>
        </p>
      </div>

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
      <p className="mt-4 text-xs text-ink-faint">We attach this to your message. You will not have to describe it.</p>
    </aside>
  );
}
