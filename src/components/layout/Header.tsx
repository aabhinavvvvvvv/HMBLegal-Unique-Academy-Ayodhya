"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { mainNav, type NavItem } from "@/content/navigation";
import { mapsDirectionsUrl, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (pathname.startsWith(item.href.split("#")[0])) return true;
  return item.children?.some((c) => pathname === c.href.split("#")[0]) ?? false;
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      {/* Utility bar */}
      <div
        className={cn(
          "hidden overflow-hidden bg-maroon-deep text-[0.78rem] text-paper/85 transition-[max-height,opacity] duration-500 ease-[var(--ease-soft)] md:block",
          scrolled || mobileOpen ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
        )}
      >
        <div className="container-x flex h-10 items-center justify-between gap-6">
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-2 hover:text-paper"
          >
            <MapPin aria-hidden="true" className="size-3.5 text-gold-soft" />
            {site.address.display}
            <span className="sr-only">(opens Google Maps in a new tab)</span>
          </a>
          <p className="tracking-wide max-lg:hidden">
            The {ordinal(site.branchNumber)} branch of the {site.group} <span className="text-gold-soft">·</span> Legacy since{" "}
            {site.groupFounded}
          </p>
          {site.phone && (
            <a href={site.phone.href} className="link-underline inline-flex items-center gap-2 hover:text-paper">
              <Phone aria-hidden="true" className="size-3.5 text-gold-soft" />
              {site.phone.display}
            </a>
          )}
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "relative z-50 border-b transition-[background-color,border-color,box-shadow] duration-500",
          scrolled || mobileOpen
            ? "border-line bg-paper/95 shadow-[0_10px_30px_-24px_rgba(26,26,26,0.5)] backdrop-blur-md"
            : "border-transparent bg-paper/80 backdrop-blur-sm",
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-[var(--ease-soft)]",
            scrolled ? "h-[4.25rem]" : "h-[4.75rem] lg:h-[5.5rem]",
          )}
        >
          <Logo compact={scrolled} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <DesktopItem key={item.label} item={item} active={isActive(pathname, item)} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href="/admissions#enquiry"
              className="!px-5 !py-3 max-sm:hidden lg:max-xl:hidden"
            >
              Admission Enquiry
            </ButtonLink>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/* ----------------------------------------------------------- Desktop item */

function DesktopItem({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const ref = useRef<HTMLLIElement>(null);

  const show = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 140);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkCls = cn(
    "relative inline-flex items-center gap-1 rounded-full px-3.5 py-2.5 text-[0.92rem] font-medium transition-colors xl:px-4",
    active ? "text-maroon" : "text-ink/80 hover:text-ink",
  );

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={linkCls} aria-current={active ? "page" : undefined}>
          {item.label}
          <ActiveDot active={active} />
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="flex items-center">
        <Link href={item.href} className={cn(linkCls, "pr-1 xl:pr-1")} aria-current={active ? "page" : undefined}>
          {item.label}
          <ActiveDot active={active} />
        </Link>
        <button
          type="button"
          className="grid size-7 place-items-center rounded-full text-ink/60 transition-colors hover:text-ink"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${item.label} submenu`}
          onClick={() => setOpen((o) => !o)}
        >
          <ChevronDown
            aria-hidden="true"
            className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
          >
            <ul className="overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-[0_30px_60px_-30px_rgba(26,26,26,0.45)]">
              {item.children.map((child, i) => (
                <motion.li
                  key={child.href}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.3, ease: EASE }}
                >
                  <Link
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="group/item flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-stone focus-visible:bg-stone"
                  >
                    <span>
                      <span className="block text-[0.92rem] font-semibold text-ink">{child.label}</span>
                      {child.description && (
                        <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">{child.description}</span>
                      )}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 -translate-x-2 text-maroon opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function ActiveDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute bottom-1 left-1/2 h-px w-5 -translate-x-1/2 bg-gold transition-transform duration-500",
        active ? "scale-x-100" : "scale-x-0",
      )}
    />
  );
}

/* ------------------------------------------------------------- Mobile menu */

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-[4.75rem] lg:hidden"
        >
          <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pb-10 pt-4">
            <ul className="divide-y divide-line border-b border-line">
              {mainNav.map((item, i) => {
                const active = isActive(pathname, item);
                const isOpen = expanded === item.label;
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.5, ease: EASE }}
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn("flex-1 py-4 font-display text-[1.75rem]", active ? "text-maroon" : "text-ink")}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? "Hide" : "Show"} ${item.label} pages`}
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          className="grid size-11 place-items-center rounded-full border border-line"
                        >
                          <ChevronDown
                            aria-hidden="true"
                            className={cn("size-5 transition-transform duration-300", isOpen && "rotate-180")}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {item.children && isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={onClose}
                                className="flex items-center justify-between border-l border-gold py-2.5 pl-4 text-[0.98rem] text-graphite"
                              >
                                {c.label}
                                <ArrowRight aria-hidden="true" className="size-4 text-maroon" />
                              </Link>
                            </li>
                          ))}
                          <li className="h-4" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href="/admissions#enquiry" className="w-full">
                Admission Enquiry
              </ButtonLink>
              <ButtonLink href={mapsDirectionsUrl} variant="secondary" className="w-full">
                Get Directions
              </ButtonLink>
            </div>

            <div className="mt-auto pt-10 text-sm text-muted">
              <p className="font-display text-lg text-ink">{site.tagline}</p>
              <p className="mt-2 flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-maroon" />
                {site.address.display}
              </p>
              {site.phone && (
                <a href={site.phone.href} className="mt-2 flex items-center gap-2 font-semibold text-ink">
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-maroon" />
                  {site.phone.display}
                </a>
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
