"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryItem } from "@/content/media";
import { cn } from "@/lib/cn";

/** Filterable masonry gallery with a keyboard- and swipe-friendly lightbox. */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState<number | null>(null);
  const visible = useMemo(() => (filter === "All" ? items : items.filter((i) => i.category === filter)), [items, filter]);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const current = index !== null ? visible[index] : null;

  return (
    <div>
      {categories.length > 2 && (
        <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                filter === c ? "border-maroon bg-maroon text-paper" : "border-line text-graphite hover:border-ink hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <motion.ul layout className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence>
          {visible.map((item, i) => (
            <motion.li
              key={item.src}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setIndex(i);
                }}
                className="group relative block w-full overflow-hidden rounded-2xl bg-sand"
                aria-label={`Open photo: ${item.caption ?? item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                />
                {item.caption && (
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-linear-to-t from-night/80 to-transparent p-4 pt-10 text-left text-sm text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </span>
                )}
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption ?? current.alt}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-night/95 p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative max-h-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) step(1);
                if (info.offset.x > 80) step(-1);
              }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                className="max-h-[80vh] w-auto rounded-xl object-contain"
              />
              {current.caption && <figcaption className="mt-4 text-center text-paper/80">{current.caption}</figcaption>}
            </motion.figure>

            <LightboxButton label="Close" className="right-4 top-4" onClick={close} autoFocus>
              <X className="size-5" aria-hidden="true" />
            </LightboxButton>
            {visible.length > 1 && (
              <>
                <LightboxButton label="Previous photo" className="left-4 top-1/2 -translate-y-1/2" onClick={() => step(-1)}>
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </LightboxButton>
                <LightboxButton label="Next photo" className="right-4 top-1/2 -translate-y-1/2" onClick={() => step(1)}>
                  <ChevronRight className="size-5" aria-hidden="true" />
                </LightboxButton>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LightboxButton({
  label,
  className,
  onClick,
  children,
  autoFocus,
}: {
  label: string;
  className: string;
  onClick: () => void;
  children: React.ReactNode;
  autoFocus?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      autoFocus={autoFocus}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "absolute grid size-12 place-items-center rounded-full border border-paper/20 bg-night/60 text-paper transition-colors hover:bg-paper hover:text-night",
        className,
      )}
    >
      {children}
    </button>
  );
}
