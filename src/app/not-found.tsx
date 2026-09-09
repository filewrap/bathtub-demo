import Link from "next/link";
import { button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-content flex min-h-[70svh] flex-col justify-center pb-20 pt-[calc(var(--size-header)+3rem)]">
      <p className="label">404</p>
      <h1 className="mt-4 text-display-s text-ink">
        Nothing here<span className="text-accent">.</span> Which is on brand.
      </h1>
      <p className="mt-8 max-w-xl text-lg text-ink-muted">The page drifted off. The rest of the house is still lit.</p>
      <Link href="/" className={button("primary", "lg", "mt-10 self-start")}>
        Back to Home
      </Link>
    </section>
  );
}
