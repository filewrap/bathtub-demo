"use client";

import { useCallback, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/media-manifest";
import { GalleryTile } from "./GalleryTile";
import { GalleryLightbox } from "./GalleryLightbox";

type Props = {
  items: GalleryItem[];
  /** How many leading tiles load eagerly (above the fold). */
  eagerCount?: number;
};

/**
 * Manifest-driven responsive grid (Media Gallery blueprint, ADR-001). Opens
 * the lightbox with the selected index and restores focus to the origin
 * tile on close (AC-NYX-MG-002.3).
 */
export function GalleryGrid({ items, eagerCount = 4 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const originRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((index: number, origin: HTMLButtonElement) => {
    originRef.current = origin;
    setOpenIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setOpenIndex(null);
    // Restore focus after the dialog has closed.
    const origin = originRef.current;
    if (origin) requestAnimationFrame(() => origin.focus());
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-surface p-12 text-center">
        <p className="text-xl text-ink">The gallery is empty. So is the tub.</p>
        <p className="mt-3 text-ink-muted">
          Nothing has surfaced yet. Come back after dark.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {items.map((item, i) => (
          <li key={item.id}>
            <GalleryTile
              item={item}
              index={i}
              eager={i < eagerCount}
              onOpen={handleOpen}
            />
          </li>
        ))}
      </ul>
      <GalleryLightbox
        items={items}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={handleClose}
      />
    </>
  );
}
