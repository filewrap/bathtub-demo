"use client";

import { ImageOff, Play } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { GalleryItem } from "@/lib/media-manifest";

type Props = {
  item: GalleryItem;
  index: number;
  /** Load immediately instead of waiting for the viewport (above-the-fold). */
  eager?: boolean;
  onOpen: (index: number, origin: HTMLButtonElement) => void;
  buttonRef?: RefObject<HTMLButtonElement | null>;
};

type LoadState = "idle" | "loading" | "loaded" | "failed";

/**
 * One grid tile. Reserves its final aspect box before load
 * (AC-NYX-MG-001.3), starts loading as it approaches the viewport
 * (001.4), marks video with a play indicator (001.2), and swaps to a
 * placeholder on failure (001.6).
 */
export function GalleryTile({ item, index, eager = false, onOpen, buttonRef }: Props) {
  const localRef = useRef<HTMLButtonElement>(null);
  const ref = buttonRef ?? localRef;
  const [state, setState] = useState<LoadState>(eager ? "loading" : "idle");

  useEffect(() => {
    if (eager || state !== "idle") return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver !== "function") {
      setState("loading");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("loading");
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, state, ref]);

  const label = `${item.type === "video" ? "Play video" : "Open image"}: ${item.alt}`;

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => onOpen(index, e.currentTarget)}
      aria-label={label}
      data-state={state}
      className="group relative block w-full overflow-hidden rounded-lg border border-line bg-surface-raised text-left shadow-soft transition-transform duration-base ease-gravity hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
    >
      {state === "failed" ? (
        <div className="absolute inset-0 grid place-items-center bg-surface text-ink-faint">
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <ImageOff size={24} strokeWidth={1.5} aria-hidden="true" />
            <span className="text-xs">This one slipped under. Try the others.</span>
          </div>
        </div>
      ) : (
        <>
          {/* Placeholder occupies the final dimensions until loaded. */}
          <div
            aria-hidden="true"
            className={[
              "absolute inset-0 bg-gradient-to-br from-surface-raised to-surface-overlay transition-opacity duration-slow ease-gravity",
              state === "loaded" ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          {state !== "idle" ? (
            // eslint-disable-next-line @next/next/no-img-element -- manifest-driven placeholder assets
            <img
              src={item.poster}
              width={item.width}
              height={item.height}
              alt=""
              decoding="async"
              loading={eager ? "eager" : "lazy"}
              onLoad={() => setState("loaded")}
              onError={() => setState("failed")}
              className={[
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-gravity",
                state === "loaded" ? "opacity-100" : "opacity-0",
              ].join(" ")}
            />
          ) : null}
        </>
      )}

      {item.type === "video" && state !== "failed" ? (
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-void/80 text-accent shadow-glow backdrop-blur"
        >
          <Play size={16} strokeWidth={2} className="ml-0.5" />
        </span>
      ) : null}
    </button>
  );
}
