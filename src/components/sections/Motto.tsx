import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Rays } from "@/components/ui/Rays";
import { cn } from "@/lib/cn";

/** The Sanskrit motto from the school emblem. */
export function Motto({ compact = false, className }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <figure className={className}>
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-muted">Our motto</p>
        <blockquote lang="sa" className="mt-4 font-deva text-[2.1rem] leading-tight text-maroon lg:text-[2.4rem]">
          {site.motto.devanagari}
        </blockquote>
        <figcaption className="mt-4 leading-relaxed text-graphite">
          <span className="italic">{site.motto.transliteration}</span> — {site.motto.meaning}
        </figcaption>
      </figure>
    );
  }

  return (
    <section className={cn("relative overflow-hidden bg-maroon-deep py-24 text-center text-paper sm:py-32", className)}>
      <Rays className="absolute left-1/2 top-1/2 size-[60rem] -translate-x-1/2 -translate-y-1/2 text-gold/[0.12]" count={96} spin />
      <div className="container-x relative">
        <Reveal y={12}>
          <p className="eyebrow eyebrow-light justify-center">The motto on our emblem</p>
        </Reveal>
        <Reveal delay={0.08}>
          <p lang="sa" className="mt-8 font-deva text-5xl leading-tight text-gold-soft sm:text-7xl">
            {site.motto.devanagari}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 font-display text-xl italic text-paper/80 sm:text-2xl">{site.motto.transliteration}</p>
          <p className="mx-auto mt-3 max-w-xl text-lg text-paper/70">{site.motto.meaning}</p>
        </Reveal>
      </div>
    </section>
  );
}
