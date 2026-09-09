"use client";

import { Loader2, Send } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { clearEnquiryHandoff, readEnquiryHandoff } from "@/components/configurator/enquiry-handoff";
import { button } from "@/components/ui/button";
import { EnquiryConfigSummary } from "./EnquiryConfigSummary";
import {
  hasErrors,
  LIMITS,
  MESSAGES,
  newSubmissionToken,
  validate,
  type ContactField,
  type ContactRequest,
  type ContactResponse,
  type FieldErrors,
} from "./contact-schema";

type Values = Record<ContactField, string>;
type Status = "idle" | "sending" | "sent" | "failed";

const EMPTY: Values = { name: "", email: "", message: "" };

/**
 * ContactForm + EnquiryConfigSummary host (Contact Page blueprint).
 * Reads the Enquiry Handoff on mount (AC-NYX-CP-003.1/003.3), validates
 * client-side (REQ-NYX-CP-002), posts a ContactRequest, blocks duplicates
 * while in flight (001.3), retains values on failure (001.4), confirms in
 * voice (001.2).
 */
export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [configurationSummary, setConfigurationSummary] = useState<string | null>(null);
  const tokenRef = useRef<string>(newSubmissionToken());
  const inFlight = useRef(false);
  const baseId = useId();

  useEffect(() => {
    const handoff = readEnquiryHandoff();
    if (handoff?.configurationSummary) setConfigurationSummary(handoff.configurationSummary);
  }, []);

  const setField = (field: ContactField, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) {
      const next = validate({ ...values, [field]: value });
      if (!next[field]) {
        setErrors((e) => {
          const copy = { ...e };
          delete copy[field];
          return copy;
        });
      }
    }
    if (status === "failed") setStatus("idle");
  };

  const removeConfiguration = () => {
    setConfigurationSummary(null);
    clearEnquiryHandoff();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;

    const fieldErrors = validate(values);
    if (hasErrors(fieldErrors)) {
      setErrors(fieldErrors);
      setServerMessage(null);
      const first = (Object.keys(fieldErrors) as ContactField[])[0];
      document.getElementById(`${baseId}-${first}`)?.focus();
      return;
    }

    inFlight.current = true;
    setStatus("sending");
    setServerMessage(null);

    const payload: ContactRequest = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      submissionToken: tokenRef.current,
      ...(configurationSummary ? { configurationSummary } : {}),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;

      if (res.ok && data?.status === "ok") {
        setStatus("sent");
        clearEnquiryHandoff();
        return;
      }

      if (data?.status === "error") {
        if (data.fields && hasErrors(data.fields)) setErrors(data.fields);
        setServerMessage(data.message);
      } else {
        setServerMessage(MESSAGES.sendFailed);
      }
      setStatus("failed");
    } catch {
      setServerMessage(MESSAGES.sendFailed);
      setStatus("failed");
    } finally {
      inFlight.current = false;
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="card max-w-2xl border-accent/40 p-8 shadow-glow md:p-12">
        <p className="label">Received</p>
        <h2 className="mt-4 text-4xl text-ink">
          Somewhere in the dark, a lamp came on<span className="text-accent">.</span>
        </h2>
        <p className="mt-5 text-lg text-ink-muted">
          We answer between dusk and the hour no one admits to being awake. Yours is in the queue.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setErrors({});
            setServerMessage(null);
            tokenRef.current = newSubmissionToken();
            setStatus("idle");
          }}
          className={button("secondary", "md", "mt-8")}
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status === "sending";
  const remaining = LIMITS.message - values.message.length;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-16">
      <form onSubmit={onSubmit} noValidate aria-describedby={`${baseId}-hours`} className="grid max-w-2xl gap-7">
        <p id={`${baseId}-hours`} className="label">
          Hours: dusk to the hour no one admits to being awake
        </p>

        <div className="grid gap-7 sm:grid-cols-2">
          <Field
            id={`${baseId}-name`}
            label="Name"
            error={errors.name}
            value={values.name}
            onChange={(v) => setField("name", v)}
            autoComplete="name"
            disabled={sending}
          />
          <Field
            id={`${baseId}-email`}
            label="Email"
            type="email"
            error={errors.email}
            value={values.email}
            onChange={(v) => setField("email", v)}
            autoComplete="email"
            inputMode="email"
            disabled={sending}
          />
        </div>
        <Field
          id={`${baseId}-message`}
          label="Message"
          multiline
          error={errors.message}
          value={values.message}
          onChange={(v) => setField("message", v)}
          disabled={sending}
          hint={remaining < 400 ? `${remaining} characters left` : undefined}
        />

        <div className="min-h-[1.5rem]" aria-live="polite">
          {status === "failed" && serverMessage ? <p className="text-sm text-accent">{serverMessage}</p> : null}
        </div>

        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className={button("primary", "lg", "sm:justify-self-start disabled:cursor-wait")}
        >
          {sending ? (
            <>
              <Loader2 size={18} strokeWidth={2} className="animate-spin" aria-hidden="true" />
              Sinking it through
            </>
          ) : (
            <>
              <Send size={18} strokeWidth={2} aria-hidden="true" />
              Send it into the dark
            </>
          )}
        </button>
      </form>

      {configurationSummary ? (
        <EnquiryConfigSummary summary={configurationSummary} onRemove={removeConfiguration} />
      ) : null}
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "text";
  disabled?: boolean;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  multiline = false,
  autoComplete,
  inputMode,
  disabled,
}: FieldProps) {
  const errorId = `${id}-error`;
  const base =
    "w-full rounded-lg border bg-surface px-4 text-base text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-base ease-out focus-visible:border-accent focus-visible:shadow-glow focus-visible:outline-none disabled:opacity-60";
  const border = error ? "border-danger" : "border-line hover:border-line-strong";

  return (
    <div className="grid min-w-0 gap-2">
      <label htmlFor={id} className="label text-ink-muted">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          className={`${base} ${border} min-h-[10rem] py-3`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          className={`${base} ${border} h-[3.5rem]`}
        />
      )}
      <p id={errorId} role="alert" className="min-h-[1.25rem] text-xs text-danger">
        {error ?? ""}
      </p>
      {!error && hint ? <p className="spec -mt-1 text-xs text-ink-faint">{hint}</p> : null}
    </div>
  );
}
