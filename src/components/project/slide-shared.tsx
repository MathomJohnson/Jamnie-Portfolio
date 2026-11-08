"use client";

import { useRef, type ReactNode } from "react";

type SlideCaptionProps = {
  heading: string;
  caption: string;
};

export function SlideCaption({ heading, caption }: SlideCaptionProps) {
  return (
    <div className="slide-caption pointer-events-none relative z-10 px-6 pt-5 pb-14 sm:px-12 md:absolute md:inset-x-0 md:bottom-0 md:py-12 lg:px-16">
      <h3 className="font-condensed text-[1.75rem] leading-none font-extrabold tracking-[0.04em] text-[var(--irene-accent)] uppercase sm:text-[1.75rem]">
        {heading}
      </h3>
      <p className="mt-2 max-w-[32.5rem] text-[0.875rem] leading-relaxed text-[var(--irene-steel)]">
        {caption}
      </p>
    </div>
  );
}

export function useTapCaption() {
  const start = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    start.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const origin = start.current;
    start.current = null;
    if (!origin) return;
    const dx = Math.abs(event.clientX - origin.x);
    const dy = Math.abs(event.clientY - origin.y);
    if (dx > 8 || dy > 8) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const slide = event.currentTarget;
    slide.dataset.open = slide.dataset.open === "true" ? "false" : "true";
  };

  return { onPointerDown, onPointerUp };
}

export function SlideShell({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-slide
      className={`irene-slide relative w-full shrink-0 md:h-dvh md:snap-start md:snap-always ${className}`}
    >
      {children}
    </section>
  );
}
