import { HeaderHero } from "@/components/hero/HeaderHero";
import { ValuePromise } from "@/components/home/ValuePromise";
import { TubRangeTeaser } from "@/components/home/TubRangeTeaser";
import { ConfiguratorEntry } from "@/components/home/ConfiguratorEntry";
import { GalleryPreview } from "@/components/gallery/GalleryPreview";
import { CustomersAtlasStrip } from "@/components/atlas/CustomersAtlasStrip";
import { ContactCta } from "@/components/home/ContactCta";

/**
 * Home Page composition (AC-NYX-003.1). Order is fixed: hero, value
 * promise, tub range, configurator entry, gallery preview, customers
 * atlas, contact CTA.
 */
export default function HomePage() {
  return (
    <>
      <HeaderHero />
      <ValuePromise />
      <TubRangeTeaser />
      <ConfiguratorEntry />
      <GalleryPreview />
      <CustomersAtlasStrip />
      <ContactCta />
    </>
  );
}
