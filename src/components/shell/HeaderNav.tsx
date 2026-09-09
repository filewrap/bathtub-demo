"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { PRIMARY_NAV, isActiveRoute } from "@/lib/nav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Wordmark } from "./Wordmark";

/**
 * Persistent header: wordmark, primary links, theme toggle. Marks the active
 * route from the router and collapses into a toggle below `md`
 * (AC-NYX-001.1 to 001.4). Links render server-side so navigation works
 * without JavaScript; only the menu toggle needs hydration.
 */
export function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/85 backdrop-blur supports-[backdrop-filter]:bg-void/70">
      <div className="container-content flex h-[var(--size-header)] items-center justify-between gap-4">
        <Wordmark />

        {/* Inline links from md and up. */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.map((item) => {
              const active = isActiveRoute(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative inline-flex h-tap items-center rounded-md px-3 text-sm transition-colors duration-base ease-gravity",
                      active
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink",
                      "after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:rounded-full after:bg-accent after:transition-opacity after:duration-base after:ease-gravity",
                      active ? "after:opacity-100" : "after:opacity-0",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-tap w-tap items-center justify-center rounded-md border border-line bg-surface text-ink-muted transition-colors duration-base ease-gravity hover:border-line-strong hover:text-ink md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X size={20} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsed link list below md. */}
      <nav
        id={menuId}
        aria-label="Primary, mobile"
        hidden={!open}
        className="border-t border-line bg-surface md:hidden"
      >
        <ul className="container-content flex flex-col py-2">
          {PRIMARY_NAV.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex min-h-tap items-center justify-between rounded-md px-3 text-base transition-colors duration-base ease-gravity",
                    active
                      ? "text-ink"
                      : "text-ink-muted hover:bg-surface-raised hover:text-ink",
                  ].join(" ")}
                >
                  <span>{item.label}</span>
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
