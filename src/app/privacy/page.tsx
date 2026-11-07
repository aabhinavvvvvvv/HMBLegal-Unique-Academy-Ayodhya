import type { Metadata } from "next";
import { mapsDirectionsUrl, site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.fullName} uses the information you share through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" crumbs={[{ label: "Privacy", href: "/privacy" }]} title="Your information, handled with care" />
      <section className="section-y bg-paper">
        <div className="container-x max-w-3xl space-y-10 text-lg leading-relaxed text-graphite">
          <Block title="What we collect">
            When you send an admission enquiry or a message through this website, we receive the details you enter — such
            as your name, your child&apos;s name and class, your phone number, your email address (if given) and your
            message.
          </Block>
          <Block title="How we use it">
            We use these details only to respond to your enquiry. We do not sell or share them with third parties for
            marketing. Messages are delivered to the school by email through Web3Forms, a form-to-email service.
          </Block>
          <Block title="Cookies and tracking">
            This website does not use advertising or analytics cookies. The map on the contact page is provided by Google
            Maps, which may set its own cookies when it loads.
          </Block>
          <Block title="Your choices">
            To ask about, correct or remove information you have shared with us, please contact the school
            {site.email && (
              <>
                {" "}by email at{" "}
                <a href={site.email.href} className="text-maroon underline underline-offset-4">
                  {site.email.display}
                </a>{" "}
                or in person
              </>
            )}{" "}
            at{" "}
            <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="text-maroon underline underline-offset-4">
              {site.address.display}
            </a>
            .
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-3xl text-ink">{title}</h2>
      <p className="mt-4">{children}</p>
    </div>
  );
}
