import type { Metadata } from "next";
import { GALLERY_ITEMS } from "@/lib/media-manifest";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Tubs in images and video. Pick the one you want to disappear into.",
};

export default function GalleryPage() {
  const images = GALLERY_ITEMS.filter((i) => i.type === "image").length;
  const videos = GALLERY_ITEMS.length - images;
  return (
    <section className="container-content pb-20 pt-[calc(var(--size-header)+3rem)] md:pb-32 md:pt-[calc(var(--size-header)+5rem)]">
      <PageHeader
        title="Proof, in low light."
        lede="Every tub is a small, private galaxy. Pick the one you want to disappear into."
        meta={`${images} images, ${videos} ${videos === 1 ? "film" : "films"}`}
      />
      <div className="mt-16 md:mt-24">
        <GalleryGrid items={GALLERY_ITEMS} />
      </div>
    </section>
  );
}
