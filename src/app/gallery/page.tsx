import type { Metadata } from "next";
import { GALLERY_ITEMS } from "@/lib/media-manifest";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Tubs in images and video. Pick the one you want to disappear into.",
};

export default function GalleryPage() {
  return (
    <section className="container-content py-16 md:py-24">
      <PageHeader
        eyebrow="Gallery"
        title="Proof, in low light."
        lede="Every tub is a small, private galaxy. Pick the one you want to disappear into."
      />
      <div className="mt-14 md:mt-20">
        <GalleryGrid items={GALLERY_ITEMS} />
      </div>
    </section>
  );
}
