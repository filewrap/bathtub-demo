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
    const origin = originRef.current;
    if (origin) requestAnimationFrame(() => origin.focus());
  }, []);

  if (items.length === 0) {
    return (
      <div className="card border-dashed p-12 text-center">
        <p className="text-2xl text-ink">The gallery is empty. So is the tub.</p>
        <p className="mt-3 text-ink-muted">Nothing has surfaced yet. Come back after dark.</p>
      </div>
    );
  }

  return (
    <>
      <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 [grid-template-columns:repeat(1,minmax(0,1fr))] sm:[grid-template-columns:repeat(2,minmax(0,1fr))] lg:[grid-template-columns:repeat(3,minmax(0,1fr))]">
        {items.map((item, i) => (
          <li key={item.id} className="min-w-0">
            <GalleryTile item={item} index={i} eager={i < eagerCount} onOpen={handleOpen} />
          </li>
        ))}
      </ul>
      <GalleryLightbox items={items} index={openIndex} onChange={setOpenIndex} onClose={handleClose} />
    </>
  );
}
