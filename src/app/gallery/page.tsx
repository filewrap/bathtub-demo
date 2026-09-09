import type { Metadata } from "next";
import { GALLERY_ITEMS } from "@/lib/media-manifest";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Tubs in images and video. Pick the one you want to disappear into.",
};

export default function GalleryPage() {
  return (
    <section className="container-content py-16 md:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl">Gallery</h1>
        <p className="mt-6 text-lg text-ink-muted">
          Every tub is a small, private galaxy. Pick the one you want to
          disappear into.
        </p>
      </header>
      <div className="mt-12">
        <GalleryGrid items={GALLERY_ITEMS} />
      </div>
    </section>
  );
}
