import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us (preferably after dark).",
};

export default function ContactPage() {
  return (
    <section className="container-content pb-20 pt-[calc(var(--size-header)+3rem)] md:pb-32 md:pt-[calc(var(--size-header)+5rem)]">
      <PageHeader
        title="Contact us (preferably after dark)."
        lede="We answer between dusk and the hour no one admits to being awake."
      />
      <div className="mt-16 md:mt-24">
        <ContactForm />
      </div>
    </section>
  );
}
