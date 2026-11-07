import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "ghost" | "text";

const base =
  "group relative inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full text-[0.9rem] font-semibold tracking-wide transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-soft)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon px-6 py-3.5 text-paper shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-12px_rgba(79,18,18,0.6)] hover:bg-maroon-deep hover:shadow-[0_14px_30px_-14px_rgba(79,18,18,0.8)]",
  secondary: "border border-ink/15 bg-paper/60 px-6 py-3.5 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  light: "bg-paper px-6 py-3.5 text-maroon-deep hover:bg-gold-soft",
  ghost: "border border-paper/30 px-6 py-3.5 text-paper hover:border-paper hover:bg-paper hover:text-maroon-deep",
  text: "px-0 py-1 text-maroon hover:text-maroon-deep",
};

type Common = { variant?: Variant; className?: string; children: ReactNode; icon?: "arrow" | "external" | "none" };

function Icon({ icon }: { icon: Common["icon"] }) {
  if (icon === "none") return null;
  const C = icon === "external" ? ArrowUpRight : ArrowRight;
  return (
    <C
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-1"
      strokeWidth={2}
    />
  );
}

/** Internal or external link styled as a button. External links open in a new tab. */
export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  icon = "arrow",
  ...rest
}: Common & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const external = /^https?:\/\//.test(href);
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        <span>{children}</span>
        <Icon icon={icon === "arrow" ? "external" : icon} />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <span>{children}</span>
      <Icon icon={icon} />
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  icon = "arrow",
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <span>{children}</span>
      <Icon icon={icon} />
    </button>
  );
}
