import { NextResponse } from "next/server";
import {
  hasErrors,
  LIMITS,
  MESSAGES,
  validate,
  type ContactRequest,
  type ContactResponse,
} from "@/components/contact/contact-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * ContactApiHandler (Contact Page blueprint). Re-validates the
 * ContactRequest, dedupes by submissionToken, forwards to the external
 * provider with a server-only key, and returns a structured result.
 *
 * Dedup store is in-memory per warm instance with a TTL. That is enough to
 * stop a double-click or a retry storm from a single visitor; a durable
 * store would be needed for cross-instance guarantees.
 */

const DEDUP_TTL_MS = 10 * 60 * 1000;
const seen = new Map<string, number>();

function isDuplicate(token: string): boolean {
  const now = Date.now();
  for (const [k, t] of seen) if (now - t > DEDUP_TTL_MS) seen.delete(k);
  if (seen.has(token)) return true;
  seen.set(token, now);
  return false;
}

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

async function forwardToProvider(req: ContactRequest): Promise<void> {
  const url = process.env.CONTACT_PROVIDER_URL;
  const key = process.env.CONTACT_PROVIDER_KEY;

  if (!url) {
    // No provider configured (local/preview). Log server-side and accept.
    console.info("[contact] provider not configured; enquiry logged only", {
      name: req.name,
      email: req.email,
      hasConfiguration: Boolean(req.configurationSummary),
      token: req.submissionToken,
    });
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(key ? { authorization: `Bearer ${key}` } : {}),
    },
    body: JSON.stringify({
      name: req.name,
      email: req.email,
      message: req.message,
      configurationSummary: req.configurationSummary ?? null,
      submissionToken: req.submissionToken,
      source: "nyx-atlas-contact",
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new Error(`provider responded ${res.status}`);
  }
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ status: "error", message: MESSAGES.invalid }, 400);
  }

  if (!raw || typeof raw !== "object") {
    return json({ status: "error", message: MESSAGES.invalid }, 400);
  }
  const body = raw as Record<string, unknown>;

  const fields = validate(body);
  if (hasErrors(fields)) {
    return json({ status: "error", fields, message: MESSAGES.invalid }, 400);
  }

  const token = typeof body.submissionToken === "string" ? body.submissionToken.trim() : "";
  if (!token || token.length > LIMITS.submissionToken) {
    return json({ status: "error", message: MESSAGES.invalid }, 400);
  }

  let configurationSummary: string | undefined;
  if (typeof body.configurationSummary === "string" && body.configurationSummary.trim()) {
    configurationSummary = body.configurationSummary.trim().slice(0, LIMITS.configurationSummary);
  }

  const req: ContactRequest = {
    name: (body.name as string).trim(),
    email: (body.email as string).trim(),
    message: (body.message as string).trim(),
    configurationSummary,
    submissionToken: token,
  };

  // Idempotent: a repeated token is treated as already sent.
  if (isDuplicate(token)) {
    return json({ status: "ok" }, 200);
  }

  try {
    await forwardToProvider(req);
  } catch (err) {
    console.error("[contact] forward failed", err);
    // Allow a retry with the same token.
    seen.delete(token);
    return json({ status: "error", message: MESSAGES.sendFailed }, 502);
  }

  return json({ status: "ok" }, 200);
}
