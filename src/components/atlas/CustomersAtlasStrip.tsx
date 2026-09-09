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
    <section aria-labelledby="atlas-heading" className="border-y border-line bg-surface/40 py-16 md:py-20">
      <div className="container-content">
        <h2 id="atlas-heading" className="text-center text-3xl md:text-4xl">
          Trusted by names you will never Google.
        </h2>
      </div>
      <div className="mt-10 grid gap-6">
        <MarqueeRow names={rowOne} direction="left" durationSeconds={64} label="Client names, first row" />
        <MarqueeRow names={rowTwo} direction="right" durationSeconds={78} label="Client names, second row" />
      </div>
      <p className="container-content mt-8 text-center text-xs text-ink-faint">
        Every name is invented. Any resemblance to a real company is a coincidence we would enjoy.
      </p>
    </section>
  );
}
