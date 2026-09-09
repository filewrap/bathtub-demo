import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GROUPS, type TubConfiguration } from "@/components/configurator/config-rules";
import { LiveTub } from "@/components/tub/LiveTub";
import { button } from "@/components/ui/button";

const SHOWN: TubConfiguration = {
  size: "standard",
  material: "cast-iron",
  hydrotherapy: "combination",
  heater: "inline",
  chromotherapy: "underwater-led",
  depth: "deep-soak",
};

/** Configurator entry point (AC-NYX-003.1, 003.2). Full-bleed stage. */
export function ConfiguratorEntry() {
  const optionCount = GROUPS.reduce((n, g) => n + g.options.length, 0);
  return (
    <section aria-labelledby="configure-heading" className="reveal stage relative isolate overflow-hidden border-y border-line">
      <div className="container-content grid items-center gap-12 py-20 md:grid-cols-2 md:py-32">
        <div className="max-w-xl">
          <h2 id="configure-heading" className="text-4xl text-ink md:text-5xl">
            Tell us how deep you plan to go.
          </h2>
          <p className="mt-6 text-lg text-ink-muted">We won&apos;t ask why.</p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6">
            <div>
              <dt className="label">Decisions</dt>
              <dd className="spec mt-1 text-sm text-ink">{GROUPS.length}</dd>
            </div>
            <div>
              <dt className="label">Options</dt>
              <dd className="spec mt-1 text-sm text-ink">{optionCount}</dd>
            </div>
          </dl>
          <Link href="/configure" className={button("primary", "lg", "mt-10")}>
            Configure your tub
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
        <div className="relative aspect-[4/3] min-w-0 md:aspect-[5/4]">
          <div className="breathe absolute inset-0">
            <LiveTub id="entry-tub" config={SHOWN} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
