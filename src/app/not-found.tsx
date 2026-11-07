import type { Metadata } from "next";
import { Emblem } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Rays } from "@/components/ui/Rays";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-stone pt-28">
      <Rays className="absolute left-1/2 top-1/2 size-[60rem] -translate-x-1/2 -translate-y-1/2 text-maroon/[0.07]" count={80} spin />
      <div className="container-x relative text-center">
        <Emblem size={96} className="mx-auto" />
        <p className="eyebrow mt-10 justify-center">Error 404</p>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl leading-tight sm:text-6xl">
          This path leads <em className="italic text-maroon">somewhere new.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-graphite">
          The page you were looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact the school
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
