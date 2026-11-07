import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Photo } from "@/content/media";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Rays } from "@/components/ui/Rays";
import { siteUrl } from "@/content/site";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href: string };

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  /** Optional school photograph shown beside the title. */
  image?: Photo;
};

/** Shared hero for inner pages: breadcrumbs, eyebrow, display title, lead and optional photo. */
export function PageHero({ eyebrow, title, lead, crumbs, children, image }: Props) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${siteUrl}${c.href}`,
    })),
  };
  const portrait = image ? image.height > image.width : false;

  return (
    <section className="relative overflow-hidden border-b border-line bg-stone pt-36 pb-16 sm:pb-20 lg:pt-48 lg:pb-28">
      <Rays className="absolute -right-56 top-1/2 size-[46rem] -translate-y-1/2 text-maroon/[0.07]" count={72} spin />
      <div className="container-x relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.8rem] text-muted">
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={c.href} className="flex items-center gap-1.5">
                  {last ? (
                    <span aria-current="page" className="font-semibold text-ink">
                      {c.label}
                    </span>
                  ) : (
                    <>
                      <Link href={c.href} className="link-underline hover:text-ink">
                        {c.label}
                      </Link>
                      <ChevronRight aria-hidden="true" className="size-3.5" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className={cn("mt-10", image && "grid items-center gap-12 lg:grid-cols-12 lg:gap-14")}>
          <div className={cn("max-w-4xl", image && "lg:col-span-7")}>
            <Reveal y={12}>
              <p className="eyebrow">{eyebrow}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1
                className={cn(
                  "mt-6 text-[2.6rem] leading-[1.04] sm:text-6xl",
                  image ? "lg:text-[4rem] xl:text-[4.4rem]" : "lg:text-[4.6rem]",
                )}
              >
                {title}
              </h1>
            </Reveal>
            {lead && (
              <Reveal delay={0.14}>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-graphite sm:text-xl">{lead}</p>
              </Reveal>
            )}
            {children && <Reveal delay={0.2}>{children}</Reveal>}
          </div>

          {image && (
            <div className="lg:col-span-5">
              <Parallax offset={30}>
                <MaskReveal delay={0.15}>
                  <figure
                    className={cn(
                      "relative mx-auto overflow-hidden rounded-[2rem] bg-sand shadow-[0_40px_80px_-50px_rgba(79,18,18,0.6)]",
                      portrait ? "aspect-[4/5] max-w-md lg:max-w-none" : "aspect-[4/3]",
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      preload
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      style={{ objectPosition: image.position ?? "50% 50%" }}
                      className="object-cover"
                    />
                    <span aria-hidden="true" className="absolute inset-3 rounded-[1.6rem] border border-paper/40" />
                  </figure>
                </MaskReveal>
              </Parallax>
            </div>
          )}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
