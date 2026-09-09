"use client";

import { X } from "lucide-react";
import { iconButton } from "@/components/ui/button";

type Props = {
  summary: string;
  onRemove: () => void;
};

/** Carried configuration from the Enquiry Handoff (AC-NYX-CP-003.1, 003.4). */
export function EnquiryConfigSummary({ summary, onRemove }: Props) {
  const lines = summary.split("\n").filter(Boolean);
  return (
    <aside aria-labelledby="enquiry-config-heading" className="card border-accent/40 p-6 shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label">Attached</p>
          <h2 id="enquiry-config-heading" className="mt-2 text-2xl text-ink">
            The tub you built
          </h2>
        </div>
        <button type="button" onClick={onRemove} aria-label="Remove configuration from enquiry" className={iconButton}>
          <X size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <ul className="mt-5 divide-y divide-line text-sm">
        {lines.map((line) => {
          const idx = line.indexOf(":");
          const label = idx > -1 ? line.slice(0, idx) : "";
          const value = idx > -1 ? line.slice(idx + 1).trim() : line;
          return (
            <li key={line} className="flex items-baseline justify-between gap-4 py-2.5">
              {label ? <span className="text-ink-muted">{label}</span> : null}
              <span className="text-right text-ink">{value}</span>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={onRemove}
        className="mt-5 text-xs text-ink-faint underline-offset-4 transition-colors duration-base ease-out hover:text-ink hover:underline"
      >
        Send without the tub
      </button>
    </aside>
  );
}
