import { NextResponse } from "next/server";
import { enquirySchema, fieldErrorsFrom, type EnquiryInput, type EnquiryResponse } from "@/lib/enquiry";
import { site } from "@/content/site";

/**
 * Receives admission enquiries and contact messages and emails them to the school via Resend.
 * Requires RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL (see .env.example).
 * Without them it responds 503 "not_configured" so the UI can tell visitors honestly.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return reply({ ok: false, reason: "invalid", fieldErrors: { form: "Invalid request." } }, 400);
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    return reply({ ok: false, reason: "invalid", fieldErrors: fieldErrorsFrom(parsed.error) }, 422);
  }

  // Honeypot filled → silently accept without sending.
  if (parsed.data.company) return reply({ ok: true }, 200);

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL || !ENQUIRY_FROM_EMAIL) {
    return reply({ ok: false, reason: "not_configured" }, 503);
  }

  const { subject, text, replyTo } = compose(parsed.data);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: ENQUIRY_FROM_EMAIL,
        to: ENQUIRY_TO_EMAIL.split(",").map((s) => s.trim()),
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return reply({ ok: false, reason: "failed" }, 502);
    }
  } catch (err) {
    console.error("Enquiry delivery failed", err);
    return reply({ ok: false, reason: "failed" }, 502);
  }

  return reply({ ok: true }, 200);
}

function reply(body: EnquiryResponse, status: number) {
  return NextResponse.json(body, { status });
}

function compose(d: EnquiryInput) {
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  if (d.kind === "admission") {
    return {
      subject: `Admission enquiry — ${d.childName} (${d.grade})`,
      replyTo: d.email || undefined,
      text: [
        `New admission enquiry from the ${site.fullName} website`,
        ``,
        `Parent / guardian: ${d.parentName}`,
        `Child: ${d.childName}`,
        `Class sought: ${d.grade}`,
        `Phone: ${d.phone}`,
        `Email: ${d.email || "—"}`,
        ``,
        `Message:`,
        d.message || "—",
        ``,
        `Received: ${when} IST`,
      ].join("\n"),
    };
  }
  return {
    subject: `Website message — ${d.name}`,
    replyTo: d.email || undefined,
    text: [
      `New message from the ${site.fullName} website`,
      ``,
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      `Email: ${d.email || "—"}`,
      ``,
      `Message:`,
      d.message,
      ``,
      `Received: ${when} IST`,
    ].join("\n"),
  };
}
