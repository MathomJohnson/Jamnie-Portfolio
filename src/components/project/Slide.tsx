"use client";

import Image from "next/image";
import type { IreneSlide } from "@/lib/projects/irene";
import { SlideCaption, SlideShell, useTapCaption } from "@/components/project/slide-shared";

export function Slide({ slide }: { slide: IreneSlide }) {
  const tap = useTapCaption();

  return (
    <SlideShell id={`slide-${slide.id}`}>
      <div
        className="slide relative w-full md:h-full"
        tabIndex={0}
        {...tap}
      >
        {slide.src ? (
          // Phones: the image at its own aspect ratio. Desktop: full-bleed slide.
          <div
            className="relative w-full max-md:aspect-[var(--ar)] md:absolute md:inset-0"
            style={{ "--ar": `${slide.width} / ${slide.height}` } as React.CSSProperties}
          >
            <Image
              src={slide.src}
              alt={slide.alt ?? ""}
              fill
              priority={slide.id === "front"}
              sizes="100vw"
              className={
                slide.contain
                  ? "object-contain p-4 sm:p-16 irene-line-art"
                  : "object-cover"
              }
            />
          </div>
        ) : null}
        <SlideCaption heading={slide.heading} caption={slide.caption} />
      </div>
    </SlideShell>
  );
}
