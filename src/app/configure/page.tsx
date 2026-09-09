import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "Configure" };

export default function ConfigurePage() {
  return (
    <PagePlaceholder
      title="Configure"
      lede="The tub configurator arrives in a later work order."
    />
  );
}
