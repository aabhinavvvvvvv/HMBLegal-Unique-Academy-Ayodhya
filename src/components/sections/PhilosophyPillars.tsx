import { philosophy } from "@/content/school";
import { icons } from "@/lib/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function PhilosophyPillars({ detailed = false, id }: { detailed?: boolean; id?: string }) {
  return (
    <section id={id} className={cn("section-y", detailed ? "bg-paper" : "bg-stone")} aria-labelledby="philosophy-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="philosophy-title"
            className="lg:col-span-7"
            eyebrow={philosophy.eyebrow}
            title={
              <>
                Modern Minds. Strong Values. <em className="italic text-maroon">Bright Futures.</em>
              </>
            }
          />
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="text-lg leading-relaxed text-graphite">
              <strong className="font-semibold text-ink">{philosophy.lead}</strong>
              {detailed ? null : <> {philosophy.intro}</>}
            </p>
          </Reveal>
        </div>

        {detailed && (
          <Reveal className="mt-10 max-w-3xl">
            <p className="text-lg leading-relaxed text-graphite">{philosophy.body}</p>
            <p className="mt-6 text-lg font-semibold text-ink">{philosophy.intro}</p>
          </Reveal>
        )}

        <Stagger as="ol" className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5" stagger={0.07}>
          {philosophy.pillars.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <StaggerItem
                as="li"
                key={p.title}
                className="group relative overflow-hidden rounded-[1.5rem] border border-line bg-paper p-8 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_-36px_rgba(79,18,18,0.45)] lg:p-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-maroon to-gold transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-full bg-maroon-tint text-maroon transition-colors duration-500 group-hover:bg-maroon group-hover:text-paper">
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-sm text-muted" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 text-[1.75rem] leading-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-graphite">{p.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>

        {!detailed && (
          <Reveal className="mt-12">
            <ButtonLink href="/vision-mission#philosophy" variant="text">
              Explore our philosophy, vision &amp; mission
            </ButtonLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
