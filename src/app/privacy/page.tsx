import type { Metadata } from "next";
import { ConsentControls } from "@/components/consent/ConsentControls";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What NYX Atlas collects, why, which cookies are involved, and how to reach us about it.",
};

const PRIVACY_EMAIL = "privacy@nyxatlas.example";

/**
 * Privacy Policy (AC-NYX-PC-003.1 to 003.3). Static content, readable with no
 * consent choice made. The re-consent control is the only interactive island.
 */
export default function PrivacyPage() {
  return (
    <article className="container-content py-16 md:py-24">
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        lede="Your secrets soak with you. We keep nothing we don't have to."
      />

      <div className="mt-16 max-w-2xl space-y-14 text-lg text-ink-muted [&_h2]:text-3xl [&_h2]:text-ink [&_p]:mt-5 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 md:mt-20">
        <section aria-labelledby="collected">
          <h2 id="collected">What we collect</h2>
          <p>
            Very little, and only when you hand it over. If you send a contact
            enquiry we receive your name, email address, your message, and, if
            you built one, a summary of your tub configuration. That is the
            full list. We do not run accounts and there is nothing to sign up
            for.
          </p>
          <p>
            Your theme preference and your cookie choice are stored in your
            own browser. They never leave it.
          </p>
        </section>

        <section aria-labelledby="purpose">
          <h2 id="purpose">Why we collect it</h2>
          <ul>
            <li>To answer your enquiry. That is the whole point of it.</li>
            <li>
              To remember how you like the site to look, so the lights are the
              way you left them.
            </li>
            <li>
              To remember whether you accepted the crumbs, so we do not ask you
              twice.
            </li>
          </ul>
          <p>
            Contact enquiries are forwarded to the provider that delivers our
            mail. We do not sell, rent, or trade your details. Nobody is
            interested in them but us.
          </p>
        </section>

        <section aria-labelledby="cookies">
          <h2 id="cookies">Cookies and similar things</h2>
          <p>
            <strong className="font-medium text-ink">Essential storage</strong> runs
            regardless of your choice. It holds your theme and your cookie
            decision, and nothing else. It is not used to identify you.
          </p>
          <p>
            <strong className="font-medium text-ink">Non-essential cookies</strong> are
            for analytics: which pages get visited, roughly how long people
            linger. They stay switched off until you accept them, and they
            switch back off the moment you change your mind.
          </p>
          <div className="mt-8">
            <ConsentControls />
          </div>
        </section>

        <section aria-labelledby="contact">
          <h2 id="contact">Talking to us about privacy</h2>
          <p>
            Questions, corrections, or a request to forget you entirely:
            write to{" "}
            <a
              href={`mailto:${PRIVACY_EMAIL}`}
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-base ease-gravity hover:text-accent"
            >
              {PRIVACY_EMAIL}
            </a>
            . We answer between dusk and the hour no one admits to being awake.
          </p>
        </section>
      </div>
    </article>
  );
}
