"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { IrenePanel, IreneSlide } from "@/lib/projects/irene";
import { SlideCaption, SlideShell, useTapCaption } from "@/components/project/slide-shared";

const COLUMN_GAP = 32;

function useSharedScale(panels: readonly IrenePanel[]) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const style = getComputedStyle(frame);
      const padX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const padY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const innerW = frame.clientWidth - padX;
      const innerH = frame.clientHeight - padY;
      const captions = frame.querySelectorAll("figcaption");
      const labelH = captions[0]?.getBoundingClientRect().height ?? 48;
      const stacked = !window.matchMedia("(min-width: 768px)").matches;
      const count = panels.length;

      // Stacked (phones) the slide grows with its content, so only width limits the scale.
      const next = stacked
        ? innerW / Math.max(...panels.map((panel) => panel.width))
        : Math.min(
            (innerW - COLUMN_GAP * (count - 1)) /
              panels.reduce((sum, panel) => sum + panel.width, 0),
            (innerH - labelH) / Math.max(...panels.map((panel) => panel.height)),
          );

      setScale(Number.isFinite(next) && next > 0 ? next : 0);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    const media = window.matchMedia("(min-width: 768px)");
    media.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", measure);
    };
  }, [panels]);

  return { frameRef, scale };
}

function PlanLabel({ panel }: { panel: IrenePanel }) {
  return (
    <figcaption className="mb-3 flex flex-col items-center gap-1.5 text-center">
      <span className="font-condensed text-[clamp(1.35rem,2.2vw,2rem)] leading-none font-extrabold tracking-[0.06em] text-[var(--irene-paper)] uppercase">
        {panel.label}
      </span>
      <span className="font-mono text-[0.75rem] tracking-[0.18em] text-[var(--irene-steel)] uppercase">
        {panel.sheet}
      </span>
    </figcaption>
  );
}

function UniformPlans({ panels }: { panels: readonly IrenePanel[] }) {
  const { frameRef, scale } = useSharedScale(panels);

  return (
    <div
      ref={frameRef}
      className="flex min-h-0 flex-1 items-center justify-center px-6 pt-8 sm:px-10 md:px-14 md:pt-28 md:pb-32"
    >
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-center md:gap-8">
        {panels.map((panel) => {
          const width = Math.floor(panel.width * scale);
          const height = Math.floor(panel.height * scale);
          return (
            <figure key={panel.sheet} className="flex flex-col items-center" style={{ width }}>
              <PlanLabel panel={panel} />
              <Image
                src={panel.src}
                alt={panel.alt}
                width={panel.width}
                height={panel.height}
                sizes="40vw"
                style={{ width, height }}
                className="irene-line-art max-w-none"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export function PanelSlide({ slide }: { slide: IreneSlide }) {
  const tap = useTapCaption();
  const panels = slide.panels ?? [];
  const uniform = slide.layout === "thirds";

  return (
    <SlideShell id={`slide-${slide.id}`}>
      <div className="slide relative flex w-full flex-col md:h-full" tabIndex={0} {...tap}>
        {uniform ? (
          <UniformPlans panels={panels} />
        ) : (
          <div className="grid min-h-0 flex-1 gap-8 px-6 pt-8 sm:px-12 md:grid-cols-[0.55fr_1fr] md:grid-rows-1 md:gap-10 md:px-16 md:pt-28 md:pb-36">
            {panels.map((panel) => (
              <figure key={panel.sheet} className="flex min-h-0 min-w-0 flex-col">
                <PlanLabel panel={panel} />
                <div
                  className="relative min-h-0 flex-1 max-md:max-h-[65svh] max-md:aspect-[var(--ar)]"
                  style={{ "--ar": `${panel.width} / ${panel.height}` } as React.CSSProperties}
                >
                  <Image
                    src={panel.src}
                    alt={panel.alt}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-contain irene-line-art"
                  />
                </div>
              </figure>
            ))}
          </div>
        )}
        <SlideCaption heading={slide.heading} caption={slide.caption} />
      </div>
    </SlideShell>
  );
}
