"use client";

import { IndexLink } from "@/components/project/IndexLink";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ireneIndexHref, ireneSlides } from "@/lib/projects/irene";

const slideCount = ireneSlides.length;

export function ProjectChrome({ activeIndex }: { activeIndex: number }) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      router.push(ireneIndexHref);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  const number = String(activeIndex + 1).padStart(2, "0");
  const total = String(slideCount).padStart(2, "0");

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 px-5 py-5 sm:px-8 sm:py-6">
        <IndexLink
          href={ireneIndexHref}
          className="pointer-events-auto text-[var(--irene-paper)]"
        />
      </header>

      <p className="pointer-events-none fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 font-mono text-[0.625rem] tracking-[0.24em] text-[var(--irene-steel)] uppercase lg:block">
        {number} / {total}
      </p>
    </>
  );
}
