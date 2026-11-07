import { philosophy } from "@/content/school";
import { Star } from "@/components/ui/Rays";

/** Slow, continuous band of the six pillars. Decorative — the pillars are presented in full elsewhere. */
export function ValuesMarquee() {
  const words = philosophy.pillars.map((p) => p.title);
  const run = [...words, ...words];
  return (
    <div className="overflow-hidden bg-maroon-deep py-7 text-gold-soft" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {run.map((w, i) => (
              <li key={`${copy}-${i}`} className="flex items-center">
                <span className="px-8 font-display text-3xl italic sm:text-4xl">{w}</span>
                <Star className="size-3 text-gold" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
