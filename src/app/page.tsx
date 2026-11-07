import { HomeHero } from "@/components/sections/HomeHero";
import { ValuesMarquee } from "@/components/sections/ValuesMarquee";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { PhilosophyPillars } from "@/components/sections/PhilosophyPillars";
import { UniqueDifference } from "@/components/sections/UniqueDifference";
import { FeatureBento } from "@/components/sections/FeatureBento";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { VisionMission } from "@/components/sections/VisionMission";
import { BeyondClassroom } from "@/components/sections/BeyondClassroom";
import { MeetTheFuture } from "@/components/sections/MeetTheFuture";
import { PromiseSection } from "@/components/sections/PromiseSection";
import { WelcomeCta } from "@/components/sections/WelcomeCta";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ValuesMarquee />
      <AboutIntro />
      <PhilosophyPillars />
      <UniqueDifference />
      <FeatureBento />
      <JourneyTimeline />
      <VisionMission />
      <BeyondClassroom />
      <MeetTheFuture />
      <PromiseSection />
      <WelcomeCta />
    </>
  );
}
