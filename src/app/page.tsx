import { SectionIndicator } from "@/components/SectionIndicator";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <div
        aria-hidden
        className="drafting-grid pointer-events-none fixed inset-0 z-0"
      />
      <SectionIndicator />
      <main className="relative z-10">
        <Hero />
        <About />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
