import { Check } from "lucide-react";
import { promise } from "@/content/school";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function PromiseSection({ id, tone = "stone" }: { id?: string; tone?: "stone" | "paper" }) {
  return (
    <section id={id} className={cn("section-y", tone === "stone" ? "bg-stone" : "bg-paper")} aria-labelledby="promise-title">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal y={12}>
            <p className="eyebrow">For Parents</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="promise-title" className="mt-5 text-[2.15rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              A Promise to <em className="italic text-maroon">Every Parent</em>
            </h2>
          </Reveal>
          {promise.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.05}>
              <p className={cn("mt-6 leading-relaxed", i === 0 ? "text-xl text-ink" : "text-lg text-graphite")}>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-graphite">{promise.commitment}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <p className="font-display text-2xl text-ink sm:text-3xl">{promise.community}</p>
          </Reveal>
          <Stagger as="ul" className="mt-6" stagger={0.1} amount={0.3}>
            {promise.communityWords.map((w, i) => (
              <StaggerItem
                as="li"
                key={w}
                className="group flex items-center justify-between border-b border-line py-4 first:border-t"
              >
                <span className="font-display text-4xl text-maroon italic sm:text-5xl">
                  {i === promise.communityWords.length - 1 ? `and ${w}.` : `${w},`}
                </span>
                <span className="grid size-10 place-items-center rounded-full border border-maroon/25 text-maroon transition-colors duration-500 group-hover:bg-maroon group-hover:text-paper">
                  <Check aria-hidden="true" className="size-4" />
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
