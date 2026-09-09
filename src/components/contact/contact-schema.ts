/**
 * ContactRequest contract (Contact Page blueprint, Integration Contracts)
 * and validation shared by ContactForm (client) and ContactApiHandler
 * (server). Server-side validation is authoritative (ADR-001).
 */

export type ContactRequest = {
  name: string;
  email: string;
  message: string;
  configurationSummary?: string;
  submissionToken: string;
};

export type ContactField = "name" | "email" | "message";

export type FieldErrors = Partial<Record<ContactField, string>>;

export type ContactResponse =
  | { status: "ok" }
  | { status: "error"; fields?: FieldErrors; message: string };

export const LIMITS = {
  name: 120,
  email: 254,
  message: 4000,
  configurationSummary: 2000,
  submissionToken: 128,
} as const;

// Pragmatic email shape: something@something.tld, no whitespace.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** In-voice, non-blaming messages (AC-NYX-CP-002.3). */
export const MESSAGES = {
  nameRequired: "A name helps us know who is sinking.",
  nameTooLong: "That name is longer than most baths. Shorten it a little.",
  emailRequired: "An email, so we can reply after dark.",
  emailInvalid: "That email does not look reachable yet. One more look.",
  emailTooLong: "That email is longer than we can hold. Shorten it a little.",
  messageRequired: "Tell us something. Even a single word will do.",
  messageTooLong: "That message is deeper than our inbox. Trim it a little.",
  sendFailed: "The message did not make it through the water. Nothing was lost. Try again in a moment.",
  invalid: "A few fields need a moment of attention.",
} as const;

export function validate(input: {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}): FieldErrors {
  const errors: FieldErrors = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";

  if (!name) errors.name = MESSAGES.nameRequired;
  else if (name.length > LIMITS.name) errors.name = MESSAGES.nameTooLong;

  if (!email) errors.email = MESSAGES.emailRequired;
  else if (email.length > LIMITS.email) errors.email = MESSAGES.emailTooLong;
  else if (!EMAIL_RE.test(email)) errors.email = MESSAGES.emailInvalid;

  if (!message) errors.message = MESSAGES.messageRequired;
  else if (message.length > LIMITS.message) errors.message = MESSAGES.messageTooLong;

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function newSubmissionToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}
