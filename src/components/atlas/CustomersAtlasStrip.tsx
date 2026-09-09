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
    <section aria-labelledby="atlas-heading" className="reveal border-y border-line bg-surface/40 py-20 md:py-28">
      <div className="container-content flex flex-col items-center text-center">
        <h2 id="atlas-heading" className="max-w-3xl text-4xl md:text-5xl">
          Trusted by names you will never Google.
        </h2>
      </div>
      <div className="mt-16 grid gap-8">
        <MarqueeRow names={rowOne} direction="left" durationSeconds={70} label="Client names, first row" />
        <MarqueeRow names={rowTwo} direction="right" durationSeconds={86} label="Client names, second row" />
      </div>
      <p className="container-content mt-12 text-center text-xs text-ink-faint">
        Every name is invented. Any resemblance to a real company is a coincidence we would enjoy.
      </p>
    </section>
  );
}
