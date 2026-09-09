"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/**
 * Switches Dark <-> Light through ThemeProvider and indicates the active
 * theme (AC-NYX-002.2, 002.4). Renders a neutral state before hydration so
 * server and client markup match.
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
        "group relative inline-flex h-tap min-w-tap items-center gap-2 rounded-full border border-line bg-surface px-3",
        "text-sm text-ink-muted transition-colors duration-base ease-gravity",
        "hover:border-line-strong hover:text-ink disabled:opacity-60",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "grid h-7 w-7 place-items-center rounded-full transition-colors duration-base ease-gravity",
          ready && isDark ? "bg-accent text-accent-ink" : "text-ink-faint",
        ].join(" ")}
      >
        <Moon size={16} strokeWidth={1.75} />
      </span>
      <span
        aria-hidden="true"
        className={[
          "grid h-7 w-7 place-items-center rounded-full transition-colors duration-base ease-gravity",
          ready && !isDark ? "bg-accent text-accent-ink" : "text-ink-faint",
        ].join(" ")}
      >
        <Sun size={16} strokeWidth={1.75} />
      </span>
      <span className="sr-only">{ready ? (isDark ? "Dark" : "Light") : ""}</span>
    </button>
  );
}
