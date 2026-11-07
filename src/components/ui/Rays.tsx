import { cn } from "@/lib/cn";

/**
 * Fine radiating lines — a restrained echo of the sunburst inside the school emblem.
 * Purely decorative.
 */
export function Rays({ className, count = 48, spin = false }: { className?: string; count?: number; spin?: boolean }) {
  const lines = Array.from({ length: count }, (_, i) => (360 / count) * i);
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={cn("pointer-events-none", spin && "animate-spin-slow", className)}
      aria-hidden="true"
      focusable="false"
    >
      {lines.map((deg, i) => (
        <line
          key={deg}
          x1="0"
          y1={i % 2 ? -34 : -28}
          x2="0"
          y2="-99"
          stroke="currentColor"
          strokeWidth={i % 2 ? 0.18 : 0.32}
          transform={`rotate(${deg})`}
        />
      ))}
      <circle r="99" fill="none" stroke="currentColor" strokeWidth="0.25" />
      <circle r="26" fill="none" stroke="currentColor" strokeWidth="0.25" />
    </svg>
  );
}

/** Small eight-point star used as a typographic separator. */
export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("inline-block", className)} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 0l2.1 7.2L20.5 3.5l-3.7 6.4L24 12l-7.2 2.1 3.7 6.4-6.4-3.7L12 24l-2.1-7.2-6.4 3.7 3.7-6.4L0 12l7.2-2.1L3.5 3.5l6.4 3.7z"
      />
    </svg>
  );
}
