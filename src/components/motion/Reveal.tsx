"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "p" | "span" | "h2" | "h3";
};

/** Fades and lifts content into view once, when it scrolls into the viewport. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
  amount?: number;
};

/** Parent that staggers its <StaggerItem> children into view. */
export function Stagger({ children, className, stagger = 0.08, as = "div", amount = 0.15 }: StaggerProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={staggerItem}>
      {children}
    </Tag>
  );
}

/** Image/panel reveal: a soft clip-path wipe upward with a gentle settle. */
export function MaskReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(18% 0% 0% 0%)", opacity: 0, scale: 1.04 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
