import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Contact call to action (AC-NYX-003.1, 003.4). */
export function ContactCta() {
  return (
    <section aria-labelledby="contact-cta-heading" className="container-content py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="contact-cta-heading" className="text-3xl md:text-4xl">
          Contact us (preferably after dark).
        </h2>
        <p className="mt-4 text-ink-muted">
          We answer between dusk and the hour no one admits to being awake.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex h-tap items-center gap-2 rounded-md border border-line-strong px-6 text-sm text-ink transition-colors duration-base ease-gravity hover:border-accent hover:text-accent"
        >
          Say something into the dark
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
