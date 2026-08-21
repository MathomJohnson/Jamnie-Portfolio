"use client";

import { useEffect, useState } from "react";

type Marker = { id: string; label: string };

const markers: Marker[] = [
  { id: "hero", label: "Index" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

/** Right-edge scale ticks that track the active snap section and double as jump links. */
export function SectionIndicator() {
  const [active, setActive] = useState(markers[0].id);

  useEffect(() => {
    const sections = markers
      .map((marker) => document.getElementById(marker.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.35, 0.6, 0.9] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-5 z-20 hidden -translate-y-1/2 flex-col items-end gap-5 lg:flex"
    >
      {markers.map((marker) => {
        const isActive = active === marker.id;

        return (
          <a
            key={marker.id}
            href={`#${marker.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={`font-mono text-[0.5625rem] tracking-[0.24em] uppercase transition-all duration-500 ${
                isActive
                  ? "text-ink/70 opacity-100"
                  : "text-ink/45 opacity-0 group-hover:opacity-100"
              }`}
            >
              {marker.label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? "w-8 bg-ink/70" : "w-4 bg-ink/25 group-hover:w-6 group-hover:bg-ink/50"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
