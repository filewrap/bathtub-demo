import { ATLAS_ROWS } from "@/lib/client-names";
import { MarqueeRow } from "./MarqueeRow";

/**
 * Atlas Strip (AC-NYX-CA-001.1): in-voice heading and two opposite rows of
 * the defined fictional names. The footnote keeps the wink explicit
 * (001.4).
 */
export function CustomersAtlasStrip() {
  const [rowOne, rowTwo] = ATLAS_ROWS;
  return (
    <section
      aria-labelledby="atlas-heading"
      className="reveal border-y border-line bg-surface/50 py-20 md:py-24"
    >
      <div className="container-content flex flex-col items-center text-center">
        <p className="eyebrow eyebrow-plain">
          <span className="text-ink-faint">04</span>
          Customers atlas
        </p>
        <h2 id="atlas-heading" className="mt-5 max-w-2xl text-4xl md:text-5xl">
          Trusted by names you will <em className="display-italic">never</em> Google.
        </h2>
      </div>
      <div className="mt-14 grid gap-6">
        <MarqueeRow names={rowOne} direction="left" durationSeconds={64} label="Client names, first row" />
        <MarqueeRow names={rowTwo} direction="right" durationSeconds={78} label="Client names, second row" />
      </div>
      <p className="container-content mt-10 text-center text-xs text-ink-faint">
        Every name is invented. Any resemblance to a real company is a coincidence we would enjoy.
      </p>
    </section>
  );
}
