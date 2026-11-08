"use client";

import type { IreneSlide } from "@/lib/projects/irene";
import { ireneTurntable } from "@/lib/projects/irene";
import { Turntable } from "@/components/project/Turntable";
import { SlideCaption, SlideShell, useTapCaption } from "@/components/project/slide-shared";

export function TurntableSlide({ slide }: { slide: IreneSlide }) {
  const tap = useTapCaption();

  return (
    <SlideShell id={`slide-${slide.id}`} className="bg-[var(--irene-bg)]">
      <div className="slide relative flex h-full w-full items-center justify-center" tabIndex={0} {...tap}>
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
