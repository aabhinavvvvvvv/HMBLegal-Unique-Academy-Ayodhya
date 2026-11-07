import Image from "next/image";
import type { Photo } from "@/content/media";
import { hasGallery } from "@/content/media";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Tile spans for six photos: one feature tile, two small, one wide, two halves. */
const spans = [
  "col-span-2 row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2",
  "col-span-2 md:col-span-2",
  "col-span-2 md:col-span-2",
];

type Props = {
  photos: Photo[];
  eyebrow?: string;
  title?: React.ReactNode;
  className?: string;
};

/** Editorial photo mosaic with captions, gentle reveal and hover zoom. */
export function PhotoMosaic({ photos, eyebrow, title, className }: Props) {
  return (
    <div className={className}>
      {(eyebrow || title) && (
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow && (
              <Reveal y={12}>
                <p className="eyebrow">{eyebrow}</p>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-[2rem] leading-[1.1] sm:text-[2.6rem]">{title}</h2>
              </Reveal>
            )}
          </div>
          {hasGallery && (
            <Reveal delay={0.1}>
              <ButtonLink href="/gallery" variant="secondary">
                View the gallery
              </ButtonLink>
            </Reveal>
          )}
        </div>
      )}

      <ul className="grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 md:auto-rows-[13.5rem] lg:gap-4">
        {photos.slice(0, 6).map((p, i) => (
          <li key={p.src} className={cn("min-h-0", spans[i])}>
            <MaskReveal delay={0.06 * i} className="h-full">
              <figure className="group relative h-full overflow-hidden rounded-[1.25rem] bg-sand">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={i === 0 || i >= 3 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  style={{ objectPosition: p.position ?? "50% 50%" }}
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                />
                {p.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-night/75 via-night/25 to-transparent p-4 pt-12 text-[0.82rem] font-medium leading-snug text-paper">
                    {p.caption}
                  </figcaption>
                )}
              </figure>
            </MaskReveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
