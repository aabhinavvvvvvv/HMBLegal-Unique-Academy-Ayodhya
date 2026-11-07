import { future } from "@/content/school";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function MeetTheFuture({ id }: { id?: string }) {
  return (
    <section id={id} className="section-y relative overflow-hidden bg-paper" aria-labelledby="future-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5 xl:col-span-4">
          <Reveal y={12}>
            <p className="eyebrow">{future.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="future-title" className="mt-5 text-[2.15rem] leading-[1.08] sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
              Today&apos;s Learners. <em className="italic text-maroon">Tomorrow&apos;s Leaders.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg leading-relaxed text-graphite">{future.lead}</p>
          </Reveal>
        </div>

        <Stagger as="ul" className="lg:col-span-7 xl:col-span-8 xl:pl-10" stagger={0.12} amount={0.3}>
          {future.qualities.map((q) => (
            <StaggerItem
              as="li"
              key={q.word}
              className="group flex flex-wrap items-baseline gap-x-4 border-b border-line py-5 first:border-t sm:py-6"
            >
              <span className="font-display text-[2.6rem] leading-none text-maroon italic transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-2 sm:text-6xl lg:text-7xl">
                {q.word}
              </span>
              <span className="font-display text-[1.6rem] leading-none text-ink sm:text-4xl lg:text-5xl">{q.rest}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
