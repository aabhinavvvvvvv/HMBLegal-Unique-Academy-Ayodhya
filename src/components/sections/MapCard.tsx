import { ArrowUpRight, MapPin } from "lucide-react";
import { mapsDirectionsUrl, mapsEmbedUrl, site } from "@/content/site";
import { MaskReveal } from "@/components/motion/Reveal";

export function MapCard({ className }: { className?: string }) {
  return (
    <MaskReveal className={className}>
      <div className="overflow-hidden rounded-[1.75rem] border border-line bg-stone">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
          <iframe
            title={`Map showing the area around ${site.fullName}`}
            src={mapsEmbedUrl}
            className="absolute inset-0 h-full w-full grayscale-[35%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-ink">
            <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-maroon" />
            <span>
              <span className="block font-semibold">{site.fullName}</span>
              <span className="text-graphite">{site.address.display}</span>
            </span>
          </p>
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-maroon"
          >
            Get directions
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens Google Maps in a new tab)</span>
          </a>
        </div>
      </div>
    </MaskReveal>
  );
}
