import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { button } from "@/components/ui/button";

/** Contact call to action (AC-NYX-003.1, 003.4). */
export function ContactCta() {
  return (
    <section aria-labelledby="contact-cta-heading" className="reveal container-content py-24 md:py-40">
      <SectionHeading
        id="contact-cta-heading"
        align="center"
        title="Contact us (preferably after dark)."
        lede="We answer between dusk and the hour no one admits to being awake."
      />
      <div className="mt-10 flex justify-center">
        <Link href="/contact" className={button("secondary", "lg")}>
          Say something into the dark
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
