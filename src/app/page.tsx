import { HeaderHero } from "@/components/hero/HeaderHero";
import { PagePlaceholder } from "@/components/shell/PagePlaceholder";

export default function HomePage() {
  return (
    <>
      <HeaderHero />
      <PagePlaceholder
        title="The rest of the house"
        lede="Value promise, tub range, gallery preview, and customers atlas arrive in later work orders."
      />
    </>
  );
}
