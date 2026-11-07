"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Moves its content slightly slower/faster than the page scroll. Disabled for reduced motion. */
export function Parallax({ children, className, offset = 60 }: { children: ReactNode; className?: string; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

/** A line that draws itself as its section scrolls through the viewport. */
export function ScrollLine({ className, axis = "x" }: { className?: string; axis?: "x" | "y" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.div
        className="h-full w-full bg-maroon"
        style={axis === "x" ? { scaleX: scale, transformOrigin: "left" } : { scaleY: scale, transformOrigin: "top" }}
      />
    </div>
  );
}
