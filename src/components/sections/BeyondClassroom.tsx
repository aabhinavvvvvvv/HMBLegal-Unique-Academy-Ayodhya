import { beyond } from "@/content/school";
import { icons } from "@/lib/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { homeMosaic } from "@/content/media";
import { PhotoMosaic } from "./PhotoMosaic";

/** Home-page summary of student life. */
export function BeyondClassroom() {
  return (
    <section className="section-y bg-stone" aria-labelledby="beyond-title">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="beyond-title"
              eyebrow={beyond.eyebrow}
              title={
                <>
                  Education <em className="italic text-maroon">Beyond the Classroom</em>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-7 text-xl leading-relaxed text-ink">{beyond.lead}</p>
              <p className="mt-5 text-lg leading-relaxed text-graphite">{beyond.body}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <ButtonLink href="/student-life" variant="text" className="mt-8">
                Discover student life
              </ButtonLink>
            </Reveal>
          </div>

          <ActivityGrid className="lg:col-span-7" />
        </div>

        <PhotoMosaic
          className="mt-24 lg:mt-32"
          photos={homeMosaic}
          eyebrow="Life at Unique Academy"
          title={
            <>
              Moments from <em className="italic text-maroon">school life</em>
            </>
          }
        />

        <ClosingThought className="mt-24 lg:mt-32" />
      </div>
    </section>
  );
}

export function ActivityGrid({ className }: { className?: string }) {
  return (
    <Stagger as="ul" className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4", className)} stagger={0.05}>
      {beyond.activities.map((a, i) => {
        const Icon = icons[a.icon];
        const highlight = a.label === "AI Projects";
        return (
          <StaggerItem
            as="li"
            key={a.label}
            className={cn(
              "group flex aspect-[5/4] flex-col justify-between rounded-[1.25rem] border p-5 transition-[translate,background-color,border-color] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 sm:p-6",
              highlight ? "border-maroon bg-maroon text-paper" : "border-line bg-paper hover:border-maroon/30",
              i % 3 === 1 && "sm:translate-y-6 sm:hover:translate-y-5",
            )}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.4}
              className={cn(
                "size-7 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
                highlight ? "text-gold-soft" : "text-maroon",
              )}
            />
            <span className={cn("font-display text-lg leading-tight sm:text-xl", highlight ? "text-paper" : "text-ink")}>
              {a.label}
            </span>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export function ClosingThought({ className }: { className?: string }) {
  return (
    <Reveal className={cn("mx-auto max-w-4xl text-center", className)}>
      <p className="font-display text-3xl leading-[1.25] text-ink sm:text-4xl lg:text-5xl">
        {beyond.closing[0]} <em className="italic text-maroon">{beyond.closing[1]}</em>
      </p>
    </Reveal>
  );
}
