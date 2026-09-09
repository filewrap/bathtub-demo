"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { LiveTub } from "@/components/tub/LiveTub";
import type { TubConfiguration } from "@/components/configurator/config-rules";

const HERO_TUB: TubConfiguration = {
  size: "grand",
  material: "stone-resin",
  hydrotherapy: "none",
  heater: "inline",
  chromotherapy: "off",
  depth: "deep-soak",
};

/**
 * Live tier of the hero. The tub breathes on a slow cycle and leans a few
 * pixels toward the pointer on hover-capable devices. Touch devices get the
 * breathing only. Under reduced motion the controller never mounts this.
 */
export function HeroLiveTub() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const parallax = {
    transform: "translate3d(calc(var(--px, 0) * 16px), calc(var(--py, 0) * 10px), 0)",
    transition: "transform 900ms var(--ease-out)",
  } as CSSProperties;

  return (
    <div ref={ref} className="fade-in absolute inset-0 flex items-center justify-center">
      <div className="h-full w-full" style={parallax}>
        <div className="breathe h-full w-full">
          <LiveTub id="hero-tub" config={HERO_TUB} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
