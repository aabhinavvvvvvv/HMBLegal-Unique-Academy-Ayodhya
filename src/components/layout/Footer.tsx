import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { footerNav } from "@/content/navigation";
import { mapsDirectionsUrl, site } from "@/content/site";
import { Emblem } from "@/components/ui/Logo";
import { Rays } from "@/components/ui/Rays";

export function Footer() {
  const year = new Date().getFullYear();
  const contactLines = [site.phone, site.email, site.whatsapp].filter(Boolean);

  return (
    <footer className="relative overflow-hidden bg-night text-paper/75">
      <Rays className="absolute -right-48 -top-48 size-[42rem] text-gold/10" count={64} />

      <div className="container-x relative pt-20 pb-10 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <Emblem size={72} />
              <div>
                <p className="font-display text-2xl text-paper">{site.name}</p>
                <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-gold-soft">
                  {site.branch}
                </p>
              </div>
            </div>
            <p className="mt-8 font-display text-3xl leading-tight text-paper sm:text-4xl">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-md leading-relaxed">{site.closingLine}</p>
            <p lang="sa" className="mt-6 font-deva text-xl text-gold-soft">
              {site.motto.devanagari}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title="Explore" links={footerNav.explore} />
            <FooterColumn title="For Parents" links={footerNav.parents} />
            <div>
              <h2 className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.24em] text-gold-soft">Visit Us</h2>
              <address className="mt-5 not-italic leading-relaxed">
                <span className="flex items-start gap-2.5">
                  <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                  <span>
                    {site.address.line1},<br />
                    {site.address.line2}, {site.address.city}
                  </span>
                </span>
                {contactLines.map((c) => (
                  <a key={c!.href} href={c!.href} className="link-underline mt-3 block hover:text-paper">
                    {c!.display}
                  </a>
                ))}
              </address>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-paper hover:text-gold-soft"
              >
                Get directions
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-paper/10 pt-8 text-[0.82rem] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.fullName}. The {site.branchNumber}th branch of the {site.group}.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="link-underline hover:text-paper">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="link-underline hover:text-paper">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.24em] text-gold-soft">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline hover:text-paper">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
