import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-content py-20 md:py-32">
      <h1 className="text-4xl md:text-5xl">Nothing here. Which is on brand.</h1>
      <p className="mt-6 max-w-xl text-lg text-ink-muted">
        The page drifted off. The rest of the house is still lit.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-tap items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-ink shadow-glow transition-transform duration-base ease-gravity hover:-translate-y-px"
      >
        Back to Home
      </Link>
    </section>
  );
}
