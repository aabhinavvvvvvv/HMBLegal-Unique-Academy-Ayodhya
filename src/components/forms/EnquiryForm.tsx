"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Info, LoaderCircle } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import {
  admissionSchema,
  contactSchema,
  fieldErrorsFrom,
  type EnquiryResponse,
} from "@/lib/enquiry";
import { mapsDirectionsUrl, site } from "@/content/site";
import { sendViaWeb3Forms, web3formsAccessKey } from "@/lib/web3forms";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Kind = "admission" | "contact";
type Status = "idle" | "submitting" | "success" | "not_configured" | "failed";

const fieldsFor: Record<Kind, Array<FieldDef>> = {
  admission: [
    { name: "parentName", label: "Parent / guardian name", autoComplete: "name", required: true },
    { name: "childName", label: "Child's name", autoComplete: "off", required: true },
    { name: "grade", label: "Class seeking admission for", autoComplete: "off", required: true, placeholder: "e.g. Class 3" },
    { name: "phone", label: "Contact number", type: "tel", autoComplete: "tel", inputMode: "tel", required: true, placeholder: "10-digit mobile number" },
    { name: "email", label: "Email", type: "email", autoComplete: "email", inputMode: "email", hint: "Optional" },
    { name: "message", label: "Anything you'd like us to know?", textarea: true, hint: "Optional", full: true },
  ],
  contact: [
    { name: "name", label: "Your name", autoComplete: "name", required: true },
    { name: "phone", label: "Contact number", type: "tel", autoComplete: "tel", inputMode: "tel", required: true, placeholder: "10-digit mobile number" },
    { name: "email", label: "Email", type: "email", autoComplete: "email", inputMode: "email", hint: "Optional", full: true },
    { name: "message", label: "Your message", textarea: true, required: true, full: true },
  ],
};

type FieldDef = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  required?: boolean;
  placeholder?: string;
  hint?: string;
  textarea?: boolean;
  full?: boolean;
};

export function EnquiryForm({ kind, submitLabel }: { kind: Kind; submitLabel?: string }) {
  const formId = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const schema = kind === "admission" ? admissionSchema : contactSchema;
  const fields = fieldsFor[kind];

  function readForm(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    return { ...data, kind };
  }

  function validateField(name: string, form: HTMLFormElement) {
    const parsed = schema.safeParse(readForm(form));
    const next = parsed.success ? {} : fieldErrorsFrom(parsed.error);
    setErrors((prev) => {
      const copy = { ...prev };
      if (next[name]) copy[name] = next[name];
      else delete copy[name];
      return copy;
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = readForm(form);
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      const errs = fieldErrorsFrom(parsed.error);
      setErrors(errs);
      const first = fields.find((f) => errs[f.name]);
      if (first) form.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("submitting");

    // Honeypot filled → a bot. Show success without sending anything.
    if (parsed.data.company) {
      setStatus("success");
      form.reset();
      return;
    }

    if (web3formsAccessKey) {
      try {
        const sent = await sendViaWeb3Forms(parsed.data);
        setStatus(sent ? "success" : "failed");
        if (sent) form.reset();
      } catch {
        setStatus("failed");
      }
      return;
    }

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json().catch(() => null)) as EnquiryResponse | null;
      if (body?.ok) {
        setStatus("success");
        form.reset();
      } else if (body && !body.ok && body.reason === "invalid") {
        setErrors(body.fieldErrors);
        setStatus("idle");
      } else if (body && !body.ok && body.reason === "not_configured") {
        setStatus("not_configured");
      } else {
        setStatus("failed");
      }
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-[1.5rem] border border-line bg-stone p-8 sm:p-10"
            role="status"
          >
            <span className="grid size-14 place-items-center rounded-full bg-maroon text-paper">
              <Check aria-hidden="true" className="size-6" />
            </span>
            <h3 className="mt-6 text-3xl">Thank you — we&apos;ve received your {kind === "admission" ? "enquiry" : "message"}.</h3>
            <p className="mt-3 text-lg text-graphite">Our team will get back to you on the number you shared.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="link-underline mt-6 text-sm font-semibold text-maroon"
            >
              Send another {kind === "admission" ? "enquiry" : "message"}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            aria-describedby={`${formId}-note`}
            className="grid gap-x-5 gap-y-6 sm:grid-cols-2"
          >
            {fields.map((f) => (
              <Field
                key={f.name}
                def={f}
                id={`${formId}-${f.name}`}
                error={errors[f.name]}
                onBlur={(e) => e.currentTarget.form && validateField(f.name, e.currentTarget.form)}
                onInput={(e) => {
                  if (errors[f.name] && e.currentTarget.form) validateField(f.name, e.currentTarget.form);
                }}
              />
            ))}

            {/* Honeypot — hidden from people, tempting to bots */}
            <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
              <label htmlFor={`${formId}-company`}>Company</label>
              <input id={`${formId}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p id={`${formId}-note`} className="text-sm text-muted">
                Fields marked <span className="text-maroon">*</span> are required. We use your details only to respond to you.
              </p>
              <Button type="submit" disabled={status === "submitting"} icon={status === "submitting" ? "none" : "arrow"}>
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> Sending…
                  </span>
                ) : (
                  (submitLabel ?? (kind === "admission" ? "Send enquiry" : "Send message"))
                )}
              </Button>
            </div>

            <div aria-live="polite" className="sm:col-span-2">
              {status === "not_configured" && (
                <Notice>
                  Online enquiries are not connected yet, so your message could not be sent.{" "}
                  {site.phone ? (
                    <>
                      Please call the school on{" "}
                      <a href={site.phone.href} className="font-semibold text-maroon underline">
                        {site.phone.display}
                      </a>
                      {site.email && (
                        <>
                          {" "}or email{" "}
                          <a href={site.email.href} className="font-semibold text-maroon underline">
                            {site.email.display}
                          </a>
                        </>
                      )}
                      , or visit us at <strong className="font-semibold text-ink">{site.address.display}</strong>.{" "}
                    </>
                  ) : (
                    <>
                      Please visit the school at <strong className="font-semibold text-ink">{site.address.display}</strong>.{" "}
                    </>
                  )}
                  <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-maroon underline">
                    Get directions
                  </a>
                </Notice>
              )}
              {status === "failed" && (
                <Notice>
                  Something went wrong while sending. Please check your connection and try again
                  {site.phone ? (
                    <>
                      , or call us on{" "}
                      <a href={site.phone.href} className="font-semibold text-maroon underline">
                        {site.phone.display}
                      </a>
                      .
                    </>
                  ) : (
                    <>, or visit us at {site.address.display}.</>
                  )}
                </Notice>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold-soft/30 p-4 text-[0.95rem] leading-relaxed text-graphite"
      role="alert"
    >
      <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-maroon" />
      <span>{children}</span>
    </motion.p>
  );
}

function Field({
  def,
  id,
  error,
  onBlur,
  onInput,
}: {
  def: FieldDef;
  id: string;
  error?: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onInput: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const errorId = `${id}-error`;
  const cls = cn(
    "peer w-full rounded-xl border bg-paper px-4 py-3.5 text-[1rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-300 outline-none",
    "focus:border-maroon focus:shadow-[0_0_0_4px_rgba(123,30,30,0.1)]",
    error ? "border-maroon" : "border-line hover:border-ink/30",
  );
  const common = {
    id,
    name: def.name,
    required: def.required,
    "aria-required": def.required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    autoComplete: def.autoComplete,
    placeholder: def.placeholder,
    onBlur,
    onInput,
  } as const;

  return (
    <div className={cn(def.full && "sm:col-span-2")}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.88rem] font-semibold text-ink">
        <span>
          {def.label}
          {def.required && (
            <span className="text-maroon" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </span>
        {def.hint && <span className="text-xs font-normal text-muted">{def.hint}</span>}
      </label>
      {def.textarea ? (
        <textarea {...common} rows={4} maxLength={1000} className={cn(cls, "resize-y")} />
      ) : (
        <input {...common} type={def.type ?? "text"} inputMode={def.inputMode} maxLength={def.type === "email" ? 120 : 80} className={cls} />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-sm font-medium text-maroon"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
