import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gallery, hasGallery } from "@/content/media";
import { PageHero } from "@/components/layout/PageHero";
import { Gallery } from "@/components/sections/Gallery";
import { WelcomeCta } from "@/components/sections/WelcomeCta";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from campus life at Unique Academy, Ayodhya.",
  alternates: { canonical: "/gallery" },
};

/** Published automatically once photographs are added to `src/content/media.ts`. */
export default function GalleryPage() {
  if (!hasGallery) notFound();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        crumbs={[
          { label: "Student Life", href: "/student-life" },
          { label: "Gallery", href: "/gallery" },
        ]}
        title={
          <>
            Life at <em className="italic text-maroon">Unique Academy</em>
          </>
        }
        lead="Celebrations, cultural programmes and learning in action — moments from our students' days."
      />
      <section className="section-y bg-paper">
        <div className="container-x">
          <Gallery items={gallery} />
        </div>
      </section>
      <WelcomeCta />
    </>
  );
}
