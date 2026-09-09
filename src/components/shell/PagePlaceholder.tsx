/** Temporary route skeleton content. Replaced by feature work orders. */
export function PagePlaceholder({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  return (
    <section className="container-content py-20 md:py-32">
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      <p className="mt-6 max-w-xl text-lg text-ink-muted">{lede}</p>
    </section>
  );
}
