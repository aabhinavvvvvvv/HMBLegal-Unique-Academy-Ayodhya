/**
 * Core school identity and contact details.
 * Single source of truth — every page, the footer, SEO metadata and
 * structured data read from here. Fields set to `null` are not yet
 * provided by the school and are automatically hidden across the site.
 */

export type ContactChannel = { label: string; display: string; href: string };

export const site = {
  name: "Unique Academy",
  branch: "Ayodhya Branch",
  fullName: "Unique Academy, Ayodhya",
  group: "Unique Group of Schools",
  groupFounded: 1998,
  branchNumber: 7,

  tagline: "Come Unique, Be Unique.",
  promise: "Nurturing Young Minds. Building Bright Futures.",
  theme: "Where Legacy Meets Tomorrow.",
  closingLine: "Modern Learning. Timeless Values. Future-Ready Minds.",

  /** Sanskrit motto as it appears on the school emblem. */
  motto: {
    devanagari: "सा विद्या या विमुक्तये",
    transliteration: "Sā vidyā yā vimuktaye",
    meaning: "That alone is knowledge which liberates.",
  },

  description:
    "Unique Academy, Ayodhya — the seventh branch of the Unique Group of Schools, carrying forward an educational journey that began in 1998. Modern learning, timeless values and future-ready minds.",

  address: {
    line1: "Behind Badi Bua",
    line2: "Beniganj",
    city: "Ayodhya",
    region: "Uttar Pradesh",
    country: "IN",
    /** Display form, exactly as given by the school. */
    display: "Behind Badi Bua, Beniganj, Ayodhya",
  },

  /**
   * Google Maps search used for the map embed and the "Get directions" link.
   * Replace with the school's exact Google Maps place link once available.
   */
  mapQuery: "Beniganj, Ayodhya, Uttar Pradesh",

  phone: { label: "Phone", display: "+91 70428 21489", href: "tel:+917042821489" } as ContactChannel | null,
  email: { label: "Email", display: "info@hmblegal.com", href: "mailto:info@hmblegal.com" } as ContactChannel | null,

  /** Not yet provided — add when available and they will appear site-wide. */
  whatsapp: null as ContactChannel | null,
  hours: null as string | null,
  social: [] as { label: string; href: string }[],
} as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.display}, ${site.address.region}`,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`;
