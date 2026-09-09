"use client";

import { Lock } from "lucide-react";
import { useId } from "react";
import { availability, type GroupKey, type OptionGroup, type TubConfiguration } from "./config-rules";
import { useConfigurator } from "./ConfiguratorController";

/**
 * One option group as a radiogroup (AC-NYX-TC-001.1, 001.8). Active option
 * is marked; disabled options are visually and semantically indicated with
 * the reason (AC-NYX-TC-003.1).
 */
export function OptionGroupPanel<K extends GroupKey>({ group, index }: { group: OptionGroup<K>; index: number }) {
  const { config, setOption } = useConfigurator();
  const headingId = useId();
  const active = config[group.key];

  return (
    <fieldset className="border-t border-line pt-8">
      <div className="flex items-baseline justify-between gap-6">
        <legend className="float-left text-3xl text-ink" id={headingId}>
          {group.label}
        </legend>
        <span className="spec text-xs text-ink-faint">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="mt-2 clear-left max-w-lg text-ink-muted">{group.intro}</p>

      <div role="radiogroup" aria-labelledby={headingId} className="mt-6 grid gap-3 sm:grid-cols-2">
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
                "group relative flex min-h-tap min-w-0 flex-col items-start rounded-lg border p-5 text-left transition-[border-color,background-color,box-shadow,transform] duration-base ease-out",
                isActive
                  ? "border-accent bg-surface shadow-glow"
                  : "border-line bg-surface/40 hover:border-line-strong hover:bg-surface",
                disabled ? "cursor-not-allowed opacity-50 hover:border-line hover:bg-surface/40" : "active:translate-y-px",
              ].join(" ")}
            >
              <span className="flex w-full items-center justify-between gap-3">
                <span className="text-base font-medium text-ink">{opt.label}</span>
                <span
                  aria-hidden="true"
                  className={[
                    "h-2 w-2 shrink-0 rounded-full transition-[background-color,box-shadow] duration-base ease-out",
                    isActive ? "bg-accent shadow-glow" : "bg-line-strong",
                  ].join(" ")}
                />
              </span>
              <span className="mt-2 block text-sm text-ink-muted">{opt.detail}</span>
              {disabled && reason ? (
                <span className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
                  <Lock size={11} strokeWidth={2} aria-hidden="true" />
                  {reason}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
