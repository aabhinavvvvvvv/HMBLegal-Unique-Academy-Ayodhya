import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { Photo } from "@/content/media";
import { Reveal } from "@/components/motion/Reveal";
import { Visual } from "@/components/ui/Visual";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  index: number;
  eyebrow?: string;
  title: string;
  text: string;
  icon: LucideIcon;
  photo: Photo | null;
  reverse?: boolean;
  tone?: "stone" | "maroon" | "night";
  children?: ReactNode;
};

/** Alternating image/text block used for facilities and programmes. */
export function FeatureBlock({ id, index, eyebrow, title, text, icon: Icon, photo, reverse, tone = "stone", children }: Props) {
  return (
    <article id={id} className="scroll-mt-40 py-14 sm:py-20" aria-labelledby={`${id}-title`}>
      <div className={cn("grid items-center gap-10 lg:grid-cols-12 lg:gap-16")}>
        <div className={cn("lg:col-span-6", reverse && "lg:order-2 lg:col-start-7")}>
          <Visual photo={photo} icon={Icon} label={title} tone={tone} className="aspect-[4/3] w-full" />
        </div>
        <div className={cn("lg:col-span-5", reverse ? "lg:col-start-1" : "lg:col-start-8")}>
          <Reveal y={12}>
            <p className="flex items-center gap-4 text-[0.7rem] font-bold uppercase tracking-[0.26em] text-maroon">
              <span className="font-display text-base tracking-normal text-gold">{String(index).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id={`${id}-title`} className="mt-5 text-[2rem] leading-[1.1] sm:text-[2.6rem]">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-lg leading-relaxed text-graphite">{text}</p>
          </Reveal>
          {children && <Reveal delay={0.18}>{children}</Reveal>}
        </div>
      </div>
    </article>
  );
}
