"use client";

import { Check, Lock } from "lucide-react";
import { useId } from "react";
import { availability, type GroupKey, type OptionGroup, type TubConfiguration } from "./config-rules";
import { useConfigurator } from "./ConfiguratorController";

/**
 * One option group as a radiogroup (AC-NYX-TC-001.1, 001.8). Active option
 * is marked; disabled options are visually and semantically indicated with
 * the reason (AC-NYX-TC-003.1).
 */
export function OptionGroupPanel<K extends GroupKey>({ group }: { group: OptionGroup<K> }) {
  const { config, setOption } = useConfigurator();
  const headingId = useId();
  const active = config[group.key];

  return (
    <fieldset className="rounded-lg border border-line bg-surface p-5">
      <legend className="px-1 font-display text-xl text-ink" id={headingId}>
        {group.label}
      </legend>
      <p className="mt-1 text-sm text-ink-muted">{group.intro}</p>

      <div role="radiogroup" aria-labelledby={headingId} className="mt-4 grid gap-2 sm:grid-cols-2">
        {group.options.map((opt) => {
          const isActive = opt.id === active;
          const { disabled, reason } = availability(config, group.key, opt.id as TubConfiguration[K]);
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-disabled={disabled || undefined}
              disabled={disabled}
              title={disabled ? reason : undefined}
              onClick={() => !disabled && setOption(group.key, opt.id as TubConfiguration[K])}
              className={[
                "group relative flex min-h-tap items-start gap-3 rounded-md border p-3 text-left transition-colors duration-base ease-gravity",
                isActive
                  ? "border-accent bg-surface-raised shadow-glow"
                  : "border-line bg-surface-raised/50 hover:border-line-strong",
                disabled ? "cursor-not-allowed opacity-50 hover:border-line" : "",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className={[
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                  isActive ? "border-accent bg-accent text-accent-ink" : "border-line-strong",
                ].join(" ")}
              >
                {isActive ? <Check size={12} strokeWidth={3} /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-ink">{opt.label}</span>
                <span className="mt-0.5 block text-xs text-ink-muted">{opt.detail}</span>
                {disabled && reason ? (
                  <span className="mt-1 flex items-center gap-1 text-xs text-ink-faint">
                    <Lock size={11} strokeWidth={2} aria-hidden="true" />
                    {reason}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
