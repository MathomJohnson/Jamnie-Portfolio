"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { IreneSlide } from "@/lib/projects/irene";
import { SlideCaption, SlideShell, useTapCaption } from "@/components/project/slide-shared";

const DWELL_MS = 4000;

export function CrossfadeSlide({ slide }: { slide: IreneSlide }) {
  const tap = useTapCaption();
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const sources = slide.sources ?? [];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !inView || sources.length < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % sources.length);
    }, DWELL_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce, sources.length]);

  return (
    <SlideShell id={`slide-${slide.id}`}>
      <div ref={rootRef} className="slide relative h-full w-full" tabIndex={0} {...tap}>
        {sources.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={index === active ? (slide.alt ?? "") : ""}
            fill
            sizes="100vw"
            className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <SlideCaption heading={slide.heading} caption={slide.caption} />
      </div>
    </SlideShell>
  );
}
