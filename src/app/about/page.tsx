import type { Metadata } from "next";
import { about } from "@/content/school";
import { site } from "@/content/site";
import { heroPhotos } from "@/content/media";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { UniqueDifference } from "@/components/sections/UniqueDifference";
import { Motto } from "@/components/sections/Motto";
import { WelcomeCta } from "@/components/sections/WelcomeCta";
import { ButtonLink } from "@/components/ui/Button";
import { Star } from "@/components/ui/Rays";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Unique Academy, Ayodhya is the seventh branch of the Unique Group of Schools, carrying forward an educational journey that began in 1998 — a blend of modern education and timeless values.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        crumbs={[{ label: "Our Story", href: "/about" }]}
        title={
          <>
            A Legacy of Education. <em className="italic text-maroon">A Vision for Tomorrow.</em>
          </>
        }
        lead={about.paragraphs[0]}
        image={heroPhotos.about}
      />

      {/* Story */}
      <section className="section-y bg-paper" aria-label="About Unique Academy">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Stagger className="grid grid-cols-2 gap-6 border-t border-line pt-8 lg:grid-cols-1 lg:gap-10" stagger={0.15}>
              <StaggerItem>
                <p className="font-display text-6xl leading-none text-maroon sm:text-7xl">
                  <Counter from={1960} to={site.groupFounded} />
                </p>
                <p className="mt-3 text-graphite">The Unique Group&apos;s journey begins</p>
              </StaggerItem>
              <StaggerItem>
                <p className="font-display text-6xl leading-none text-maroon sm:text-7xl">
                  <Counter to={site.branchNumber} suffix="th" duration={1.4} />
                </p>
                <p className="mt-3 text-graphite">Branch of the {site.group}</p>
              </StaggerItem>
            </Stagger>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="text-xl leading-relaxed text-ink sm:text-2xl sm:leading-[1.55]">{about.paragraphs[1]}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-10 font-display text-3xl leading-snug text-ink sm:text-4xl">
                Unique Academy is more than a school.{" "}
                <em className="italic text-maroon">It is a blend of modern education and timeless values.</em>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-graphite">{about.belief}</p>
            </Reveal>
          </div>
        </div>

        {/* The blend */}
        <div className="container-x mt-20 lg:mt-28">
          <div className="grid overflow-hidden rounded-[2rem] border border-line md:grid-cols-2">
            <BlendColumn title="Modern education" items={about.blend.modern} />
            <BlendColumn title="Timeless values" items={about.blend.timeless} dark />
          </div>
        </div>

        {/* Goal */}
        <div className="container-x mt-20 text-center lg:mt-28">
          <Reveal y={12}>
            <p className="eyebrow justify-center">{about.goalLead}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-4xl font-display text-[2.2rem] leading-[1.15] text-ink sm:text-5xl lg:text-6xl">
              To prepare students not only for examinations, <em className="italic text-maroon">but for life.</em>
            </p>
          </Reveal>
        </div>
      </section>

      <JourneyTimeline id="journey" />
      <UniqueDifference id="difference" />
      <Motto />

      <section className="bg-paper py-20 sm:py-24" aria-label="Continue exploring">
        <div className="container-x flex flex-col items-start justify-between gap-8 border-y border-line py-12 md:flex-row md:items-center">
          <p className="max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
            Discover the vision, mission and philosophy that guide everything we do.
          </p>
          <ButtonLink href="/vision-mission">Vision &amp; Mission</ButtonLink>
        </div>
      </section>

      <WelcomeCta />
    </>
  );
}

function BlendColumn({ title, items, dark }: { title: string; items: string[]; dark?: boolean }) {
  return (
    <div className={dark ? "bg-maroon-deep p-8 text-paper sm:p-12" : "bg-stone p-8 sm:p-12"}>
      <p className={`text-[0.7rem] font-bold uppercase tracking-[0.26em] ${dark ? "text-gold" : "text-maroon"}`}>{title}</p>
      <Stagger as="ul" className="mt-8 space-y-4" stagger={0.07}>
        {items.map((it) => (
          <StaggerItem as="li" key={it} className="flex items-center gap-4 font-display text-2xl sm:text-3xl">
            <Star className={`size-3 shrink-0 ${dark ? "text-gold" : "text-maroon"}`} />
            {it}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
