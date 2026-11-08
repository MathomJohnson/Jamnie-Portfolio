"use client";

import Link from "next/link";
import { ireneGlazingSpec, ireneNext } from "@/lib/projects/irene";
import { SlideShell } from "@/components/project/slide-shared";

export function GlazingSlide() {
  return (
    <SlideShell id="slide-glazing" className="irene-slide-brick">
      <div className="flex h-full flex-col justify-between px-6 py-16 sm:px-14 md:py-28 lg:px-20">
        <div className="grid min-h-0 flex-1 content-center grid-cols-1 gap-10 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-16">
          <div>
            <h2 className="font-condensed text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.9] font-black tracking-[0.04em] text-[var(--irene-paper)] uppercase">
              Storefront
              <br />
              Glazing
            </h2>
            <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.16em] text-[#f0b7c1] uppercase">
              {ireneGlazingSpec.sheet}
            </p>
          </div>
          <div>
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-[#f2e4e6] sm:text-base">
              {ireneGlazingSpec.rhythm}
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              {ireneGlazingSpec.items.map((item) => (
                <li
                  key={item.label}
                  className="border-t border-white/25 pt-3 text-[0.875rem] leading-relaxed text-[#f2e4e6]"
                >
                  <b className="mb-1 block font-mono text-[0.65625rem] font-normal tracking-[0.08em] text-[var(--irene-paper)] uppercase">
                    {item.label}
                  </b>
                  {item.body}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <footer className="mt-8 flex justify-end border-t border-white/25 pt-5 font-mono text-[0.6875rem] tracking-[0.18em] uppercase">
          <Link
            href={ireneNext.href}
            className="text-[var(--irene-paper)] transition-colors hover:text-white"
          >
            {ireneNext.label}
          </Link>
        </footer>
      </div>
    </SlideShell>
  );
}
