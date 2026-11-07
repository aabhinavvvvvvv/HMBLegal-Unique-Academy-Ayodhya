"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { id: string; label: string };

/**
 * Sticky in-page navigation for long pages. Highlights the section currently in view
 * and keeps the active chip scrolled into view on small screens.
 */
export function SectionNav({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // Active = the last section whose top has passed 40% of the viewport; the first one before that.
      const line = window.innerHeight * 0.4;
      let current = items[0]?.id;
      for (const i of items) {
        const el = document.getElementById(i.id);
        if (el && el.getBoundingClientRect().top <= line) current = i.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const list = listRef.current;
    if (el && list) list.scrollTo({ left: el.offsetLeft - 20, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-[4.25rem] z-30 border-b border-line bg-paper/95 backdrop-blur-md">
      <ul ref={listRef} className="container-x flex gap-1.5 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((i) => (
          <li key={i.id} data-id={i.id} className="shrink-0">
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className={cn(
                "inline-flex rounded-full px-4 py-2 text-[0.85rem] font-semibold whitespace-nowrap transition-colors duration-300",
                active === i.id ? "bg-maroon text-paper" : "text-graphite hover:bg-stone hover:text-ink",
              )}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
