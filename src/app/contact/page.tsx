import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us (preferably after dark).",
};

export default function ContactPage() {
  return (
    <section className="container-content py-16 md:py-24">
      <PageHeader
        eyebrow="Contact"
        title="Contact us (preferably after dark)."
        lede="Tell us about the tub, the room, or the week you need to drown. We read everything."
      />
      <div className="mt-14 md:mt-20">
        <ContactForm />
      </div>
    </section>
  );
}
