import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us (preferably after dark).",
};

export default function ContactPage() {
  return (
    <section className="container-content py-16 md:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl">Contact us (preferably after dark).</h1>
        <p className="mt-6 text-lg text-ink-muted">
          Tell us about the tub, the room, or the week you need to drown. We read everything.
        </p>
      </header>
      <div className="mt-12">
        <ContactForm />
      </div>
    </section>
  );
}
