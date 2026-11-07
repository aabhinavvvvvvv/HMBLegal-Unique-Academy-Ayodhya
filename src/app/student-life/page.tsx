import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { beyond, featureById } from "@/content/school";
import { icons } from "@/lib/icons";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ActivityGrid, ClosingThought } from "@/components/sections/BeyondClassroom";
import { MeetTheFuture } from "@/components/sections/MeetTheFuture";
import { WelcomeCta } from "@/components/sections/WelcomeCta";
import { Rays } from "@/components/ui/Rays";
import { cn } from "@/lib/cn";
import { heroPhotos, studentLifeMosaic } from "@/content/media";
import { PhotoMosaic } from "@/components/sections/PhotoMosaic";

export const metadata: Metadata = {
  title: "Student Life — Education Beyond the Classroom",
  description:
    "Sports, indoor games, competitions, cultural activities, technology, AI projects, celebrations, collaborative learning and personality development at Unique Academy, Ayodhya.",
  alternates: { canonical: "/student-life" },
};

const pillars = ["co-curricular", "holistic", "indoor-games"].map(featureById);

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        eyebrow={beyond.eyebrow}
        crumbs={[{ label: "Student Life", href: "/student-life" }]}
        title={
          <>
            Education <em className="italic text-maroon">Beyond the Classroom</em>
          </>
        }
        lead={beyond.lead}
        image={heroPhotos.studentLife}
      />

      <section className="section-y bg-paper" aria-labelledby="activities-title">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={12}>
              <p className="eyebrow">Opportunities to grow</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="activities-title" className="mt-5 text-[2.15rem] leading-[1.1] sm:text-5xl">
                Discover themselves <em className="italic text-maroon">beyond academics</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-lg leading-relaxed text-graphite">{beyond.body}</p>
            </Reveal>
          </div>
          <ActivityGrid className="lg:col-span-7" />
        </div>
      </section>

      <section className="bg-paper pb-20 sm:pb-28" aria-label="Moments from student life">
        <div className="container-x">
          <PhotoMosaic
            photos={studentLifeMosaic}
            eyebrow="Cultural activities & celebrations"
            title={
              <>
                Moments from <em className="italic text-maroon">student life</em>
              </>
            }
          />
        </div>
      </section>

      <section className="section-y bg-stone" aria-label="Co-curricular learning, holistic development and indoor games">
        <div className="container-x">
          <Stagger as="ul" className="grid gap-5 lg:grid-cols-3" stagger={0.1}>
            {pillars.map((f, i) => {
              const Icon = icons[f.icon];
              const dark = i === 1;
              return (
                <StaggerItem
                  as="li"
                  key={f.id}
                  className={cn(
                    "relative flex scroll-mt-40 flex-col overflow-hidden rounded-[1.75rem] p-8 sm:p-10",
                    dark ? "bg-maroon-deep text-paper" : "bg-paper",
                  )}
                >
                  <span id={f.id} className="absolute -top-40" aria-hidden="true" />
                  {dark && <Rays className="absolute -right-40 -bottom-40 size-[30rem] text-gold/15" count={56} />}
                  <span
                    className={cn(
                      "relative grid size-14 place-items-center rounded-full",
                      dark ? "bg-paper/10 text-gold-soft" : "bg-maroon-tint text-maroon",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                  </span>
                  <h2 className="relative mt-10 text-3xl leading-tight sm:text-[2.2rem]">{f.title}</h2>
                  <p className={cn("relative mt-4 text-lg leading-relaxed", dark ? "text-paper/75" : "text-graphite")}>
                    {f.text}
                  </p>
                  <Link
                    href={`/campus#${f.id}`}
                    className={cn(
                      "group relative mt-auto inline-flex items-center gap-2 pt-10 text-sm font-semibold",
                      dark ? "text-gold-soft" : "text-maroon",
                    )}
                  >
                    See it among our seven strengths
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>

          <ClosingThought className="mt-24 lg:mt-32" />
        </div>
      </section>

      <MeetTheFuture id="future" />
      <WelcomeCta />
    </>
  );
}
