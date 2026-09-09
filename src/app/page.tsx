import { HeaderHero } from "@/components/hero/HeaderHero";
import { GalleryPreview } from "@/components/gallery/GalleryPreview";
import { PagePlaceholder } from "@/components/shell/PagePlaceholder";

export default function HomePage() {
  return (
    <>
      <HeaderHero />
      <PagePlaceholder
        title="The rest of the house"
        lede="Value promise, tub range, configurator entry, and customers atlas arrive in WO-7."
      />
      <GalleryPreview />
    </>
  );
}
