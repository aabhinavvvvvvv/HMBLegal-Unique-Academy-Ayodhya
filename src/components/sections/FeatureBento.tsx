import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whyUnique } from "@/content/school";
import { icons } from "@/lib/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Rays } from "@/components/ui/Rays";
import { cn } from "@/lib/cn";

const layout: Record<string, string> = {
  "ai-lab": "md:col-span-2 lg:row-span-2",
  "co-curricular": "lg:col-span-2",
  holistic: "lg:col-span-2",
};

/** Home overview of the seven reasons to choose the school, with the AI Lab featured. */
export function FeatureBento() {
  return (
    <section className="section-y bg-paper" aria-labelledby="why-title">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="why-title"
            eyebrow={whyUnique.eyebrow}
            title={
              <>
                A School Designed <em className="italic text-maroon">for the Future</em>
              </>
            }
          />
          <Reveal delay={0.1}>
            <ButtonLink href="/campus" variant="secondary">
              Explore what sets us apart
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-14 grid auto-rows-[minmax(15.5rem,auto)] gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4" stagger={0.06}>
          {whyUnique.features.map((f) => {
            const Icon = icons[f.icon];
            const featured = f.id === "ai-lab";
            return (
              <StaggerItem as="li" key={f.id} className={cn("flex", layout[f.id])}>
                <Link
                  href={`/campus#${f.id}`}
                  className={cn(
                    "group relative flex w-full flex-col overflow-hidden rounded-[1.5rem] p-7 transition-[transform,box-shadow,background-color] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 lg:p-8",
                    featured
                      ? "bg-maroon-deep text-paper hover:shadow-[0_40px_70px_-40px_rgba(79,18,18,0.9)]"
                      : "bg-stone text-ink hover:bg-sand hover:shadow-[0_30px_50px_-40px_rgba(26,26,26,0.5)]",
                  )}
                >
                  {featured && (
                    <Rays
                      className="absolute -right-40 -bottom-40 size-[34rem] text-gold/20 transition-transform duration-[2s] ease-[var(--ease-soft)] group-hover:rotate-12"
                      count={60}
                    />
                  )}
                  <span
                    className={cn(
                      "relative grid place-items-center rounded-full transition-transform duration-500 group-hover:scale-110",
                      featured ? "size-16 bg-paper/10 text-gold-soft" : "size-12 bg-paper text-maroon",
                    )}
                  >
                    <Icon aria-hidden="true" className={featured ? "size-8" : "size-5"} strokeWidth={1.5} />
                  </span>
                  {featured && (
                    <ul className="relative mt-8 hidden flex-wrap gap-2 sm:flex" aria-label="Explore in the AI Lab">
                      {["Artificial Intelligence", "Technology", "Innovation", "Future-ready concepts"].map((t) => (
                        <li key={t} className="rounded-full border border-paper/20 px-3.5 py-1.5 text-[0.8rem] text-paper/80">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="relative mt-auto pt-10">
                    {featured && (
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-gold">Future-ready learning</p>
                    )}
                    <h3 className={cn("leading-tight", featured ? "mt-3 text-4xl sm:text-5xl" : "text-[1.45rem]")}>
                      {f.title}
                    </h3>
                    <p className={cn("mt-3 leading-relaxed", featured ? "max-w-md text-lg text-paper/75" : "text-[0.95rem] text-graphite")}>
                      {f.text}
                    </p>
                    <span
                      className={cn(
                        "mt-6 inline-flex items-center gap-2 text-sm font-semibold",
                        featured ? "text-gold-soft" : "text-maroon",
                      )}
                    >
                      Learn more
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="sr-only">about {f.title}</span>
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
