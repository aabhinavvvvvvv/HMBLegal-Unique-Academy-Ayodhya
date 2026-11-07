import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { welcome, whyUnique } from "@/content/school";
import { mapsDirectionsUrl, site } from "@/content/site";
import { icons } from "@/lib/icons";
import { heroPhotos } from "@/content/media";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PromiseSection } from "@/components/sections/PromiseSection";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Admissions — Welcome to the Unique Journey",
  description:
    "Begin your child's Unique journey. Send an admission enquiry to Unique Academy, Ayodhya — Behind Badi Bua, Beniganj, Ayodhya.",
  alternates: { canonical: "/admissions" },
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        crumbs={[{ label: "Admissions", href: "/admissions" }]}
        title={
          <>
            Welcome to the <em className="italic text-maroon">Unique Journey</em>
          </>
        }
        lead={welcome.lines.join(" ")}
        image={heroPhotos.admissions}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#enquiry">Make an enquiry</ButtonLink>
          <ButtonLink href={mapsDirectionsUrl} variant="secondary">
            Visit the school
          </ButtonLink>
        </div>
      </PageHero>

      <PromiseSection id="promise" tone="paper" />

      {/* What your child will find */}
      <section className="section-y bg-stone" aria-labelledby="find-title">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Reveal y={12}>
                <p className="eyebrow">{whyUnique.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id="find-title" className="mt-5 text-[2.15rem] leading-[1.1] sm:text-5xl">
                  What your child will <em className="italic text-maroon">find here</em>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <ButtonLink href="/campus" variant="text">
                See all in detail
              </ButtonLink>
            </Reveal>
          </div>

          <Stagger as="ul" className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
            {whyUnique.features.map((f) => {
              const Icon = icons[f.icon];
              return (
                <StaggerItem as="li" key={f.id} className="bg-paper">
                  <Link
                    href={`/campus#${f.id}`}
                    className="group flex h-full items-center gap-4 p-6 transition-colors duration-300 hover:bg-maroon-tint"
                  >
                    <Icon aria-hidden="true" className="size-6 shrink-0 text-maroon" strokeWidth={1.5} />
                    <span className="flex-1 font-semibold text-ink">{f.title}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-maroon opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </Link>
                </StaggerItem>
              );
            })}
            <li className="hidden bg-maroon-deep sm:block" aria-hidden="true" />
          </Stagger>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="section-y scroll-mt-24 bg-paper" aria-labelledby="enquiry-title">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal y={12}>
              <p className="eyebrow">Admission Enquiry</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="enquiry-title" className="mt-5 text-[2.15rem] leading-[1.1] sm:text-5xl">
                The future begins <em className="italic text-maroon">with your child.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-graphite">
                Share a few details and the school will get in touch with you. You are also welcome to visit us.
              </p>
              <div className="mt-8 rounded-2xl border border-line bg-stone p-6">
                <p className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-maroon" />
                  <span>
                    <span className="block font-semibold text-ink">{site.fullName}</span>
                    <span className="text-graphite">{site.address.display}</span>
                  </span>
                </p>
                {site.phone && (
                  <p className="mt-3 flex items-center gap-3">
                    <Phone aria-hidden="true" className="size-5 shrink-0 text-maroon" />
                    <a href={site.phone.href} className="link-underline font-semibold text-ink">
                      {site.phone.display}
                    </a>
                  </p>
                )}
                {site.email && (
                  <p className="mt-3 flex items-center gap-3">
                    <Mail aria-hidden="true" className="size-5 shrink-0 text-maroon" />
                    <a href={site.email.href} className="link-underline break-all text-graphite">
                      {site.email.display}
                    </a>
                  </p>
                )}
                <ButtonLink href={mapsDirectionsUrl} variant="text" className="mt-4">
                  Get directions
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <div className="rounded-[2rem] border border-line bg-paper p-6 shadow-[0_40px_80px_-60px_rgba(26,26,26,0.5)] sm:p-10">
              <EnquiryForm kind="admission" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
