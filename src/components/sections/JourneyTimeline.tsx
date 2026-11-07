import { journey } from "@/content/school";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ScrollLine } from "@/components/motion/Parallax";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function JourneyTimeline({ id, tone = "stone" }: { id?: string; tone?: "stone" | "paper" }) {
  return (
    <section id={id} className={cn("section-y", tone === "stone" ? "bg-stone" : "bg-paper")} aria-labelledby="journey-title">
      <div className="container-x">
        <SectionHeading
          id="journey-title"
          eyebrow={journey.eyebrow}
          title={
            <>
              The legacy began in 1998. <em className="italic text-maroon">The journey continues in Ayodhya.</em>
            </>
          }
        />

        <div className="relative mt-16 lg:mt-24">
          {/* Track */}
          <div className="absolute top-[0.6rem] left-0 hidden h-px w-full bg-line lg:block" aria-hidden="true" />
          <ScrollLine className="absolute top-[0.6rem] left-0 hidden h-px w-full lg:block" />
          <div className="absolute top-0 bottom-0 left-[0.6rem] w-px bg-line lg:hidden" aria-hidden="true" />
          <ScrollLine axis="y" className="absolute top-0 bottom-0 left-[0.6rem] w-px lg:hidden" />

          <Stagger as="ol" className="relative grid gap-12 lg:grid-cols-4 lg:gap-8" stagger={0.15} amount={0.3}>
            {journey.milestones.map((m, i) => {
              const now = m.marker === "Today";
              return (
                <StaggerItem as="li" key={m.marker} className="relative pl-12 lg:pl-0 lg:pt-14">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-1 grid size-[1.2rem] place-items-center rounded-full border lg:top-0",
                      now ? "border-maroon bg-maroon" : "border-maroon/40 bg-paper",
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full", now ? "bg-paper" : "bg-maroon")} />
                    {now && <span className="absolute inset-[-6px] motion-safe:animate-ping rounded-full border border-maroon/40" />}
                  </span>
                  <p className={cn("font-display text-[2.6rem] leading-none", i === 0 || now ? "text-maroon" : "text-ink")}>
                    {m.marker}
                  </p>
                  <p className="mt-5 max-w-xs leading-relaxed text-graphite">{m.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <p className="max-w-2xl font-display text-2xl italic text-ink/80 sm:text-3xl">
            The future begins with your child.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
