import { about } from "@/content/school";
import { site } from "@/content/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/motion/Parallax";
import { Visual } from "@/components/ui/Visual";
import { introPhotos } from "@/content/media";
import { Users } from "lucide-react";
import { Motto } from "./Motto";

export function AboutIntro() {
  return (
    <section className="section-y bg-paper" aria-labelledby="about-intro-title">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={12}>
              <p className="eyebrow">{about.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="about-intro-title" className="mt-5 text-[2.15rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
                A Legacy of Education. <em className="italic text-maroon">A Vision for Tomorrow.</em>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
            <Reveal>
              <p className="text-xl leading-relaxed text-ink sm:text-[1.4rem] sm:leading-[1.6]">{about.paragraphs[0]}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-lg leading-relaxed text-graphite">{about.paragraphs[1]}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-graphite">{about.moreThanASchool}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <ButtonLink href="/about" variant="text" className="mt-8">
                Read our story
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        {/* Photo composition */}
        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-12 md:items-start md:gap-4 lg:mt-24">
          <Parallax offset={18} className="col-span-2 md:col-span-6">
            <Visual photo={introPhotos[0]} icon={Users} label="" className="aspect-[3/2]" sizes="(min-width: 768px) 50vw, 100vw" />
          </Parallax>
          <Parallax offset={46} className="md:col-span-3 md:mt-20">
            <Visual photo={introPhotos[1]} icon={Users} label="" className="aspect-[3/4]" sizes="(min-width: 768px) 25vw, 50vw" />
          </Parallax>
          <Parallax offset={30} className="md:col-span-3 md:mt-6">
            <Visual photo={introPhotos[2]} icon={Users} label="" className="aspect-[3/4]" sizes="(min-width: 768px) 25vw, 50vw" />
          </Parallax>
        </div>

        <Stagger className="mt-20 grid border-t border-line md:grid-cols-3" stagger={0.12}>
          <StaggerItem className="border-b border-line py-10 md:border-r md:border-b-0 md:pr-10">
            <p className="font-display text-7xl leading-none text-maroon lg:text-8xl">
              <Counter from={1960} to={site.groupFounded} />
            </p>
            <p className="mt-5 max-w-xs leading-relaxed text-graphite">
              The year the journey of the {site.group} began.
            </p>
          </StaggerItem>
          <StaggerItem className="border-b border-line py-10 md:border-r md:border-b-0 md:px-10">
            <p className="font-display text-7xl leading-none text-maroon lg:text-8xl">
              <Counter from={0} to={site.branchNumber} suffix="th" duration={1.4} />
            </p>
            <p className="mt-5 max-w-xs leading-relaxed text-graphite">
              Branch of the {site.group} — bringing the legacy to Ayodhya.
            </p>
          </StaggerItem>
          <StaggerItem className="py-10 md:pl-10">
            <Motto compact />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
