/**
 * Enquiry Handoff contract between the Tub Configurator and the Contact
 * Page. The configurator writes; the contact page reads and clears.
 */
export const ENQUIRY_STORAGE_KEY = "nyx-atlas:enquiry";

export type EnquiryHandoff = {
  configurationSummary: string;
  createdAt: string;
};

export function writeEnquiryHandoff(configurationSummary: string): void {
  try {
    const payload: EnquiryHandoff = {
      configurationSummary,
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem(ENQUIRY_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* storage unavailable; the visitor can still describe the tub */
  }
}

export function readEnquiryHandoff(): EnquiryHandoff | null {
  try {
    const raw = sessionStorage.getItem(ENQUIRY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<EnquiryHandoff>;
    if (typeof parsed.configurationSummary !== "string") return null;
    return {
      configurationSummary: parsed.configurationSummary,
      createdAt: typeof parsed.createdAt === "string" ? parsed.createdAt : "",
    };
  } catch {
    return null;
  }
}

export function clearEnquiryHandoff(): void {
  try {
    sessionStorage.removeItem(ENQUIRY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
