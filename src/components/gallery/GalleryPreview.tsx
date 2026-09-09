import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_PREVIEW_COUNT } from "@/lib/media-manifest";

/**
 * Home Page taste of the gallery (AC-NYX-MG-003.1, 003.2). Server component:
 * the whole block is one link into /gallery, so every tile and the CTA
 * navigate there. Tiles reserve their aspect boxes.
 */
export function GalleryPreview() {
  const items = GALLERY_ITEMS.slice(0, GALLERY_PREVIEW_COUNT);

  return (
    <section aria-labelledby="gallery-preview-heading" className="container-content py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <h2 id="gallery-preview-heading" className="text-3xl md:text-4xl">
            Proof, in low light.
          </h2>
          <p className="mt-4 text-ink-muted">
            Tubs in images and video. Look as long as you like.
          </p>
        </div>
        <Link
          href="/gallery"
          className="inline-flex h-tap items-center gap-2 rounded-md border border-line-strong px-5 text-sm text-ink transition-colors duration-base ease-gravity hover:border-accent hover:text-accent"
        >
          Open the gallery
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>

      {items.length > 0 ? (
        <Link
          href="/gallery"
          aria-label="Open the gallery"
          className="mt-10 grid grid-cols-2 gap-3 rounded-lg focus-visible:outline-offset-4 md:grid-cols-4 md:gap-4"
        >
          {items.map((item) => (
            <span
              key={item.id}
              className="relative block overflow-hidden rounded-lg border border-line bg-surface-raised shadow-soft"
              style={{ aspectRatio: "1 / 1" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- manifest-driven placeholder assets */}
              <img
                src={item.poster}
                width={item.width}
                height={item.height}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-drift ease-drift hover:scale-[1.03]"
              />
            </span>
          ))}
        </Link>
      ) : (
        <p className="mt-10 text-ink-muted">Nothing has surfaced yet. Come back after dark.</p>
      )}
    </section>
  );
}
