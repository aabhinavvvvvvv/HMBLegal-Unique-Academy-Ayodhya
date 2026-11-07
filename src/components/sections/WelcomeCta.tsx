import { welcome } from "@/content/school";
import { mapsDirectionsUrl, site } from "@/content/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Rays } from "@/components/ui/Rays";

/** Closing call to action used at the end of most pages. */
export function WelcomeCta({ showEnquiry = true }: { showEnquiry?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-maroon-deep py-24 text-paper sm:py-32 lg:py-36" aria-labelledby="welcome-title">
      <Rays className="absolute -right-64 top-1/2 size-[64rem] -translate-y-1/2 text-gold/[0.13]" count={96} spin />
      <div className="container-x relative">
        <Reveal y={12}>
          <p className="eyebrow eyebrow-light">{site.fullName}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="welcome-title" className="mt-6 max-w-4xl text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[5rem]">
            Welcome to the <em className="italic text-gold-soft">Unique Journey</em>
          </h2>
        </Reveal>

        <Stagger as="ul" className="mt-10 space-y-2 font-display text-xl text-paper/80 sm:text-2xl lg:text-3xl" stagger={0.14}>
          {welcome.lines.map((l) => (
            <StaggerItem as="li" key={l}>
              {l}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.3} className="mt-12 flex flex-col gap-3 sm:flex-row">
          {showEnquiry && (
            <ButtonLink href="/admissions#enquiry" variant="light">
              Admission Enquiry
            </ButtonLink>
          )}
          <ButtonLink href={mapsDirectionsUrl} variant="ghost">
            Visit us in Beniganj
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
