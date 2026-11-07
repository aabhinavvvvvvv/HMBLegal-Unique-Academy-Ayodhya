import { mission, vision } from "@/content/school";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Rays } from "@/components/ui/Rays";

/** Vision statement card + mission commitments. `full` shows the extended vision and larger list. */
export function VisionMission({ full = false }: { full?: boolean }) {
  return (
    <section className="section-y bg-paper" aria-label="Vision and mission">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div id={full ? "vision" : undefined} className="lg:col-span-5">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-maroon-deep p-9 text-paper sm:p-12 lg:sticky lg:top-32">
            <Rays className="absolute -right-32 -top-32 size-[26rem] text-gold/15" count={56} spin />
            <p className="eyebrow eyebrow-light relative">{vision.eyebrow}</p>
            <h2 className="relative mt-8 text-[1.9rem] leading-[1.2] sm:text-[2.35rem]">
              “{vision.statement}”
            </h2>
            {full && <p className="relative mt-8 text-lg leading-relaxed text-paper/75">{vision.extended}</p>}
          </Reveal>
        </div>

        <div id={full ? "mission" : undefined} className="lg:col-span-7">
          <Reveal y={12}>
            <p className="eyebrow">{mission.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl lg:text-[2.6rem]">{mission.lead}</h2>
          </Reveal>

          <Stagger as="ol" className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-10" stagger={0.05}>
            {mission.points.map((p, i) => (
              <StaggerItem
                as="li"
                key={p}
                className="group flex items-baseline gap-5 border-b border-line py-5 transition-colors"
              >
                <span className="w-7 shrink-0 font-display text-sm text-gold" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-ink transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1.5">
                  {p}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          {!full && (
            <Reveal className="mt-10">
              <ButtonLink href="/vision-mission" variant="text">
                Read our vision &amp; mission
              </ButtonLink>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
