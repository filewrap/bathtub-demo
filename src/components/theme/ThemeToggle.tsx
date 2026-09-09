"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/**
 * Switches Dark <-> Light through ThemeProvider and indicates the active
 * theme (AC-NYX-002.2, 002.4). A sliding brass knob marks the active side.
 * Renders a neutral state before hydration so server and client match.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const ready = theme !== null;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!ready}
      role="switch"
      aria-checked={ready ? isDark : undefined}
      aria-label={
        ready
          ? `Theme: ${isDark ? "Dark" : "Light"}. Switch to ${isDark ? "Light" : "Dark"}.`
          : "Theme toggle"
      }
      title={ready ? (isDark ? "Dark theme" : "Light theme") : undefined}
      data-theme-active={ready ? theme : undefined}
      className={[
        "relative inline-flex h-tap w-[4.75rem] shrink-0 items-center rounded-full border border-line p-1",
        "transition-colors duration-base ease-out hover:border-line-strong disabled:opacity-60",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "absolute top-1 h-[calc(var(--size-tap)-0.5rem)] w-[calc(var(--size-tap)-0.5rem)] rounded-full bg-accent shadow-glow transition-transform duration-slow ease-out",
          ready && !isDark ? "translate-x-[calc(4.75rem-var(--size-tap)-2px)]" : "translate-x-0",
        ].join(" ")}
        style={{ left: "0.25rem" }}
      />
      <span
        aria-hidden="true"
        className={[
          "relative z-10 grid h-[calc(var(--size-tap)-0.5rem)] w-[calc(var(--size-tap)-0.5rem)] place-items-center rounded-full transition-colors duration-base ease-out",
          ready && isDark ? "text-accent-ink" : "text-ink-faint",
        ].join(" ")}
      >
        <Moon size={15} strokeWidth={1.75} />
      </span>
      <span
        aria-hidden="true"
        className={[
          "relative z-10 ml-auto grid h-[calc(var(--size-tap)-0.5rem)] w-[calc(var(--size-tap)-0.5rem)] place-items-center rounded-full transition-colors duration-base ease-out",
          ready && !isDark ? "text-accent-ink" : "text-ink-faint",
        ].join(" ")}
      >
        <Sun size={15} strokeWidth={1.75} />
      </span>
      <span className="sr-only">{ready ? (isDark ? "Dark" : "Light") : ""}</span>
    </button>
  );
}
