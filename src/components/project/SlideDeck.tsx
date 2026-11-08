"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type SlideDeckProps = {
  children: ReactNode;
  onActiveChange: (index: number) => void;
};

export function SlideDeck({ children, onActiveChange }: SlideDeckProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const slides = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return [] as HTMLElement[];
    return Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"));
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const observed = slides();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = slides().findIndex((el) => el.id === visible.target.id);
        if (index >= 0) onActiveChange(index);
      },
      { root, threshold: [0.35, 0.55, 0.75] },
    );

    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onActiveChange, slides]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "];
      if (!keys.includes(event.key)) return;
      if (
        event.target instanceof HTMLElement &&
        (event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA" ||
          event.target.isContentEditable)
      ) {
        return;
      }

      const items = slides();
      if (items.length === 0) return;

      const current = items.reduce((best, el) => {
        const top = Math.abs(el.offsetTop - root.scrollTop);
        const bestTop = Math.abs(best.offsetTop - root.scrollTop);
        return top < bestTop ? el : best;
      }, items[0]);

      const index = items.indexOf(current);
      const forward =
        event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ";
      const nextIndex = forward
        ? Math.min(items.length - 1, index + 1)
        : Math.max(0, index - 1);

      event.preventDefault();
      items[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides]);

  return (
    <div
      ref={scrollerRef}
      className="irene-scroller overflow-x-hidden pt-14 md:h-dvh md:overflow-y-auto md:pt-0"
    >
      {children}
    </div>
  );
}

export function useSlideState() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onActiveChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return { activeIndex, onActiveChange };
}
