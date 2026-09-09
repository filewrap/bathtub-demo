export type ConsentChoice = "accept" | "reject";

export const CONSENT_STORAGE_KEY = "nyx-atlas:consent";

export function isConsentChoice(value: unknown): value is ConsentChoice {
  return value === "accept" || value === "reject";
}

export function readStoredConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    return isConsentChoice(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function writeStoredConsent(choice: ConsentChoice | null): void {
  try {
    if (choice === null) localStorage.removeItem(CONSENT_STORAGE_KEY);
    else localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* storage unavailable; choice applies for this session only */
  }
}
