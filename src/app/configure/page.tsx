import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";
import { GROUPS } from "@/components/configurator/config-rules";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Configure",
  description: "Tell us how deep you plan to go. We won't ask why.",
};

export default function ConfigurePage() {
  const optionCount = GROUPS.reduce((n, g) => n + g.options.length, 0);
  return (
    <section className="container-content pb-20 pt-[calc(var(--size-header)+3rem)] md:pb-32 md:pt-[calc(var(--size-header)+5rem)]">
      <PageHeader
        title="Tell us how deep you plan to go."
        lede="We won't ask why. The tub on the right changes as you decide."
        meta={`${GROUPS.length} decisions, ${optionCount} options, saved in this tab`}
      />
      <div className="mt-16 md:mt-24">
        <Configurator />
      </div>
    </section>
  );
}
