import { z } from "zod";

/** Indian mobile/landline: optional +91 / 0 prefix, then 10 digits (spaces and dashes allowed). */
const phone = z
  .string()
  .trim()
  .min(1, "Please enter a contact number.")
  .refine((v) => /^(?:\+91|91|0)?\d{10}$/.test(v.replace(/[\s()-]/g, "")), {
    message: "Please enter a valid 10-digit phone number.",
  });

const optionalEmail = z
  .string()
  .trim()
  .max(120)
  .refine((v) => v === "" || z.email().safeParse(v).success, { message: "Please enter a valid email address." });

const name = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `Please enter ${label}.`)
    .max(80, "That looks a little long — please shorten it.");

export const admissionSchema = z.object({
  kind: z.literal("admission"),
  parentName: name("the parent or guardian's name"),
  childName: name("the child's name"),
  grade: z.string().trim().min(1, "Please tell us which class you are enquiring about.").max(40),
  phone,
  email: optionalEmail,
  message: z.string().trim().max(1000, "Please keep your message under 1000 characters."),
  company: z.string().max(200).optional(), // honeypot — filled only by bots
});

export const contactSchema = z.object({
  kind: z.literal("contact"),
  name: name("your name"),
  phone,
  email: optionalEmail,
  message: z.string().trim().min(5, "Please write a short message.").max(1000, "Please keep your message under 1000 characters."),
  company: z.string().max(200).optional(),
});

export const enquirySchema = z.discriminatedUnion("kind", [admissionSchema, contactSchema]);

export type AdmissionInput = z.infer<typeof admissionSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryResponse =
  | { ok: true }
  | { ok: false; reason: "invalid"; fieldErrors: Record<string, string> }
  | { ok: false; reason: "not_configured" | "failed" };

export function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
