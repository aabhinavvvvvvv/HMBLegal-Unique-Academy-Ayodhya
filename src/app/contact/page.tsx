import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { mapsDirectionsUrl, site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MapCard } from "@/components/sections/MapCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description: `Visit or write to ${site.fullName} — ${site.address.display}.`,
  alternates: { canonical: "/contact" },
};

type Card = { icon: LucideIcon; title: string; body: string; href?: string; external?: boolean };

export default function ContactPage() {
  const cards: Card[] = [
    { icon: MapPin, title: "Visit us", body: site.address.display, href: mapsDirectionsUrl, external: true },
    ...(site.phone ? [{ icon: Phone, title: "Call", body: site.phone.display, href: site.phone.href }] : []),
    ...(site.email ? [{ icon: Mail, title: "Email", body: site.email.display, href: site.email.href }] : []),
    ...(site.hours ? [{ icon: Clock, title: "School hours", body: site.hours }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        crumbs={[{ label: "Contact", href: "/contact" }]}
        title={
          <>
            Come Unique, <em className="italic text-maroon">Be Unique.</em>
          </>
        }
        lead={`We would be glad to welcome you at ${site.fullName}. Find us in Beniganj, or send us a message below.`}
      />

      <section className="section-y bg-paper" aria-label="How to reach us">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Stagger as="ul" className="space-y-4" stagger={0.08}>
              {cards.map((c) => {
                const inner = (
                  <>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-maroon-tint text-maroon transition-colors duration-300 group-hover:bg-maroon group-hover:text-paper">
                      <c.icon aria-hidden="true" className="size-5" />
                    </span>
                    <span>
                      <span className="block text-[0.7rem] font-bold uppercase tracking-[0.22em] text-muted">{c.title}</span>
                      <span className="mt-1 block text-lg text-ink">{c.body}</span>
                    </span>
                  </>
                );
                return (
                  <StaggerItem as="li" key={c.title}>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-5 rounded-2xl border border-line p-5 transition-colors duration-300 hover:border-maroon/30 hover:bg-stone"
                      >
                        {inner}
                        {c.external && <span className="sr-only">(opens Google Maps in a new tab)</span>}
                      </a>
                    ) : (
                      <div className="flex items-center gap-5 rounded-2xl border border-line p-5">{inner}</div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>

            <MapCard className="mt-8" />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal y={12}>
              <p className="eyebrow">Send a message</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[2.15rem] leading-[1.1] sm:text-5xl">We&apos;d love to hear from you</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-graphite">
                For admissions, please use the{" "}
                <Link href="/admissions#enquiry" className="font-semibold text-maroon underline underline-offset-4">
                  admission enquiry form
                </Link>{" "}
                so we have the details we need.
              </p>
            </Reveal>
            <Reveal delay={0.14} className="mt-10 rounded-[2rem] border border-line p-6 sm:p-10">
              <EnquiryForm kind="contact" />
            </Reveal>
            <Reveal delay={0.18} className="mt-8">
              <ButtonLink href="/admissions" variant="text">
                Explore admissions
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
