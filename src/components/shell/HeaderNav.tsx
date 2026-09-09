"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { PRIMARY_NAV, isActiveRoute } from "@/lib/nav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LocalTime } from "./LocalTime";
import { Wordmark } from "./Wordmark";

/**
 * Scroll-morph header (Hallmark N10). Transparent over the hero, frosts and
 * compacts once the page scrolls, retracts on scroll down and returns on
 * scroll up, and carries a reading-progress hairline. Below md the links
 * live in a full-screen menu. Links render server-side so navigation works
 * without JavaScript (AC-NYX-001.1 to 001.4).
 */
export function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll morph.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > last + 4 && y > 240);
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Open menu: lock scroll, close on Escape, move focus in.
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    return () => {
      document.documentElement.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const frosted = scrolled || open;

  return (
    <>
      <header
        data-scrolled={scrolled || undefined}
        className={[
          "fixed inset-x-0 top-0 z-40 transition-[transform,background-color,border-color] duration-slow ease-out",
          frosted ? "glass border-b border-line" : "border-b border-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        <div
          className={[
            "container-content flex items-center justify-between gap-4 transition-[height] duration-slow ease-out",
            scrolled ? "h-16" : "h-[var(--size-header)]",
          ].join(" ")}
        >
          <Wordmark />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {PRIMARY_NAV.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "relative inline-flex h-tap items-center whitespace-nowrap text-sm tracking-[0.02em] transition-colors duration-base ease-out",
                        active ? "text-ink" : "text-ink-muted hover:text-ink",
                        "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-base after:ease-out",
                        active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LocalTime className="hidden lg:flex" />
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-tap w-tap items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-base ease-out hover:border-line-strong hover:text-ink md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <span aria-hidden="true" className="progress-line absolute inset-x-0 bottom-[-1px] h-px bg-accent/80" />
      </header>

      {/* Full-screen menu below md. */}
      <nav
        id={menuId}
        aria-label="Primary, mobile"
        hidden={!open}
        className="fixed inset-0 z-30 flex flex-col bg-void/95 pt-[var(--size-header)] md:hidden"
      >
        <ul className="container-content flex flex-1 flex-col justify-center gap-2">
          {PRIMARY_NAV.map((item, i) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <li key={item.href} className="menu-item" style={{ "--i": i } as CSSProperties}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex min-h-tap items-baseline justify-between border-b border-line py-4 font-display text-5xl transition-colors duration-base ease-out",
                    active ? "text-ink" : "text-ink-muted hover:text-ink",
                  ].join(" ")}
                >
                  <span>{item.label}</span>
                  {active ? <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="container-content menu-item flex items-center justify-between pb-10" style={{ "--i": 5 } as CSSProperties}>
          <LocalTime />
          <p className="font-display text-lg text-ink-muted">good night.</p>
        </div>
      </nav>
    </>
  );
}
