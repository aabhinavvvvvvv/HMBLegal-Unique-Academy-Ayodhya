"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  from?: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts up to a real figure when scrolled into view. Renders the final value for SSR and reduced motion. */
export function Counter({ to, from = 0, suffix = "", duration = 1.8, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);
  const [armed, setArmed] = useState(false);

  // Before the element is seen, show the starting value (client only, avoids hydration mismatch).
  useEffect(() => {
    if (!reduce) {
      setValue(from);
      setArmed(true);
    }
  }, [from, reduce]);

  useEffect(() => {
    if (!inView || !armed) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, armed, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  );
}
