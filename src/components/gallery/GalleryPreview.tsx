import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_PREVIEW_COUNT } from "@/lib/media-manifest";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { button } from "@/components/ui/button";

/**
 * Home Page taste of the gallery (AC-NYX-MG-003.1, 003.2). Server component:
 * the whole block is one link into /gallery, so every tile and the CTA
 * navigate there. Tiles reserve their aspect boxes. First tile is set larger
 * so the grid has a lead image.
 */
export function GalleryPreview() {
  const items = GALLERY_ITEMS.slice(0, GALLERY_PREVIEW_COUNT);

  return (
    <section aria-labelledby="gallery-preview-heading" className="reveal container-content py-20 md:py-28">
      <SectionHeading
        id="gallery-preview-heading"
        index="03"
        eyebrow="The gallery"
        title="Proof, in low light."
        lede="Tubs in images and video. Look as long as you like."
        action={
          <Link href="/gallery" className={button("secondary")}>
            Open the gallery
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        }
      />

      {items.length > 0 ? (
        <Link
          href="/gallery"
          aria-label="Open the gallery"
          className="mt-14 grid grid-cols-2 gap-3 rounded-lg focus-visible:outline-offset-4 md:grid-cols-4 md:grid-rows-2 md:gap-4"
        >
          {items.map((item, i) => (
            <span
              key={item.id}
              className={[
                "card group relative block overflow-hidden",
                i === 0 ? "col-span-2 row-span-2" : "",
              ].join(" ")}
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
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-drift ease-drift group-hover:scale-[1.03]"
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
