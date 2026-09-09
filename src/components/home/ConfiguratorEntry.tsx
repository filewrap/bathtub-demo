import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Configurator entry point (AC-NYX-003.1, 003.2). */
export function ConfiguratorEntry() {
  return (
    <section aria-labelledby="configure-heading" className="container-content py-8 md:py-12">
      <div className="flex flex-col items-start gap-6 rounded-xl border border-accent/30 bg-surface-raised p-8 shadow-glow md:flex-row md:items-center md:justify-between md:p-12">
        <div className="max-w-xl">
          <h2 id="configure-heading" className="text-3xl md:text-4xl">
            Tell us how deep you plan to go.
          </h2>
          <p className="mt-3 text-ink-muted">We won&apos;t ask why.</p>
        </div>
        <Link
          href="/configure"
          className="inline-flex h-tap shrink-0 items-center gap-2 rounded-md bg-accent px-6 text-sm font-medium text-accent-ink shadow-glow transition-transform duration-base ease-gravity hover:-translate-y-px"
        >
          Configure your tub
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
