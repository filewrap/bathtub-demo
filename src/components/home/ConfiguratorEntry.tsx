import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { button } from "@/components/ui/button";

/** Configurator entry point (AC-NYX-003.1, 003.2). Full-bleed glow band. */
export function ConfiguratorEntry() {
  return (
    <section
      aria-labelledby="configure-heading"
      className="reveal relative isolate overflow-hidden border-y border-line bg-surface"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 top-1/2 h-[140%] w-[70%] -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 top-1/2 h-[120%] w-[60%] -translate-y-1/2 rounded-full bg-cosmic-violet/10 blur-3xl"
      />
      <div className="container-content relative flex flex-col items-start gap-10 py-20 md:flex-row md:items-center md:justify-between md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">
            <span className="text-ink-faint">02</span>
            Configure
          </p>
          <h2 id="configure-heading" className="mt-5 text-4xl md:text-6xl">
            Tell us how deep you plan to go.
          </h2>
          <p className="mt-5 text-lg text-ink-muted">
            We won&apos;t ask <em className="display-italic font-display">why.</em>
          </p>
        </div>
        <Link href="/configure" className={button("primary", "lg")}>
          Configure your tub
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
