import { difference } from "@/content/school";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ScrollLine } from "@/components/motion/Parallax";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Rays, Star } from "@/components/ui/Rays";

export function UniqueDifference({ id }: { id?: string }) {
  return (
    <section id={id} className="relative overflow-hidden bg-night py-24 text-paper sm:py-32 lg:py-40" aria-labelledby="difference-title">
      <Rays className="absolute -left-80 top-24 size-[56rem] text-gold/[0.07]" count={80} />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="difference-title"
            tone="light"
            className="lg:col-span-7"
            eyebrow={difference.eyebrow}
            title={
              <>
                Rooted in Values. <em className="italic text-gold-soft">Ready for the Future.</em>
              </>
            }
          />
          <div className="space-y-5 text-lg leading-relaxed text-paper/70 lg:col-span-5 lg:pt-14">
            {difference.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Two worlds */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] bg-paper/10 md:grid-cols-2 lg:mt-20">
          <WorldColumn title="Reshaping the future" items={difference.changing} />
          <WorldColumn title="Remaining essential" items={difference.enduring} accent />
        </div>

        <Reveal className="mt-20 text-center lg:mt-28">
          <p className="font-display text-3xl italic text-gold-soft sm:text-4xl lg:text-5xl">{difference.bothWorlds}</p>
        </Reveal>

        <ul className="mx-auto mt-14 max-w-5xl space-y-8 lg:mt-16 lg:space-y-6">
          {difference.meetings.map((m) => (
            <li key={m.from} className="grid items-center gap-3 text-center md:grid-cols-[1fr_minmax(8rem,14rem)_1fr] md:gap-8">
              <Reveal y={16} className="font-display text-2xl text-paper sm:text-3xl md:text-right lg:text-4xl">
                {m.from}
              </Reveal>
              <div className="relative flex items-center justify-center">
                <ScrollLine className="hidden h-px w-full bg-paper/15 md:block" />
                <span className="bg-night px-3 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-gold md:absolute">
                  meets
                </span>
              </div>
              <Reveal y={16} delay={0.12} className="font-display text-2xl italic text-gold-soft sm:text-3xl md:text-left lg:text-4xl">
                {m.to}
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mx-auto mt-16 max-w-3xl text-center lg:mt-20">
          <p className="text-lg leading-relaxed text-paper/70">{difference.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

function WorldColumn({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className="bg-night/95 p-8 sm:p-10 lg:p-12">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-gold">{title}</p>
      <Stagger as="ul" className="mt-6 flex flex-wrap gap-2.5" stagger={0.06}>
        {items.map((it) => (
          <StaggerItem
            as="li"
            key={it}
            className={
              accent
                ? "inline-flex items-center gap-2 rounded-full bg-gold-soft px-4 py-2 text-[0.95rem] font-semibold text-maroon-deep"
                : "inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-[0.95rem] text-paper/85"
            }
          >
            {accent && <Star className="size-2.5 text-maroon" />}
            {it}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
