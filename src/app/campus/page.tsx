import type { Metadata } from "next";
import { difference, whyUnique } from "@/content/school";
import { photos } from "@/content/media";
import { icons } from "@/lib/icons";
import { PageHero } from "@/components/layout/PageHero";
import { SectionNav } from "@/components/sections/SectionNav";
import { FeatureBlock } from "@/components/sections/FeatureBlock";
import { WelcomeCta } from "@/components/sections/WelcomeCta";

export const metadata: Metadata = {
  title: "Why Unique Academy — A School Designed for the Future",
  description:
    "A dedicated AI Lab, fully air-conditioned classrooms, technology-enabled education, dedicated faculty, indoor games, co-curricular learning and holistic development at Unique Academy, Ayodhya.",
  alternates: { canonical: "/campus" },
};

const photoFor: Record<string, keyof typeof photos> = {
  "ai-lab": "aiLab",
  classrooms: "classrooms",
  technology: "technology",
  faculty: "faculty",
  "indoor-games": "indoorGames",
  "co-curricular": "coCurricular",
  holistic: "holistic",
};

const toneFor: Record<string, "stone" | "maroon" | "night"> = {
  "ai-lab": "night",
  faculty: "maroon",
  holistic: "maroon",
};

export default function CampusPage() {
  return (
    <>
      <PageHero
        eyebrow={whyUnique.eyebrow}
        crumbs={[{ label: "Why Unique", href: "/campus" }]}
        title={
          <>
            A School Designed <em className="italic text-maroon">for the Future</em>
          </>
        }
        lead={difference.closing}
      />

      <SectionNav label="Facilities and features" items={whyUnique.features.map((f) => ({ id: f.id, label: f.shortTitle }))} />

      <section className="bg-paper py-10 sm:py-16" aria-label="What sets Unique Academy apart">
        <div className="container-x divide-y divide-line">
          {whyUnique.features.map((f, i) => (
            <FeatureBlock
              key={f.id}
              id={f.id}
              index={i + 1}
              eyebrow={f.id === "ai-lab" ? "Future-ready learning" : "Why Unique"}
              title={f.title}
              text={f.text}
              icon={icons[f.icon]}
              photo={photos[photoFor[f.id]]}
              tone={toneFor[f.id] ?? "stone"}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      <WelcomeCta />
    </>
  );
}
