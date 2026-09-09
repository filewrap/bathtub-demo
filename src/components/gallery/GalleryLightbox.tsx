"use client";

import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/media-manifest";

type Props = {
  items: GalleryItem[];
  /** Index of the open item, or null when closed. */
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Overlay viewer (AC-NYX-MG-002.1 to 002.5). Built on <dialog> with
 * showModal(), which gives a native top-layer, Escape handling, and inert
 * background; a small Tab handler keeps focus cycling inside. The grid
 * restores focus to the originating tile on close.
 */
export function GalleryLightbox({ items, index, onChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const open = index !== null;
  const item = open ? items[index] : null;
  const count = items.length;

  const prev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + count) % count);
  }, [index, count, onChange]);

  const next = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % count);
  }, [index, count, onChange]);

  // Open/close the native dialog in step with `index`.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Reset video state when the item changes.
  useEffect(() => {
    setPlaying(false);
    setVideoFailed(false);
  }, [index]);

  // Keyboard: arrows to page, Tab to cycle within the dialog.
  useEffect(() => {
    if (!open) return;
    const d = dialogRef.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "Tab") {
        const nodes = Array.from(d.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    d.addEventListener("keydown", onKey);
    return () => d.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Gallery viewer"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(e) => {
        // Backdrop click closes; clicks inside the panel do not.
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-void/90 backdrop:backdrop-blur-sm"
    >
      {item ? (
        <div className="flex h-full w-full flex-col">
          <div className="container-content flex h-[var(--size-header)] shrink-0 items-center justify-between">
            <p className="text-sm text-ink-muted" aria-live="polite">
              {index! + 1} / {count}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="inline-flex h-tap w-tap items-center justify-center rounded-md border border-line bg-surface text-ink-muted transition-colors duration-base ease-gravity hover:border-line-strong hover:text-ink"
            >
              <X size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous item"
              className="absolute left-3 top-1/2 z-10 inline-flex h-tap w-tap -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink-muted transition-colors duration-base ease-gravity hover:border-line-strong hover:text-ink sm:left-6"
            >
              <ChevronLeft size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>

            <figure
              className="relative max-h-full max-w-full overflow-hidden rounded-lg border border-line bg-surface shadow-lift"
              style={{
                aspectRatio: `${item.width} / ${item.height}`,
                width: "min(100%, calc((100dvh - 12rem) * " + item.width / item.height + "))",
              }}
            >
              {item.type === "video" && !videoFailed ? (
                <>
                  <video
                    ref={videoRef}
                    key={item.id}
                    poster={item.poster}
                    playsInline
                    loop
                    preload="metadata"
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onError={() => setVideoFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-label={item.alt}
                  >
                    {item.sources.map((s) => (
                      <source key={s.src} src={s.src} type={s.type} onError={() => setVideoFailed(true)} />
                    ))}
                  </video>
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={playing ? "Pause video" : "Play video"}
                    aria-pressed={playing}
                    className="absolute bottom-4 left-4 inline-flex h-tap w-tap items-center justify-center rounded-full bg-void/80 text-accent shadow-glow backdrop-blur transition-transform duration-base ease-gravity hover:-translate-y-px"
                  >
                    {playing ? (
                      <Pause size={18} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <Play size={18} strokeWidth={2} className="ml-0.5" aria-hidden="true" />
                    )}
                  </button>
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- manifest-driven placeholder assets
                <img
                  key={item.id}
                  src={item.poster}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <figcaption className="sr-only">{item.alt}</figcaption>
            </figure>

            <button
              type="button"
              onClick={next}
              aria-label="Next item"
              className="absolute right-3 top-1/2 z-10 inline-flex h-tap w-tap -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink-muted transition-colors duration-base ease-gravity hover:border-line-strong hover:text-ink sm:right-6"
            >
              <ChevronRight size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <p className="container-content shrink-0 pb-6 text-center text-sm text-ink-muted">
            {item.alt}
            {videoFailed ? " (The video went quiet. The still remains.)" : ""}
          </p>
        </div>
      ) : null}
    </dialog>
  );
}
