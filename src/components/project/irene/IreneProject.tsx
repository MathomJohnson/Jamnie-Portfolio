"use client";

import { BackstorySlide } from "@/components/project/BackstorySlide";
import { CrossfadeSlide } from "@/components/project/CrossfadeSlide";
import { GlazingSlide } from "@/components/project/GlazingSlide";
import { PanelSlide } from "@/components/project/PanelSlide";
import { ProjectChrome } from "@/components/project/ProjectChrome";
import { Slide } from "@/components/project/Slide";
import { SlideDeck, useSlideState } from "@/components/project/SlideDeck";
import { TurntableSlide } from "@/components/project/TurntableSlide";
import { ireneSlides } from "@/lib/projects/irene";

export function IreneProject() {
  const { activeIndex, onActiveChange } = useSlideState();

  return (
    <div className="project-irene bg-[var(--irene-bg)] text-[var(--irene-paper)]">
      <ProjectChrome activeIndex={activeIndex} />
      <SlideDeck onActiveChange={onActiveChange}>
        {ireneSlides.map((slide) => {
          if (slide.kind === "text") return <BackstorySlide key={slide.id} />;
          if (slide.kind === "turntable") {
            return <TurntableSlide key={slide.id} slide={slide} />;
          }
          if (slide.kind === "crossfade") {
            return <CrossfadeSlide key={slide.id} slide={slide} />;
          }
          if (slide.kind === "panels") {
            return <PanelSlide key={slide.id} slide={slide} />;
          }
          if (slide.kind === "spec") return <GlazingSlide key={slide.id} />;
          return <Slide key={slide.id} slide={slide} />;
        })}
      </SlideDeck>
    </div>
  );
}
