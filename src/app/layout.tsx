import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, Tiro_Devanagari_Hindi } from "next/font/google";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.fullName} — ${site.tagline}`,
    template: `%s | ${site.fullName}`,
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: [
    "Unique Academy Ayodhya",
    "Unique Academy",
    "Unique Group of Schools",
    "school in Ayodhya",
    "Beniganj Ayodhya school",
    "AI Lab school Ayodhya",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.fullName,
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/brand/og-default.jpg", width: 1200, height: 630, alt: `${site.fullName} emblem` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
    images: ["/brand/og-default.jpg"],
  },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#4f1212",
  width: "device-width",
  initialScale: 1,
};

const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: site.fullName,
  alternateName: `${site.name} — ${site.branch}`,
  slogan: site.tagline,
  description: site.description,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-emblem-480.webp`,
  image: `${siteUrl}/brand/og-default.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  parentOrganization: { "@type": "EducationalOrganization", name: site.group, foundingDate: String(site.groupFounded) },
  ...(site.phone ? { telephone: site.phone.display } : {}),
  ...(site.email ? { email: site.email.display } : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${manrope.variable} ${tiro.variable}`}>
      <body className="min-h-dvh">
        <noscript>
          {/* Without JavaScript, show content that would otherwise be revealed by scroll animations. */}
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }} />
      </body>
    </html>
  );
}
