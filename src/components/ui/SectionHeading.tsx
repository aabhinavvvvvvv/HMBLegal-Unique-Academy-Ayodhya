import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
};

export function SectionHeading({ eyebrow, title, lead, align = "left", tone = "dark", className, as = "h2", id }: Props) {
  const H = as;
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal y={12}>
          <p className={cn("eyebrow", tone === "light" && "eyebrow-light", align === "center" && "justify-center")}>
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <H
          id={id}
          className={cn(
            "mt-5 text-[2.15rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]",
            tone === "light" ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </H>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed sm:text-xl",
              tone === "light" ? "text-paper/75" : "text-graphite",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
