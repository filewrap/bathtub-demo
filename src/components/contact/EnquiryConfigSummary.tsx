"use client";

import { X } from "lucide-react";

type Props = {
  summary: string;
  onRemove: () => void;
};

/**
 * Carried configuration from the Enquiry Handoff (AC-NYX-CP-003.1, 003.4).
 */
export function EnquiryConfigSummary({ summary, onRemove }: Props) {
  const lines = summary.split("\n").filter(Boolean);
  return (
    <aside
      aria-labelledby="enquiry-config-heading"
      className="rounded-lg border border-accent/40 bg-surface p-5 shadow-glow"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="enquiry-config-heading" className="font-display text-xl text-ink">
            The tub you built
          </h2>
          <p className="mt-1 text-sm text-ink-muted">Attached to your message. You will not have to describe it.</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove configuration from enquiry"
          className="inline-flex h-tap w-tap shrink-0 items-center justify-center rounded-md border border-line text-ink-muted transition-colors duration-base ease-gravity hover:border-line-strong hover:text-ink"
        >
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
      <ul className="mt-4 divide-y divide-line text-sm">
        {lines.map((line) => {
          const idx = line.indexOf(":");
          const label = idx > -1 ? line.slice(0, idx) : "";
          const value = idx > -1 ? line.slice(idx + 1).trim() : line;
          return (
            <li key={line} className="flex items-baseline justify-between gap-4 py-2">
              {label ? <span className="text-ink-muted">{label}</span> : null}
              <span className="text-right text-ink">{value}</span>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={onRemove}
        className="mt-4 text-xs text-ink-faint underline-offset-4 transition-colors duration-base ease-gravity hover:text-ink hover:underline"
      >
        Send without the tub
      </button>
    </aside>
  );
}
