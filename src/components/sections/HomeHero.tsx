"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/content/site";
import { Emblem } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Rays, Star } from "@/components/ui/Rays";

const EASE = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const emblemY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const raysRotate = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-stone">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-12 pt-32 pb-28 lg:grid-cols-12 lg:gap-8 lg:pt-36 lg:pb-32">
        {/* Copy */}
        <motion.div className="relative z-10 lg:col-span-7" style={reduce ? undefined : { y: textY }}>
          <motion.p className="eyebrow" {...fadeUp(0.1)}>
            <span>
              {site.name} <span aria-hidden="true">·</span> {site.branch}
            </span>
          </motion.p>

          <h1 className="mt-7 text-[3.3rem] leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-[6.2rem] xl:text-[6.9rem]">
            <span className="sr-only">{site.fullName}: </span>
            <Line delay={0.2}>Come Unique,</Line>
            <Line delay={0.34}>
              <em className="font-display italic text-maroon">Be Unique.</em>
            </Line>
          </h1>

          <motion.p className="mt-8 font-display text-2xl italic text-ink/85 sm:text-[1.7rem]" {...fadeUp(0.6)}>
            {site.theme}
          </motion.p>

          <motion.p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-graphite sm:text-lg" {...fadeUp(0.7)}>
            <strong className="font-semibold text-ink">{site.promise}</strong> The seventh branch of the{" "}
            {site.group}, carrying forward an educational journey that began in {site.groupFounded}.
          </motion.p>

          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" {...fadeUp(0.82)}>
            <ButtonLink href="/admissions#enquiry">Admission Enquiry</ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              Discover Our Story
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Emblem composition */}
        <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[28rem] lg:col-span-5 lg:max-w-none">
          <motion.div
            className="absolute inset-[-28%] text-maroon/[0.13]"
            style={reduce ? undefined : { rotate: raysRotate }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
            aria-hidden="true"
          >
            <Rays className="h-full w-full" count={72} spin />
          </motion.div>

          <motion.div
            className="absolute inset-[6%] rounded-full border border-gold/40"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
            aria-hidden="true"
          />

          <motion.div className="absolute inset-[13%]" style={reduce ? undefined : { y: emblemY }}>
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0, scale: 0.86, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
            >
              <motion.div
                className="h-full w-full rounded-full shadow-[0_40px_80px_-30px_rgba(79,18,18,0.55)]"
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Emblem size={440} preload className="h-full w-full" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -left-2 top-[8%] rounded-2xl border border-line bg-paper/95 px-4 py-3 shadow-[0_20px_40px_-24px_rgba(26,26,26,0.4)] sm:-left-6"
            {...fadeUp(1.05)}
          >
            <p className="font-display text-2xl leading-none text-maroon">{site.groupFounded}</p>
            <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">Legacy begins</p>
          </motion.div>

          <motion.div
            className="absolute -right-1 bottom-[10%] rounded-2xl border border-line bg-paper/95 px-4 py-3 shadow-[0_20px_40px_-24px_rgba(26,26,26,0.4)] sm:-right-4"
            {...fadeUp(1.2)}
          >
            <p className="font-display text-2xl leading-none text-maroon">AI Lab</p>
            <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">Future-ready learning</p>
          </motion.div>
        </div>
      </div>

      {/* Closing line */}
      <motion.div
        className="absolute inset-x-0 bottom-0 border-t border-line bg-paper/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <ul className="container-x flex h-16 items-center justify-between gap-3 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-graphite sm:justify-center sm:gap-10 sm:text-xs sm:tracking-[0.22em]">
          {["Modern Learning", "Timeless Values", "Future-Ready Minds"].map((t, i) => (
            <li key={t} className="flex items-center gap-4 sm:gap-10">
              {i > 0 && <Star className="hidden size-2.5 text-gold sm:inline-block" />}
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
