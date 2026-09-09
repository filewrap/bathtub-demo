/** Home Page value promise (AC-NYX-003.1), approved brand copy. */
export function ValuePromise() {
  return (
    <section
      aria-labelledby="promise-heading"
      className="reveal container-content py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl text-center">
        <span aria-hidden="true" className="mx-auto block h-px w-16 bg-accent/70" />
        <h2 id="promise-heading" className="mt-10 text-5xl md:text-7xl">
          We build rest you can{" "}
          <em className="display-italic">drown</em> the week in.
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-ink-muted md:text-xl">
          Satisfaction guaranteed, or we never speak of it again.
        </p>
      </div>
    </section>
  );
}
