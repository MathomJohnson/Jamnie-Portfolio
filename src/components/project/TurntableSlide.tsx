"use client";

import type { IreneSlide } from "@/lib/projects/irene";
import { ireneTurntable } from "@/lib/projects/irene";
import { Turntable } from "@/components/project/Turntable";
import { SlideCaption, SlideShell, useTapCaption } from "@/components/project/slide-shared";

export function TurntableSlide({ slide }: { slide: IreneSlide }) {
  const tap = useTapCaption();

  return (
    <SlideShell id={`slide-${slide.id}`} className="bg-[var(--irene-bg)]">
      <div className="slide relative flex w-full flex-col pt-10 md:h-full md:items-center md:justify-center md:pt-0" tabIndex={0} {...tap}>
        <div className="w-full max-w-[min(100vw,150vh)] px-0">
          <Turntable
            frameDir={ireneTurntable.frameDir}
            frameCount={ireneTurntable.frameCount}
            framePad={ireneTurntable.framePad}
            frameExt={ireneTurntable.frameExt}
            poster={ireneTurntable.poster}
            alt={ireneTurntable.alt}
            sensitivity={ireneTurntable.sensitivity}
          />
        </div>
        <SlideCaption heading={slide.heading} caption={slide.caption} />
      </div>
    </SlideShell>
  );
}
