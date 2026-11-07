import type { EnquiryInput } from "@/lib/enquiry";
import { site } from "@/content/site";

/**
 * Form delivery through Web3Forms (https://web3forms.com).
 *
 * The access key is a public key, designed to be used in the browser, so it is safe to ship in
 * client code. Recipient address, spam filtering and auto-replies are set in the Web3Forms dashboard.
 * Web3Forms expects submissions from the visitor's browser, so the forms post to it directly.
 *
 * Override with NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY. Setting it to an empty string switches
 * Web3Forms off, and the forms fall back to /api/enquiry (Resend, or the "not connected" notice).
 */
export const web3formsAccessKey =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "27fdc9b9-9adf-4faf-8e46-d81d8e4d6c5e";

const endpoint = "https://api.web3forms.com/submit";

/** Builds the Web3Forms payload. Keys other than the special ones become labelled rows in the email. */
function payloadFor(d: EnquiryInput) {
  const common = {
    access_key: web3formsAccessKey,
    from_name: `${site.fullName} website`,
    ...(d.email ? { replyto: d.email } : {}),
  };

  if (d.kind === "admission") {
    return {
      ...common,
      subject: `Admission enquiry — ${d.childName} (${d.grade})`,
      "Enquiry type": "Admission enquiry",
      "Parent / guardian": d.parentName,
      Child: d.childName,
      "Class sought": d.grade,
      Phone: d.phone,
      Email: d.email || "—",
      Message: d.message || "—",
    };
  }

  return {
    ...common,
    subject: `Website message — ${d.name}`,
    "Enquiry type": "Contact message",
    Name: d.name,
    Phone: d.phone,
    Email: d.email || "—",
    Message: d.message,
  };
}

/**
 * Sends an enquiry; resolves true only when Web3Forms confirms delivery.
 * Posted as FormData (a "simple" cross-origin request) so the browser skips the CORS
 * preflight, which Web3Forms' firewall rejects.
 */
export async function sendViaWeb3Forms(d: EnquiryInput): Promise<boolean> {
  const form = new FormData();
  for (const [key, value] of Object.entries(payloadFor(d))) form.append(key, value);
  const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: form });
  const body = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
  if (!res.ok || !body?.success) {
    console.error("Web3Forms rejected the submission", res.status, body?.message);
    return false;
  }
  return true;
}
