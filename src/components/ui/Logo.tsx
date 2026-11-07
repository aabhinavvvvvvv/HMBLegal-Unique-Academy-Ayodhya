import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Emblem({
  size = 48,
  className,
  eager,
  preload,
}: {
  size?: number;
  className?: string;
  /** Load immediately (above-the-fold), without a preload hint. */
  eager?: boolean;
  /** Preload as the page's main (LCP) image. */
  preload?: boolean;
}) {
  return (
    <Image
      src="/brand/logo-emblem-480.webp"
      alt={`${site.name} emblem — Goddess Saraswati with the motto “${site.motto.devanagari}”`}
      width={size}
      height={size}
      preload={preload}
      loading={eager || preload ? "eager" : undefined}
      sizes={`${size}px`}
      className={cn("aspect-square rounded-full object-contain", className)}
    />
  );
}

/** Emblem + wordmark lockup. The emblem keeps its original 1:1 proportions at every size. */
export function Logo({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-full"
      aria-label={`${site.fullName} — home`}
    >
      <Emblem
        size={52}
        className={cn(
          "shadow-[0_2px_10px_-4px_rgba(79,18,18,0.5)] transition-[width,height,rotate] duration-500 ease-[var(--ease-soft)] group-hover:rotate-[8deg]",
          compact ? "size-11" : "size-[3.25rem]",
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.32rem] tracking-[-0.01em] transition-colors",
            tone === "light" ? "text-paper" : "text-ink",
          )}
        >
          Unique Academy
        </span>
        <span
          className={cn(
            "mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.28em]",
            tone === "light" ? "text-gold-soft" : "text-maroon",
          )}
        >
          Ayodhya Branch
        </span>
      </span>
    </Link>
  );
}
