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
 * placeholder on failure (001.6). Caption and dimensions surface on hover
 * and focus.
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
      className="group card relative block w-full min-w-0 overflow-hidden text-left transition-[transform,border-color,box-shadow] duration-slow ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-lift focus-visible:-translate-y-1"
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
          <div
            aria-hidden="true"
            className={[
              "stage absolute inset-0 transition-opacity duration-slow ease-out",
              state === "loaded" ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          {state !== "idle" ? (
            // eslint-disable-next-line @next/next/no-img-element -- manifest-driven scene assets
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
                "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-drift ease-out group-hover:scale-[1.04]",
                state === "loaded" ? "opacity-100" : "opacity-0",
              ].join(" ")}
            />
          ) : null}
        </>
      )}

      {state !== "failed" ? (
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-void/90 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-slow ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="label min-w-0 truncate text-ink">{item.caption}</span>
          <span className="spec shrink-0 text-xs text-ink-faint">
            {item.width} x {item.height}
          </span>
        </span>
      ) : null}

      {item.type === "video" && state !== "failed" ? (
        <span
          aria-hidden="true"
          className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-void/80 text-accent shadow-glow backdrop-blur"
        >
          <Play size={16} strokeWidth={2} className="ml-0.5" />
        </span>
      ) : null}
    </button>
  );
}
