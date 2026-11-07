import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { Photo } from "@/content/media";
import { MaskReveal } from "@/components/motion/Reveal";
import { Rays } from "./Rays";
import { cn } from "@/lib/cn";

type VisualProps = {
  photo: Photo | null;
  icon: LucideIcon;
  label: string;
  className?: string;
  tone?: "stone" | "maroon" | "night";
  sizes?: string;
  priority?: boolean;
};

const tones = {
  stone: "bg-sand text-maroon",
  maroon: "bg-maroon-deep text-gold-soft",
  night: "bg-night text-gold-soft",
};

/**
 * Media frame. Shows the school's photograph when one is registered in
 * `content/media.ts`; otherwise a designed illustration panel (emblem rays +
 * icon), so layouts look intentional before photography is supplied.
 */
export function Visual({ photo, icon: Icon, label, className, tone = "stone", sizes, priority }: VisualProps) {
  return (
    <MaskReveal className={cn("group relative overflow-hidden rounded-[1.75rem]", className)}>
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          preload={priority}
          sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
          style={{ objectPosition: photo.position ?? "50% 50%" }}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
        />
      ) : (
        <div className={cn("absolute inset-0 grain", tones[tone])} role="img" aria-label={label}>
          <Rays
            className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-[0.22] transition-transform duration-[2s] ease-[var(--ease-soft)] group-hover:rotate-[10deg]"
            count={56}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center">
            <span
              className={cn(
                "grid size-24 place-items-center rounded-full border transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-105 sm:size-28",
                tone === "stone" ? "border-maroon/25 bg-paper/70" : "border-gold-soft/30 bg-paper/5",
              )}
            >
              <Icon aria-hidden="true" className="size-10 sm:size-12" strokeWidth={1.25} />
            </span>
            <span
              className={cn(
                "text-[0.7rem] font-bold uppercase tracking-[0.26em]",
                tone === "stone" ? "text-maroon/80" : "text-gold-soft/80",
              )}
            >
              {label}
            </span>
          </div>
        </div>
      )}
    </MaskReveal>
  );
}
