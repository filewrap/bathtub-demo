import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Configure",
  description: "Tell us how deep you plan to go. We won't ask why.",
};

export default function ConfigurePage() {
  return (
    <section className="container-content py-16 md:py-24">
      <PageHeader
        eyebrow="Configurator"
        title="Tell us how deep you plan to go."
        lede={
          <>
            We won&apos;t ask why. Six choices, one tub, a running estimate of how much water you are about to disappear into.
          </>
        }
      />
      <div className="mt-14 md:mt-20">
        <Configurator />
      </div>
    </section>
  );
}
