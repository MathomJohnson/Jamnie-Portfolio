"use client";

import Image from "next/image";
import type { IreneSlide } from "@/lib/projects/irene";
import { SlideCaption, SlideShell, useTapCaption } from "@/components/project/slide-shared";

export function Slide({ slide }: { slide: IreneSlide }) {
  const tap = useTapCaption();

  return (
    <SlideShell id={`slide-${slide.id}`}>
      <div
        className="slide relative h-full w-full"
        tabIndex={0}
        {...tap}
      >
        {slide.src ? (
          <Image
            src={slide.src}
            alt={slide.alt ?? ""}
            fill
            priority={slide.id === "front"}
            sizes="100vw"
            className={
              slide.contain
                ? "object-contain p-10 sm:p-16 irene-line-art"
                : "object-cover"
            }
          />
        ) : null}
        <SlideCaption heading={slide.heading} caption={slide.caption} />
      </div>
    </SlideShell>
  );
}
