import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";

export const metadata: Metadata = {
  title: "Configure",
  description: "Tell us how deep you plan to go. We won't ask why.",
};

export default function ConfigurePage() {
  return (
    <section className="container-content py-16 md:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl">Configure</h1>
        <p className="mt-6 text-lg text-ink-muted">
          Tell us how deep you plan to go. We won&apos;t ask why.
        </p>
      </header>
      <div className="mt-12">
        <Configurator />
      </div>
    </section>
  );
}
