import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionNav } from "@/components/sections/SectionNav";
import { VisionMission } from "@/components/sections/VisionMission";
import { PhilosophyPillars } from "@/components/sections/PhilosophyPillars";
import { MeetTheFuture } from "@/components/sections/MeetTheFuture";
import { WelcomeCta } from "@/components/sections/WelcomeCta";
import { philosophy } from "@/content/school";
import { heroPhotos } from "@/content/media";

export const metadata: Metadata = {
  title: "Vision, Mission & Philosophy",
  description:
    "To shape individuals who are confident in their abilities, strong in their values, curious about the world, and prepared for the future — the vision, mission and philosophy of Unique Academy, Ayodhya.",
  alternates: { canonical: "/vision-mission" },
};

export default function VisionMissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Vision, Mission & Philosophy"
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Vision & Mission", href: "/vision-mission" },
        ]}
        title={
          <>
            Modern Minds. Strong Values. <em className="italic text-maroon">Bright Futures.</em>
          </>
        }
        lead={philosophy.lead}
        image={heroPhotos.visionMission}
      />
      <SectionNav
        label="On this page"
        items={[
          { id: "vision", label: "Our Vision" },
          { id: "mission", label: "Our Mission" },
          { id: "philosophy", label: "The Unique Philosophy" },
          { id: "future", label: "Meet the Future" },
        ]}
      />
      <VisionMission full />
      <PhilosophyPillars detailed id="philosophy" />
      <div className="border-t border-line" />
      <MeetTheFuture id="future" />
      <WelcomeCta />
    </>
  );
}
