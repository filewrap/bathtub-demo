"use client";

import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/media-manifest";
import { iconButton } from "@/components/ui/button";

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

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.classList.add("no-scroll");
    } else if (!open && d.open) {
      d.close();
    }
    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, [open]);

  useEffect(() => {
    setPlaying(false);
    setVideoFailed(false);
  }, [index]);

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
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-ink backdrop:bg-void/92 backdrop:backdrop-blur-md"
    >
      {item ? (
        <div className="flex h-full w-full flex-col">
          <div className="container-content flex h-[var(--size-header)] shrink-0 items-center justify-between">
            <p className="spec text-sm text-ink-muted" aria-live="polite">
              {String(index! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
            <button type="button" onClick={onClose} aria-label="Close viewer" className={iconButton}>
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous item"
              className={`${iconButton} absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-surface/90 sm:left-6`}
            >
              <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <figure
              className="card relative max-h-full max-w-full overflow-hidden shadow-lift"
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
                    className="absolute bottom-4 left-4 inline-flex h-tap w-tap items-center justify-center rounded-full bg-void/80 text-accent shadow-glow backdrop-blur transition-transform duration-base ease-out hover:-translate-y-px"
                  >
                    {playing ? (
                      <Pause size={18} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <Play size={18} strokeWidth={2} className="ml-0.5" aria-hidden="true" />
                    )}
                  </button>
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- manifest-driven scene assets
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
              className={`${iconButton} absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-surface/90 sm:right-6`}
            >
              <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="container-content flex shrink-0 flex-col items-center gap-1 pb-8 text-center">
            <p className="label text-ink">{item.caption}</p>
            <p className="max-w-xl text-sm text-ink-muted">
              {item.alt}
              {videoFailed ? " (The video went quiet. The still remains.)" : ""}
            </p>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
