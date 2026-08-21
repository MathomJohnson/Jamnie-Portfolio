import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`snap-section relative flex min-h-dvh w-full flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 md:h-dvh lg:px-16 ${className}`}
    >
      {children}
    </section>
  );
}
