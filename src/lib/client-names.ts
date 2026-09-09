/**
 * Fictional Client Names (Customers Atlas requirements). None refer to a
 * real company. Only these names may appear in the Atlas Strip
 * (AC-NYX-CA-001.4).
 */
export type ClientName = string;

export const REST_AND_CALM: readonly ClientName[] = [
  "Stillwater & Co.",
  "The Repose Group",
  "Lull Bathing Works",
  "Hush & Harbor",
  "Serene Standard",
  "Idle Hour Estates",
];

export const COMFORT_AND_INDULGENCE: readonly ClientName[] = [
  "Velvet Soak Society",
  "Plush Basin Co.",
  "Warmwell & Sons",
  "The Slow Sunday Club",
  "Featherwater House",
  "Amber Steam Guild",
];

export const SATISFACTION_AND_GUARANTEE: readonly ClientName[] = [
  "Contentment Baths Ltd.",
  "The Sated Company",
  "Bliss Assured Group",
  "Deepwell Guarantee Co.",
  "Ease & Certainty",
  "The Satisfaction Union",
];

export const CLIENT_NAMES: readonly ClientName[] = [
  ...REST_AND_CALM,
  ...COMFORT_AND_INDULGENCE,
  ...SATISFACTION_AND_GUARANTEE,
];

/** Two rows, interleaved across the three groups so each row reads varied. */
export const ATLAS_ROWS: readonly [readonly ClientName[], readonly ClientName[]] = [
  CLIENT_NAMES.filter((_, i) => i % 2 === 0),
  CLIENT_NAMES.filter((_, i) => i % 2 === 1),
];
