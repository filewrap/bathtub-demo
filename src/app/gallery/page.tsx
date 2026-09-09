import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <PagePlaceholder
      title="Gallery"
      lede="Media grid and lightbox arrive in a later work order."
    />
  );
}
